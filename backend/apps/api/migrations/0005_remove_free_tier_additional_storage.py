from django.db import migrations

def remove_free_tier_additional_storage(apps, schema_editor):
    CustomUser = apps.get_model('api', 'CustomUser')
    SubscriptionTier = apps.get_model('api', 'SubscriptionTier')
    
    # Get the free tier
    free_tier = SubscriptionTier.objects.get(name='free')
    
    # Update all users with free tier to have no additional storage
    CustomUser.objects.filter(subscription_tier=free_tier).update(additional_storage=None)

def reverse_migration(apps, schema_editor):
    # No reverse operation needed as we don't want to restore the additional storage
    pass

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0004_update_subscription_tier_storage'),
    ]

    operations = [
        migrations.RunPython(remove_free_tier_additional_storage, reverse_migration),
    ] 