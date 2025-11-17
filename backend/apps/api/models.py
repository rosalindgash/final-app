from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, FileExtensionValidator
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
import uuid

class SubscriptionTier(models.Model):
    """Model for subscription tiers (Free, Basic, Premium)"""
    TIER_CHOICES = [
        ('free', 'Free'),
        ('basic', 'Basic'),
        ('premium', 'Premium'),
    ]

    name = models.CharField(max_length=20, choices=TIER_CHOICES, unique=True)
    base_storage_gb = models.DecimalField(
        max_digits=5, 
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text=_("Base storage allocation in GB")
    )
    price_monthly = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text=_("Monthly subscription price in USD")
    )
    can_purchase_extra_storage = models.BooleanField(
        default=False,
        help_text=_("Whether this tier can purchase additional storage")
    )
    max_trusted_contacts = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text=_("Maximum number of trusted contacts (null means unlimited)")
    )
    max_beneficiaries = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text=_("Maximum number of beneficiaries (null means unlimited)")
    )
    free_storage_for_contacts_gb = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)],
        help_text=_("Free storage allocation per trusted contact in GB")
    )

    class Meta:
        verbose_name = _("Subscription Tier")
        verbose_name_plural = _("Subscription Tiers")

    def __str__(self):
        return f"{self.get_name_display()} Tier"

class AdditionalStorage(models.Model):
    """Model for additional storage purchase options"""
    SIZE_CHOICES = [
        (5, '5 GB'),
        (10, '10 GB'),
    ]

    size_gb = models.IntegerField(
        choices=SIZE_CHOICES,
        unique=True,
        help_text=_("Additional storage size in GB")
    )
    price_monthly = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text=_("Monthly price in USD")
    )

    class Meta:
        verbose_name = _("Additional Storage")
        verbose_name_plural = _("Additional Storage Options")

    def __str__(self):
        return f"{self.size_gb} GB Additional Storage"

class AccessControl(models.Model):
    """Model for managing trusted contacts and beneficiaries"""
    ROLE_CHOICES = [
        ('trusted_contact', 'Trusted Contact'),
        ('beneficiary', 'Beneficiary'),
    ]

    ACCESS_LEVEL_CHOICES = [
        ('view', 'View Only'),
        ('edit', 'Can Edit'),
        ('manage', 'Can Manage'),
    ]

    user = models.ForeignKey(
        'CustomUser',
        on_delete=models.CASCADE,
        related_name='access_controls',
        help_text=_("User who granted the access")
    )
    contact = models.ForeignKey(
        'CustomUser',
        on_delete=models.CASCADE,
        related_name='granted_access',
        help_text=_("User who was granted access")
    )
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        help_text=_("Role of the contact (trusted contact or beneficiary)")
    )
    access_level = models.CharField(
        max_length=10,
        choices=ACCESS_LEVEL_CHOICES,
        default='view',
        help_text=_("Level of access granted")
    )
    granted_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text=_("When the access grant expires (null means no expiration)")
    )
    is_active = models.BooleanField(default=True)
    notes = models.TextField(
        blank=True,
        help_text=_("Optional notes about this access grant")
    )

    class Meta:
        verbose_name = _("Access Control")
        verbose_name_plural = _("Access Controls")
        unique_together = ['user', 'contact', 'role']
        indexes = [
            models.Index(fields=['user', 'role']),
            models.Index(fields=['contact', 'role']),
            models.Index(fields=['is_active']),
        ]

    def __str__(self):
        return f"{self.user.email} → {self.contact.email} ({self.get_role_display()})"

    def is_expired(self):
        """Check if the access grant has expired"""
        if not self.expires_at:
            return False
        return timezone.now() > self.expires_at

