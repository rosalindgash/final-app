from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import CustomUser, AccountProvisioning, UserPreferences, Subscription, StorageUsage, Backup

@receiver(post_save, sender=CustomUser)
def auto_provision_new_account(sender, instance, created, **kwargs):
    """
    Signal to automatically provision a new user account.
    This runs whenever a CustomUser is created or updated.
    """
    if created:  # Only run for newly created users
        # Create AccountProvisioning record
        provisioning, provisioning_created = AccountProvisioning.objects.get_or_create(
            user=instance,
            defaults={
                'status': 'in_progress',
                'started_at': timezone.now(),
            }
        )
        
        # Create UserPreferences with default values
        preferences, preferences_created = UserPreferences.objects.get_or_create(
            user=instance,
            defaults={
                'email_notifications': True,
                'backup_frequency_days': 7,
                'storage_warning_threshold': 80,
                'default_document_privacy': 'private',
                'theme': 'system',
                'language': 'en',
            }
        )
        
        # Create initial StorageUsage record
        storage_usage, storage_created = StorageUsage.objects.get_or_create(
            user=instance,
            date=timezone.now().date(),
            defaults={
                'total_used_bytes': 0,
                'documents_count': 0,
                'backups_count': 0,
                'documents_size_bytes': 0,
                'backups_size_bytes': 0,
            }
        )
        
        # Create initial Subscription if not already exists
        # Only create if the user has a subscription_tier
        if instance.subscription_tier:
            # Determine payment provider, defaulting to 'website' if none provided
            if instance.stripe_customer_id:
                payment_provider = 'stripe'
                provider_id = instance.stripe_customer_id
            elif instance.paypal_customer_id:
                payment_provider = 'paypal'
                provider_id = instance.paypal_customer_id
            else:
                payment_provider = 'website'  # Default provider
                provider_id = f"web_{instance.id}"
                
            subscription, subscription_created = Subscription.objects.get_or_create(
                user=instance,
                defaults={
                    'tier': instance.subscription_tier,
                    'status': instance.subscription_status,
                    'payment_provider': payment_provider,
                    'provider_subscription_id': provider_id,
                    'current_period_start': timezone.now(),
                    'current_period_end': instance.subscription_end_date or (timezone.now() + timezone.timedelta(days=30)),
                }
            )
        
        # Schedule initial backup (optional)
        # Backup.objects.create(
        #     user=instance,
        #     type='account',
        #     status='scheduled',
        #     scheduled_at=timezone.now() + timezone.timedelta(days=1),
        #     s3_key=f'backups/{instance.id}/initial_backup_{timezone.now().strftime("%Y%m%d%H%M%S")}',
        #     s3_bucket='your-default-bucket',
        #     retention_days=30,
        # )
        
        # Mark provisioning as complete
        provisioning.status = 'completed'
        provisioning.completed_at = timezone.now()
        provisioning.storage_provisioned = True
        provisioning.backup_schedule_created = True
        provisioning.notification_preferences_set = True
        provisioning.save()
