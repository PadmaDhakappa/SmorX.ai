import logging
import resend
from decouple import config
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.throttling import AnonRateThrottle

from .models import ContactMessage
from .serializers import ContactMessageSerializer

resend.api_key = config("RESEND_API_KEY")

logger = logging.getLogger(__name__)


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')


def send_contact_email(name, email, phone, message):
    phone_display = phone if phone else "Not provided"
    resend.Emails.send({
        "from": "SmorX.ai <onboarding@resend.dev>",
        "to": ["smorx.ai@gmail.com"],
        "subject": "New Contact Form Submission - SmorX.ai",
        "html": f"""
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone_display}</p>
            <p><strong>Message:</strong><br>{message}</p>
        """,
    })
    logger.info("Contact email sent via Resend for %s <%s>", name, email)


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
            try:
                send_contact_email(
                    name=serializer.validated_data['name'],
                    email=serializer.validated_data['email'],
                    phone=serializer.validated_data.get('phone', ''),
                    message=serializer.validated_data['message'],
                )
            except Exception as e:
                logger.error("Failed to send contact email via Resend: %s", e)
                return Response(
                    {'detail': 'Message saved but email delivery failed. Please try again later.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
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