class AuditLog(models.Model):
    """Model for tracking file access and modifications"""
    ACTION_CHOICES = [
        ('view', 'View'),
        ('download', 'Download'),
        ('upload', 'Upload'),
        ('modify', 'Modify'),
        ('delete', 'Delete'),
        ('share', 'Share'),
        ('revoke', 'Revoke Access'),
    ]

    user = models.ForeignKey(
        'CustomUser',
        on_delete=models.SET_NULL,
        null=True,
        related_name='audit_logs',
        help_text=_("User who performed the action")
    )
    action = models.CharField(
        max_length=20,
        choices=ACTION_CHOICES,
        help_text=_("Type of action performed")
    )
    file_path = models.CharField(
        max_length=500,
        help_text=_("Path to the file that was accessed/modified")
    )
    file_size_bytes = models.BigIntegerField(
        null=True,
        blank=True,
        help_text=_("Size of the file in bytes")
    )
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text=_("IP address of the user")
    )
    user_agent = models.TextField(
        blank=True,
        help_text=_("User agent of the client")
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(
        default=dict,
        blank=True,
        help_text=_("Additional metadata about the action")
    )

    class Meta:
        verbose_name = _("Audit Log")
        verbose_name_plural = _("Audit Logs")
        indexes = [
            models.Index(fields=['user', 'action']),
            models.Index(fields=['timestamp']),
            models.Index(fields=['file_path']),
        ]
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.user.email if self.user else 'System'} - {self.get_action_display()} - {self.file_path}"

class Notification(models.Model):
    """Model for user notifications"""
    TYPE_CHOICES = [
        ('subscription_renewal', 'Subscription Renewal'),
        ('storage_warning', 'Storage Warning'),
        ('access_granted', 'Access Granted'),
        ('access_revoked', 'Access Revoked'),
        ('system', 'System Notification'),
    ]

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]

    user = models.ForeignKey(
        'CustomUser',
        on_delete=models.CASCADE,
        related_name='notifications',
        help_text=_("User to notify")
    )
    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        help_text=_("Type of notification")
    )
    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default='medium',
        help_text=_("Priority level of the notification")
    )
    title = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text=_("When the notification was read")
    )
    expires_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text=_("When the notification expires")
    )
    action_url = models.URLField(
        blank=True,
        help_text=_("Optional URL for action button")
    )
    action_text = models.CharField(
        max_length=50,
        blank=True,
        help_text=_("Text for the action button")
    )
    metadata = models.JSONField(
        default=dict,
        blank=True,
        help_text=_("Additional metadata about the notification")
    )

    class Meta:
        verbose_name = _("Notification")
        verbose_name_plural = _("Notifications")
        indexes = [
            models.Index(fields=['user', 'type']),
            models.Index(fields=['created_at']),
            models.Index(fields=['priority']),
        ]
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} - {self.get_type_display()} - {self.title}"

    def is_read(self):
        """Check if the notification has been read"""
        return self.read_at is not None

    def is_expired(self):
        """Check if the notification has expired"""
        if not self.expires_at:
            return False
        return timezone.now() > self.expires_at

