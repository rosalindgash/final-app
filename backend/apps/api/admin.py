from django.contrib import admin
from django.utils.html import format_html
from django.core.exceptions import ValidationError
from django import forms
from django.contrib.auth.models import Group
from django.contrib.auth.admin import GroupAdmin as OriginalGroupAdmin
from .models import (
    CustomUser,
    TeamMember,
    SubscriptionTier,
    AdditionalStorage,
    AccessControl,
    AuditLog,
    Notification,
    Document,
    DocumentTag,
    Backup,
    Subscription,
    AccountProvisioning,
    UserPreferences,
    StorageUsage,
)
from django.utils import timezone
import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage

# Import our custom admin site
from .admin_site import admin_site

# Unregister from default admin site
admin.site.unregister(Group)

# Add this AdminTitleMixin to fix page titles
class AdminTitleMixin:
    """
    Mixin to customize Django admin page titles
    """
    def changelist_view(self, request, extra_context=None):
        """Customize the changelist view title"""
        extra_context = extra_context or {}
        # Set the title with proper capitalization
        extra_context['title'] = f'Select {self.model._meta.verbose_name} to Change'
        return super().changelist_view(request, extra_context)

    def add_view(self, request, form_url='', extra_context=None):
        """Customize the add view title"""
        extra_context = extra_context or {}
        # Set the title with proper capitalization
        extra_context['title'] = f'Add {self.model._meta.verbose_name}'
        return super().add_view(request, form_url, extra_context)

    def change_view(self, request, object_id, form_url='', extra_context=None):
        """Customize the change view title"""
        extra_context = extra_context or {}
        # Set the title with proper capitalization
        extra_context['title'] = f'Change {self.model._meta.verbose_name}'
        return super().change_view(request, object_id, form_url, extra_context)

# Custom GroupAdmin with fixed title capitalization
class GroupAdmin(AdminTitleMixin, OriginalGroupAdmin):
    """Custom GroupAdmin with fixed title capitalization"""
    pass

# Form definitions
class SubscriberAdminForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = [
            'username', 'email', 'password', 'first_name', 'last_name',
            'subscription_tier', 'additional_storage', 'subscription_status',
            'subscription_end_date', 'stripe_customer_id', 'paypal_customer_id',
            'is_active', 'is_staff', 'is_superuser'
        ]
        widgets = {
            'password': forms.PasswordInput(),
        }

    def clean(self):
        cleaned_data = super().clean()
        subscription_tier = cleaned_data.get('subscription_tier')
        additional_storage = cleaned_data.get('additional_storage')

        if additional_storage and subscription_tier and not subscription_tier.can_purchase_extra_storage:
            raise ValidationError({
                'additional_storage': f'Users with {subscription_tier.get_name_display()} tier cannot purchase additional storage.'
            })

        return cleaned_data

class TeamMemberAdminForm(forms.ModelForm):
    class Meta:
        model = TeamMember
        fields = [
            'username', 'email', 'password', 'first_name', 'last_name',
            'role', 'department', 'can_manage_users', 'can_manage_subscriptions',
            'can_view_audit_logs', 'can_manage_documents', 'notes', 'is_active'
        ]
        widgets = {
            'password': forms.PasswordInput(),
        }

class DocumentAdminForm(forms.ModelForm):
    file = forms.FileField(
        required=False,
        help_text="Upload a new document file",
        widget=forms.ClearableFileInput(attrs={'accept': '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png'})
    )

    class Meta:
        model = Document
        fields = '__all__'

    def clean(self):
        cleaned_data = super().clean()
        file = cleaned_data.get('file')
        
        if file:
            # Update file-related fields
            cleaned_data['file_name'] = file.name
            cleaned_data['file_type'] = file.name.split('.')[-1].lower()
            cleaned_data['file_size_bytes'] = file.size
            
            # Generate a unique file path for local storage
            import uuid
            unique_filename = f"{uuid.uuid4()}_{file.name}"
            cleaned_data['s3_key'] = unique_filename  # We'll use this field to store the local filename
            cleaned_data['s3_bucket'] = 'local'  # Using 'local' to indicate local storage
            
            # Set initial status
            cleaned_data['status'] = 'uploading'
        
        return cleaned_data

