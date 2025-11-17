from django.db import migrations

def update_subscription_tier_storage(apps, schema_editor):
    SubscriptionTier = apps.get_model('api', 'SubscriptionTier')
    
    # Update Free tier
    free_tier = SubscriptionTier.objects.get(name='free')
    free_tier.base_storage_gb = 0.5  # 500 MB
    free_tier.save()
    
    # Update Basic tier
    basic_tier = SubscriptionTier.objects.get(name='basic')
    basic_tier.base_storage_gb = 2.0  # 2 GB
    basic_tier.save()
    
    # Update Premium tier
    premium_tier = SubscriptionTier.objects.get(name='premium')
    premium_tier.base_storage_gb = 5.0  # 5 GB
    premium_tier.save()

def reverse_subscription_tier_storage(apps, schema_editor):
    SubscriptionTier = apps.get_model('api', 'SubscriptionTier')
    
    # Revert Free tier
    free_tier = SubscriptionTier.objects.get(name='free')
    free_tier.base_storage_gb = 1.0  # 1 GB
    free_tier.save()
    
    # Revert Basic tier
    basic_tier = SubscriptionTier.objects.get(name='basic')
    basic_tier.base_storage_gb = 10.0  # 10 GB
    basic_tier.save()
    
    # Revert Premium tier
    premium_tier = SubscriptionTier.objects.get(name='premium')
    premium_tier.base_storage_gb = 50.0  # 50 GB
    premium_tier.save()

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0003_fix_subscription_tier_default'),
    ]

    operations = [
        migrations.RunPython(update_subscription_tier_storage, reverse_subscription_tier_storage),
    ] 