class CustomUser(AbstractUser):
    """Custom user model with subscription and storage management"""
    subscription_tier = models.ForeignKey(
        SubscriptionTier,
        on_delete=models.PROTECT,
        related_name='users'
    )
    additional_storage = models.ForeignKey(
        AdditionalStorage,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users',
        help_text=_("Additional storage purchase, if any")
    )
    storage_used_bytes = models.BigIntegerField(
        default=0,
        validators=[MinValueValidator(0)],
        help_text=_("Current storage usage in bytes")
    )
    stripe_customer_id = models.CharField(
        max_length=100,
        blank=True,
        help_text=_("Stripe customer ID for payment processing")
    )
    paypal_customer_id = models.CharField(
        max_length=100,
        blank=True,
        help_text=_("PayPal customer ID for payment processing")
    )
    subscription_status = models.CharField(
        max_length=20,
        choices=[
            ('active', 'Active'),
            ('past_due', 'Past Due'),
            ('canceled', 'Canceled'),
            ('trialing', 'Trialing'),
        ],
        default='active'
    )
    subscription_end_date = models.DateTimeField(
        null=True,
        blank=True,
        help_text=_("When the current subscription period ends")
    )

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    @property
    def total_storage_bytes(self):
        """Calculate total available storage in bytes"""
        base_storage_bytes = int(self.subscription_tier.base_storage_gb * 1024 * 1024 * 1024)
        additional_storage_bytes = int(self.additional_storage.size_gb * 1024 * 1024 * 1024) if self.additional_storage else 0
        return base_storage_bytes + additional_storage_bytes

    @property
    def storage_used_gb(self):
        """Convert storage used to GB"""
        return round(self.storage_used_bytes / (1024 * 1024 * 1024), 2)

    @property
    def total_storage_gb(self):
        """Convert total storage to GB"""
        return round(self.total_storage_bytes / (1024 * 1024 * 1024), 2)

    @property
    def storage_percentage_used(self):
        """Calculate percentage of storage used"""
        if self.total_storage_bytes == 0:
            return 0
        return round((self.storage_used_bytes / self.total_storage_bytes) * 100, 2)

    def can_purchase_storage(self):
        """Check if user can purchase additional storage"""
        return self.subscription_tier.can_purchase_extra_storage and not self.additional_storage

    @property
    def trusted_contacts_count(self):
        """Get current number of trusted contacts"""
        return self.access_controls.filter(
            role='trusted_contact',
            is_active=True
        ).count()

    @property
    def beneficiaries_count(self):
        """Get current number of beneficiaries"""
        return self.access_controls.filter(
            role='beneficiary',
            is_active=True
        ).count()

    def can_add_trusted_contact(self):
        """Check if user can add another trusted contact"""
        if self.subscription_tier.name == 'premium':
            return True
        max_contacts = self.subscription_tier.max_trusted_contacts
        return self.trusted_contacts_count < max_contacts

    def can_add_beneficiary(self):
        """Check if user can add another beneficiary"""
        if self.subscription_tier.name == 'premium':
            return True
        max_beneficiaries = self.subscription_tier.max_beneficiaries
        return self.beneficiaries_count < max_beneficiaries

    def get_free_storage_for_contacts(self):
        """Calculate total free storage for trusted contacts"""
        if not self.subscription_tier.free_storage_for_contacts_gb:
            return 0
        return self.trusted_contacts_count * self.subscription_tier.free_storage_for_contacts_gb

    def __str__(self):
        return f"{self.email} ({self.subscription_tier.get_name_display()})"