class StorageUsageForm(forms.ModelForm):
    total_used_gb = forms.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=0,
        help_text="Total storage used in GB"
    )
    documents_size_gb = forms.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=0,
        required=False,
        help_text="Total size of documents in GB"
    )
    backups_size_gb = forms.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=0,
        required=False,
        help_text="Total size of backups in GB"
    )

    class Meta:
        model = StorageUsage
        fields = ['user', 'date', 'total_used_gb', 'documents_count', 'backups_count', 'documents_size_gb', 'backups_size_gb']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:  # If editing existing record
            # Convert bytes to GB for all size fields
            self.initial['total_used_gb'] = self.instance.total_used_bytes / (1024 * 1024 * 1024)
            self.initial['documents_size_gb'] = self.instance.documents_size_bytes / (1024 * 1024 * 1024)
            self.initial['backups_size_gb'] = self.instance.backups_size_bytes / (1024 * 1024 * 1024)

    def clean(self):
        cleaned_data = super().clean()
        total_used_gb = cleaned_data.get('total_used_gb')
        documents_count = cleaned_data.get('documents_count', 0)
        backups_count = cleaned_data.get('backups_count', 0)
        documents_size_gb = cleaned_data.get('documents_size_gb')
        backups_size_gb = cleaned_data.get('backups_size_gb')
        
        if total_used_gb is not None:
            # Convert GB to bytes for total storage
            total_bytes = int(float(total_used_gb) * 1024 * 1024 * 1024)
            cleaned_data['total_used_bytes'] = total_bytes
            self.instance.total_used_bytes = total_bytes
            
            # If document and backup sizes are provided in GB, use those values
            if documents_size_gb is not None and backups_size_gb is not None:
                cleaned_data['documents_size_bytes'] = int(float(documents_size_gb) * 1024 * 1024 * 1024)
                cleaned_data['backups_size_bytes'] = int(float(backups_size_gb) * 1024 * 1024 * 1024)
            # Otherwise, calculate based on counts
            elif documents_count > 0 or backups_count > 0:
                # Calculate proportions based on counts
                total_items = documents_count + backups_count
                if total_items > 0:
                    # Calculate proportions (e.g., 3 docs and 2 backups = 0.6 and 0.4)
                    documents_proportion = float(documents_count) / float(total_items)
                    backups_proportion = float(backups_count) / float(total_items)
                    
                    # Calculate GB for each type (e.g., 4.5 GB * 0.6 = 2.7 GB for docs)
                    documents_gb = float(total_used_gb) * documents_proportion
                    backups_gb = float(total_used_gb) * backups_proportion
                    
                    # Convert to bytes and store
                    cleaned_data['documents_size_bytes'] = int(documents_gb * 1024 * 1024 * 1024)
                    cleaned_data['backups_size_bytes'] = int(backups_gb * 1024 * 1024 * 1024)
            else:
                # If no items, assume all storage is for documents
                cleaned_data['documents_size_bytes'] = total_bytes
                cleaned_data['backups_size_bytes'] = 0
            
            # Update the instance with the calculated values
            self.instance.documents_size_bytes = cleaned_data['documents_size_bytes']
            self.instance.backups_size_bytes = cleaned_data['backups_size_bytes']
                
        return cleaned_data

# Admin classes - All updated with AdminTitleMixin
class SubscriberAdmin(AdminTitleMixin, admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'subscription_status', 'is_active', 'is_staff', 'is_superuser')
    list_filter = ('subscription_status', 'is_active', 'is_staff', 'is_superuser')
    form = SubscriberAdminForm
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    readonly_fields = ('storage_used_bytes',)

    def storage_used_gb(self, obj):
        return f"{obj.storage_used_bytes / (1024 * 1024 * 1024):.2f} GB"
    storage_used_gb.short_description = "Storage Used"

class UserPreferencesAdmin(AdminTitleMixin, admin.ModelAdmin):
    list_display = ('user', 'email_notifications', 'backup_frequency_days', 'storage_warning_threshold', 'default_document_privacy', 'theme', 'language')
    list_filter = ('email_notifications', 'default_document_privacy', 'theme', 'language')
    search_fields = ('user__email',)

