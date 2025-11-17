import os
import django

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

# Import models
from apps.api.models import TeamMember, SubscriptionTier

def create_admin():
    # Find the premium tier
    tiers = SubscriptionTier.objects.all()
    print("Available tiers:")
    for tier in tiers:
        print(f"- {tier.name}: {tier}")

    # Try to get the premium tier
    premium_tier = SubscriptionTier.objects.filter(name='premium').first()
    if not premium_tier:
        print("Premium tier not found! Please use one of the tiers listed above.")
        return
        
    print(f"Using tier: {premium_tier}")
    
    # Create team member
    tm = TeamMember()
    tm.username = 'rosalind.ceo'
    tm.email = 'your.email@example.com'
    tm.subscription_tier = premium_tier
    tm.is_superuser = True
    tm.is_staff = True
    tm.is_active = True
    tm.role = 'admin'
    tm.department = 'Management'
    tm.can_manage_users = True
    tm.can_manage_subscriptions = True
    tm.can_view_audit_logs = True
    tm.can_manage_documents = True
    
    # Set password and save
    tm.set_password('your_secure_password')
    tm.save()
    
    print(f"TeamMember created successfully: {tm.username}")
    print(f"Is superuser: {tm.is_superuser}")
    print(f"Tier: {tm.subscription_tier.name}")

if __name__ == '__main__':
    create_admin()
