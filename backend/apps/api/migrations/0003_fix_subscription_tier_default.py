from django.db import migrations, models
import django.db.models.deletion

def set_default_subscription_tier(apps, schema_editor):
    CustomUser = apps.get_model('api', 'CustomUser')
    SubscriptionTier = apps.get_model('api', 'SubscriptionTier')
    
    # Get the free tier
    free_tier = SubscriptionTier.objects.get(name='free')
    
    # Update all users that don't have a subscription tier
    CustomUser.objects.filter(subscription_tier__isnull=True).update(subscription_tier=free_tier)

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0002_create_subscription_tiers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='subscription_tier',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='users',
                to='api.subscriptiontier',
                null=True  # Temporarily allow null
            ),
        ),
        migrations.RunPython(set_default_subscription_tier),
        migrations.AlterField(
            model_name='customuser',
            name='subscription_tier',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='users',
                to='api.subscriptiontier'
            ),
        ),
    ] 