class Document(models.Model):
    """Model for storing user documents with S3 integration"""
    STATUS_CHOICES = [
        ('uploading', 'Uploading'),
        ('processing', 'Processing'),
        ('ready', 'Ready'),
        ('error', 'Error'),
        ('deleted', 'Deleted'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        'CustomUser',
        on_delete=models.CASCADE,
        related_name='documents',
        help_text=_("Owner of the document")
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    file_name = models.CharField(max_length=255)
    file_type = models.CharField(
        max_length=100,
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png'])]
    )
    file_size_bytes = models.BigIntegerField(
        validators=[MinValueValidator(0)],
        help_text=_("Size of the file in bytes")
    )
    s3_key = models.CharField(
        max_length=500,
        unique=True,
        help_text=_("S3 object key for the file")
    )
    s3_bucket = models.CharField(
        max_length=255,
        help_text=_("S3 bucket name")
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='uploading'
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    is_encrypted = models.BooleanField(default=True)
    encryption_key = models.CharField(
        max_length=255,
        blank=True,
        help_text=_("Encryption key reference")
    )
    metadata = models.JSONField(
        default=dict,
        blank=True,
        help_text=_("Additional metadata about the document")
    )
    tags = models.ManyToManyField(
        'DocumentTag',
        blank=True,
        related_name='documents'
    )

    class Meta:
        verbose_name = _("Document")
        verbose_name_plural = _("Documents")
        indexes = [
            models.Index(fields=['user', 'status']),
            models.Index(fields=['uploaded_at']),
            models.Index(fields=['file_type']),
        ]
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"{self.title} ({self.user.email})"

    @property
    def file_size_mb(self):
        """Get file size in megabytes"""
        return round(self.file_size_bytes / (1024 * 1024), 2)

    def get_s3_url(self):
        """Generate S3 URL for the document"""
        return f"https://{self.s3_bucket}.s3.amazonaws.com/{self.s3_key}"

class DocumentTag(models.Model):
    """Model for document tags/categories"""
    name = models.CharField(max_length=50, unique=True)
    color = models.CharField(
        max_length=7,
        default="#000000",
        help_text=_("Hex color code for the tag")
    )
    user = models.ForeignKey(
        'CustomUser',
        on_delete=models.CASCADE,
        related_name='document_tags'
    )

    class Meta:
        verbose_name = _("Document Tag")
        verbose_name_plural = _("Document Tags")
        unique_together = ['name', 'user']

    def __str__(self):
        return self.name

class Backup(models.Model):
    """Model for tracking automated backups"""
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    TYPE_CHOICES = [
        ('full', 'Full Backup'),
        ('incremental', 'Incremental Backup'),
        ('document', 'Document Backup'),
        ('account', 'Account Backup'),
    ]

    user = models.ForeignKey(
        'CustomUser',
        on_delete=models.CASCADE,
        related_name='backups'
    )
    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        help_text=_("Type of backup")
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='scheduled'
    )
    scheduled_at = models.DateTimeField()
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    size_bytes = models.BigIntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        help_text=_("Size of the backup in bytes")
    )
    s3_key = models.CharField(
        max_length=500,
        unique=True,
        help_text=_("S3 object key for the backup")
    )
    s3_bucket = models.CharField(
        max_length=255,
        help_text=_("S3 bucket name")
    )
    retention_days = models.PositiveIntegerField(
        default=30,
        help_text=_("Number of days to retain the backup")
    )
    error_message = models.TextField(
        blank=True,
        help_text=_("Error message if backup failed")
    )
    metadata = models.JSONField(
        default=dict,
        blank=True,
        help_text=_("Additional metadata about the backup")
    )

    class Meta:
        verbose_name = _("Backup")
        verbose_name_plural = _("Backups")
        indexes = [
            models.Index(fields=['user', 'type']),
            models.Index(fields=['status']),
            models.Index(fields=['scheduled_at']),
        ]
        ordering = ['-scheduled_at']

    def __str__(self):
        return f"{self.user.email} - {self.get_type_display()} - {self.scheduled_at}"

    @property
    def is_expired(self):
        """Check if the backup has expired"""
        if not self.completed_at:
            return False
        return timezone.now() > self.completed_at + timezone.timedelta(days=self.retention_days)

class Subscription(models.Model):
    """Model for managing user subscriptions with payment integration"""
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('trialing', 'Trialing'),
        ('past_due', 'Past Due'),
        ('canceled', 'Canceled'),
        ('unpaid', 'Unpaid'),
    ]

    PAYMENT_PROVIDER_CHOICES = [
        ('stripe', 'Stripe'),
        ('paypal', 'PayPal'),
    ]

    user = models.OneToOneField(
        'CustomUser',
        on_delete=models.CASCADE,
        related_name='subscription'
    )
    tier = models.ForeignKey(
        SubscriptionTier,
        on_delete=models.PROTECT,
        related_name='subscriptions'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='active'
    )
    payment_provider = models.CharField(
        max_length=20,
        choices=PAYMENT_PROVIDER_CHOICES
    )
    provider_subscription_id = models.CharField(
        max_length=100,
        unique=True,
        help_text=_("Subscription ID from payment provider")
    )
    current_period_start = models.DateTimeField()
    current_period_end = models.DateTimeField()
    cancel_at_period_end = models.BooleanField(default=False)
    canceled_at = models.DateTimeField(null=True, blank=True)
    trial_end = models.DateTimeField(null=True, blank=True)
    payment_method_id = models.CharField(
        max_length=100,
        blank=True,
        help_text=_("Payment method ID from provider")
    )
    metadata = models.JSONField(
        default=dict,
        blank=True,
        help_text=_("Additional metadata about the subscription")
    )

    class Meta:
        verbose_name = _("Subscription")
        verbose_name_plural = _("Subscriptions")
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['current_period_end']),
        ]

    def __str__(self):
        return f"{self.user.email} - {self.tier.get_name_display()}"

    @property
    def is_active(self):
        """Check if subscription is currently active"""
        return self.status in ['active', 'trialing']

    @property
    def days_until_renewal(self):
        """Calculate days until subscription renewal"""
        return (self.current_period_end - timezone.now()).days

