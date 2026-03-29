from rest_framework import serializers
from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters.")
        if len(value) > 150:
            raise serializers.ValidationError("Name must be 150 characters or fewer.")
        return value

    def validate_phone(self, value):
        value = value.strip()
        if value and len(value) > 30:
            raise serializers.ValidationError("Phone number must be 30 characters or fewer.")
        return value

    def validate_message(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters.")
        if len(value) > 5000:
            raise serializers.ValidationError("Message must be 5000 characters or fewer.")
        return value
