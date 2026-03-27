import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.throttling import AnonRateThrottle
from django.core.mail import send_mail
from django.conf import settings

from .models import ContactMessage
from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')


def send_contact_email(name, email, message):
    subject = "New Contact Form Submission - SmorX.ai"
    body = f"""
You have received a new message via the SmorX.ai contact form.

─────────────────────────────────────
  CONTACT DETAILS
─────────────────────────────────────
  Full Name   : {name}
  Email       : {email}
─────────────────────────────────────
  MESSAGE
─────────────────────────────────────

{message}

─────────────────────────────────────
Reply directly to {email} to respond.
"""
    try:
        send_mail(
            subject=subject,
            message=body.strip(),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_RECIPIENT_EMAIL],
            fail_silently=False,
        )
        logger.info("Contact email sent for %s <%s>", name, email)
    except Exception as e:
        logger.error("Failed to send contact email: %s", e)


class ContactAPIView(APIView):
    """
    POST /api/contact/
    Validates input, saves to DB, and sends email to outreach@smorx.ai via Outlook SMTP.
    """
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(ip_address=get_client_ip(request))
            send_contact_email(
                name=serializer.validated_data['name'],
                email=serializer.validated_data['email'],
                message=serializer.validated_data['message'],
            )
            return Response(
                {'message': "Thank you for reaching out! We'll get back to you within 24 hours."},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def get(self, request):
        return Response({'status': 'ok', 'endpoint': 'POST /api/contact/'})
