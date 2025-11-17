#!/usr/bin/env python
import os
import sys
import django

# Add the project's root directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

# Import models
from apps.api.models import CustomUser, SubscriptionTier, AccountProvisioning, UserPreferences, StorageUsage, Subscription

def test_auto_provisioning():
    """Test that account auto-provisioning works correctly"""
    print("Testing account auto-provisioning...")
    
    # Find a subscription tier
    try:
        tier = SubscriptionTier.objects.first()
        if not tier:
            print("Error: No subscription tiers found. Please create at least one tier.")
            return
        print(f"Using tier: {tier}")
    except Exception as e:
        print(f"Error finding subscription tier: {e}")
        return
    
    # Create a test user
    try:
        test_user = CustomUser.objects.create(
            username=f"testuser_{CustomUser.objects.count() + 1}",
            email=f"testuser_{CustomUser.objects.count() + 1}@example.com",
            subscription_tier=tier,
            subscription_status='active',
            is_active=True
        )
        test_user.set_password('testpassword123')
        test_user.save()
        print(f"Created test user: {test_user.username}")
    except Exception as e:
        print(f"Error creating test user: {e}")
        return
    
    # Check if provisioning was created
    try:
        provisioning = AccountProvisioning.objects.filter(user=test_user).first()
        if provisioning:
            print(f"Account provisioning created: {provisioning.status}")
            print(f"Completed: {provisioning.is_complete}")
        else:
            print("Error: No provisioning record was created.")
    except Exception as e:
        print(f"Error checking provisioning: {e}")
    
    # Check if preferences were created
    try:
        preferences = UserPreferences.objects.filter(user=test_user).first()
        if preferences:
            print(f"User preferences created: {preferences.theme}, {preferences.language}")
        else:
            print("Error: No preferences record was created.")
    except Exception as e:
        print(f"Error checking preferences: {e}")
    
    # Check if storage usage was created
    try:
        storage = StorageUsage.objects.filter(user=test_user).first()
        if storage:
            print(f"Storage usage created: {storage.total_used_bytes} bytes")
        else:
            print("Error: No storage usage record was created.")
    except Exception as e:
        print(f"Error checking storage usage: {e}")
    
    # Check if subscription was created
    try:
        subscription = Subscription.objects.filter(user=test_user).first()
        if subscription:
            print(f"Subscription created: {subscription.tier.name}, {subscription.status}")
            print(f"Payment provider: {subscription.payment_provider}")
        else:
            print("Error: No subscription record was created.")
    except Exception as e:
        print(f"Error checking subscription: {e}")
    
    print("Auto-provisioning test complete!")

if __name__ == '__main__':
    test_auto_provisioning()
