from rest_framework import serializers
from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters.")
        if len(value) > 150:
            raise serializers.ValidationError("Name must be 150 characters or fewer.")
        return value

    def validate_message(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters.")
        if len(value) > 5000:
            raise serializers.ValidationError("Message must be 5000 characters or fewer.")
        return value