class AdditionalStorageAdmin(AdminTitleMixin, admin.ModelAdmin):
    list_display = ('size_gb', 'price_monthly')
    list_filter = ('size_gb',)
    search_fields = ('size_gb',)

class SubscriptionAdmin(AdminTitleMixin, admin.ModelAdmin):
    list_display = ('user', 'tier', 'status', 'payment_provider', 'current_period_start', 'current_period_end', 'is_active')
    list_filter = ('tier', 'status', 'payment_provider', 'current_period_start')
    search_fields = ('user__email', 'provider_subscription_id')
    date_hierarchy = 'current_period_start'
    readonly_fields = ('current_period_start', 'current_period_end', 'canceled_at', 'trial_end')

class SubscriptionTierAdmin(AdminTitleMixin, admin.ModelAdmin):
    list_display = ('name', 'base_storage_gb', 'price_monthly', 'can_purchase_extra_storage', 'max_trusted_contacts', 'max_beneficiaries', 'free_storage_for_contacts_gb')
    list_filter = ('can_purchase_extra_storage',)
    search_fields = ('name',)

class AccountProvisioningAdmin(AdminTitleMixin, admin.ModelAdmin):
    list_display = ('user', 'status', 'started_at', 'completed_at', 'is_complete')
    list_filter = ('status', 'started_at')
    search_fields = ('user__email',)
    date_hierarchy = 'started_at'
    readonly_fields = ('started_at', 'completed_at')

class DocumentAdmin(AdminTitleMixin, admin.ModelAdmin):
    form = DocumentAdminForm
    list_display = ('title', 'user', 'file_type', 'file_size_mb', 'status', 'uploaded_at', 'is_encrypted')
    list_filter = ('status', 'file_type', 'is_encrypted', 'uploaded_at')
    search_fields = ('title', 'user__email', 'description', 'file_name')
    date_hierarchy = 'uploaded_at'
    readonly_fields = ('uploaded_at', 'modified_at', 'file_name', 'file_type', 'file_size_bytes', 's3_key', 's3_bucket', 'status')

class DocumentTagAdmin(AdminTitleMixin, admin.ModelAdmin):
    list_display = ('name', 'user', 'color_display')
    list_filter = ('user',)
    search_fields = ('name', 'user__email')

    def color_display(self, obj):
        return format_html(
            '<span style="background-color: {}; padding: 5px; border-radius: 3px;">{}</span>',
            obj.color,
            obj.color
        )
    color_display.short_description = "Color"

class BackupAdmin(AdminTitleMixin, admin.ModelAdmin):
    list_display = ('user', 'type', 'status', 'scheduled_at', 'started_at', 'completed_at', 'size_mb', 'retention_days')
    list_filter = ('type', 'status', 'scheduled_at')
    search_fields = ('user__email', 's3_key')
    date_hierarchy = 'scheduled_at'
    readonly_fields = ('scheduled_at', 'started_at', 'completed_at')

    def size_mb(self, obj):
        if obj.size_bytes:
            return f"{obj.size_bytes / (1024 * 1024):.2f} MB"
        return "-"
    size_mb.short_description = "Size"

class TeamMemberAdmin(AdminTitleMixin, admin.ModelAdmin):
    form = TeamMemberAdminForm
    list_display = ('email', 'first_name', 'last_name', 'role', 'department', 'is_active')
    list_filter = ('role', 'department', 'is_active')
    search_fields = ('email', 'first_name', 'last_name', 'department')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions')

class AccessControlAdmin(AdminTitleMixin, admin.ModelAdmin):
    list_display = ('user', 'contact', 'role', 'access_level', 'granted_at', 'expires_at', 'is_active')
    list_filter = ('role', 'access_level', 'is_active', 'granted_at')
    search_fields = ('user__email', 'contact__email', 'notes')
    date_hierarchy = 'granted_at'
    readonly_fields = ('granted_at',)