class AccountProvisioning(models.Model):
    """Model for managing automated account provisioning"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    user = models.OneToOneField(
        'CustomUser',
        on_delete=models.CASCADE,
        related_name='provisioning'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(
        blank=True,
        help_text=_("Error message if provisioning failed")
    )
    storage_provisioned = models.BooleanField(default=False)
    backup_schedule_created = models.BooleanField(default=False)
    notification_preferences_set = models.BooleanField(default=False)
    metadata = models.JSONField(
        default=dict,
        blank=True,
        help_text=_("Additional metadata about the provisioning")
    )

    class Meta:
        verbose_name = _("Account Provisioning")
        verbose_name_plural = _("Account Provisioning")
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['started_at']),
        ]

    def __str__(self):
        return f"{self.user.email} - {self.get_status_display()}"

    @property
    def is_complete(self):
        """Check if all provisioning steps are complete"""
        return all([
            self.storage_provisioned,
            self.backup_schedule_created,
            self.notification_preferences_set
        ])

# Additional helpful models:

class UserPreferences(models.Model):
    """Model for storing user preferences"""
    user = models.OneToOneField(
        'CustomUser',
        on_delete=models.CASCADE,
        related_name='preferences'
    )
    email_notifications = models.BooleanField(default=True)
    backup_frequency_days = models.PositiveIntegerField(
        default=7,
        validators=[MinValueValidator(1), MaxValueValidator(30)]
    )
    storage_warning_threshold = models.PositiveIntegerField(
        default=80,
        validators=[MaxValueValidator(100)],
        help_text=_("Percentage of storage used to trigger warning")
    )
    default_document_privacy = models.CharField(
        max_length=20,
        choices=[
            ('private', 'Private'),
            ('trusted_contacts', 'Trusted Contacts'),
            ('beneficiaries', 'Beneficiaries'),
        ],
        default='private'
    )
    theme = models.CharField(
        max_length=20,
        choices=[
            ('light', 'Light'),
            ('dark', 'Dark'),
            ('system', 'System'),
        ],
        default='system'
    )
    language = models.CharField(
        max_length=10,
        choices=[
            ('en', 'English'),
            ('es', 'Spanish'),
            ('fr', 'French'),
        ],
        default='en'
    )

    class Meta:
        verbose_name = _("User Preferences")
        verbose_name_plural = _("User Preferences")

    def __str__(self):
        return f"Preferences for {self.user.email}"

class StorageUsage(models.Model):
    """Model for tracking detailed storage usage"""
    user = models.ForeignKey(
        'CustomUser',
        on_delete=models.CASCADE,
        related_name='storage_usage'
    )
    date = models.DateField()
    total_used_bytes = models.BigIntegerField(
        validators=[MinValueValidator(0)]
    )
    documents_count = models.PositiveIntegerField(default=0)
    backups_count = models.PositiveIntegerField(default=0)
    documents_size_bytes = models.BigIntegerField(
        validators=[MinValueValidator(0)]
    )
    backups_size_bytes = models.BigIntegerField(
        validators=[MinValueValidator(0)]
    )

    class Meta:
        verbose_name = _("Storage Usage")
        verbose_name_plural = _("Storage Usage")
        unique_together = ['user', 'date']
        indexes = [
            models.Index(fields=['user', 'date']),
        ]
        ordering = ['-date']

    def __str__(self):
        return f"{self.user.email} - {self.date}"

    @property
    def total_used_gb(self):
        """Get total storage used in GB"""
        return round(self.total_used_bytes / (1024 * 1024 * 1024), 2)

class TeamMember(CustomUser):
    """Model for team members with specific roles and permissions"""
    ROLE_CHOICES = [
        ('admin', 'Administrator'),
        ('support', 'Support Staff'),
        ('manager', 'Manager'),
        ('viewer', 'Viewer'),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='viewer',
        help_text=_("Team member role")
    )
    department = models.CharField(
        max_length=100,
        blank=True,
        help_text=_("Department or team")
    )
    can_manage_users = models.BooleanField(
        default=False,
        help_text=_("Can manage user accounts")
    )
    can_manage_subscriptions = models.BooleanField(
        default=False,
        help_text=_("Can manage subscriptions")
    )
    can_view_audit_logs = models.BooleanField(
        default=False,
        help_text=_("Can view audit logs")
    )
    can_manage_documents = models.BooleanField(
        default=False,
        help_text=_("Can manage all documents")
    )
    notes = models.TextField(
        blank=True,
        help_text=_("Additional notes about the team member")
    )

    class Meta:
        verbose_name = _("Team Member")
        verbose_name_plural = _("Team Members")

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"
