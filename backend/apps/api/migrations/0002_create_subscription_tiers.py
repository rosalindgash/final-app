from django.db import migrations

def create_subscription_tiers(apps, schema_editor):
    SubscriptionTier = apps.get_model('api', 'SubscriptionTier')
    
    # Create Free tier
    SubscriptionTier.objects.create(
        name='free',
        base_storage_gb=1.0,  # 1 GB
        price_monthly=0.00,
        can_purchase_extra_storage=False,
        max_trusted_contacts=2,
        max_beneficiaries=1,
        free_storage_for_contacts_gb=0.0
    )
    
    # Create Basic tier
    SubscriptionTier.objects.create(
        name='basic',
        base_storage_gb=10.0,  # 10 GB
        price_monthly=9.99,
        can_purchase_extra_storage=True,
        max_trusted_contacts=5,
        max_beneficiaries=3,
        free_storage_for_contacts_gb=0.5  # 500 MB per contact
    )
    
    # Create Premium tier
    SubscriptionTier.objects.create(
        name='premium',
        base_storage_gb=50.0,  # 50 GB
        price_monthly=29.99,
        can_purchase_extra_storage=True,
        max_trusted_contacts=None,  # Unlimited
        max_beneficiaries=None,  # Unlimited
        free_storage_for_contacts_gb=1.0  # 1 GB per contact
    )

def remove_subscription_tiers(apps, schema_editor):
    SubscriptionTier = apps.get_model('api', 'SubscriptionTier')
    SubscriptionTier.objects.all().delete()

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_subscription_tiers, remove_subscription_tiers),
    ] 