class AuditLogAdmin(AdminTitleMixin, admin.ModelAdmin):
    list_display = ('user', 'action', 'file_path', 'file_size_mb', 'ip_address', 'timestamp')
    list_filter = ('action', 'timestamp')
    search_fields = ('user__email', 'file_path', 'ip_address')
    date_hierarchy = 'timestamp'
    readonly_fields = ('timestamp',)

    def file_size_mb(self, obj):
        if obj.file_size_bytes:
            return f"{obj.file_size_bytes / (1024 * 1024):.2f} MB"
        return "-"
    file_size_mb.short_description = "File Size"

class NotificationAdmin(AdminTitleMixin, admin.ModelAdmin):
    list_display = ('user', 'type', 'title', 'priority', 'created_at', 'read_at', 'is_expired')
    list_filter = ('type', 'priority', 'created_at')
    search_fields = ('user__email', 'title', 'message')
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'read_at')

class StorageUsageAdmin(AdminTitleMixin, admin.ModelAdmin):
    form = StorageUsageForm
    list_display = ('user', 'date', 'total_used_gb', 'documents_size_gb', 'backups_size_gb', 'documents_count', 'backups_count')
    list_filter = ('date',)
    search_fields = ('user__email',)
    date_hierarchy = 'date'
    readonly_fields = ()

    def total_used_gb(self, obj):
        return f"{obj.total_used_bytes / (1024 * 1024 * 1024):.2f} GB"
    total_used_gb.short_description = "Total Used"

    def documents_size_gb(self, obj):
        return f"{obj.documents_size_bytes / (1024 * 1024 * 1024):.2f} GB"
    documents_size_gb.short_description = "Documents Size"

    def backups_size_gb(self, obj):
        return f"{obj.backups_size_bytes / (1024 * 1024 * 1024):.2f} GB"
    backups_size_gb.short_description = "Backups Size"

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if not obj:  # Only set default for new objects
            form.base_fields['date'].initial = timezone.now().date()
        return form

    def save_model(self, request, obj, form, change):
        # Update the user's storage_used_bytes
        obj.user.storage_used_bytes = obj.total_used_bytes
        obj.user.save(update_fields=['storage_used_bytes'])
        super().save_model(request, obj, form, change)

# Register models with our custom admin site
admin_site.register(CustomUser, SubscriberAdmin)
admin_site.register(UserPreferences, UserPreferencesAdmin)
admin_site.register(AdditionalStorage, AdditionalStorageAdmin)
admin_site.register(Subscription, SubscriptionAdmin)
admin_site.register(SubscriptionTier, SubscriptionTierAdmin)
admin_site.register(AccountProvisioning, AccountProvisioningAdmin)
admin_site.register(Document, DocumentAdmin)
admin_site.register(DocumentTag, DocumentTagAdmin)
admin_site.register(Backup, BackupAdmin)
admin_site.register(TeamMember, TeamMemberAdmin)
admin_site.register(AccessControl, AccessControlAdmin)
admin_site.register(AuditLog, AuditLogAdmin)
admin_site.register(Notification, NotificationAdmin)
admin_site.register(StorageUsage, StorageUsageAdmin)
admin_site.register(Group, GroupAdmin)  # Using our custom GroupAdmin

# Also register with the default admin site if you want to keep that too
# If you want to use ONLY your custom admin site, remove or comment out these registrations
admin.site.register(CustomUser, SubscriberAdmin)
admin.site.register(UserPreferences, UserPreferencesAdmin)
admin.site.register(AdditionalStorage, AdditionalStorageAdmin)
admin.site.register(Subscription, SubscriptionAdmin)
admin.site.register(SubscriptionTier, SubscriptionTierAdmin)
admin.site.register(AccountProvisioning, AccountProvisioningAdmin)
admin.site.register(Document, DocumentAdmin)
admin.site.register(DocumentTag, DocumentTagAdmin)
admin.site.register(Backup, BackupAdmin)
admin.site.register(TeamMember, TeamMemberAdmin)
admin.site.register(AccessControl, AccessControlAdmin)
admin.site.register(AuditLog, AuditLogAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(StorageUsage, StorageUsageAdmin)
admin.site.register(Group, GroupAdmin)  # Using our custom GroupAdmin
