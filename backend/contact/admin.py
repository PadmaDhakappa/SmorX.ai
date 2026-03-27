from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('ip_address', 'created_at', 'updated_at')
    ordering = ('-created_at',)

    fieldsets = (
        ('Sender', {
            'fields': ('name', 'email', 'ip_address'),
        }),
        ('Message', {
            'fields': ('message',),
        }),
        ('Status', {
            'fields': ('status',),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )
