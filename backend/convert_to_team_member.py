import os
import django
import sys

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

# Import models
from apps.api.models import CustomUser, TeamMember, SubscriptionTier
from django.db import transaction

def convert_to_team_member():
    # Get the username from command line argument or use default
    username = sys.argv[1] if len(sys.argv) > 1 else 'rosalind.ceo'
    
    # Find the premium tier
    tiers = SubscriptionTier.objects.all()
    print("Available tiers:")
    for tier in tiers:
        print(f"- {tier.name}: {tier}")

    # Get premium tier
    premium_tier = None
    for tier in tiers:
        if tier.name.lower() == 'premium':
            premium_tier = tier
            break
    
    if not premium_tier:
        print("Premium tier not found! Please specify a tier name:")
        tier_name = input("Enter tier name from the list above: ")
        premium_tier = SubscriptionTier.objects.filter(name=tier_name).first()
        if not premium_tier:
            print(f"Tier '{tier_name}' not found. Exiting.")
            return
    
    print(f"Using tier: {premium_tier}")
    
    # Find the user
    try:
        user = CustomUser.objects.get(username=username)
        print(f"Found user: {user.username}")
    except CustomUser.DoesNotExist:
        print(f"User '{username}' not found. Exiting.")
        return
    
    # Check if already a TeamMember
    try:
        team_member = TeamMember.objects.get(username=username)
        print(f"User '{username}' is already a TeamMember. Updating settings...")
    except TeamMember.DoesNotExist:
        print(f"Converting '{username}' to TeamMember...")
        with transaction.atomic():
            # Create a new TeamMember with the same ID and attributes
            team_member = TeamMember()
            team_member.id = user.id
            team_member.username = user.username
            team_member.password = user.password
            team_member.email = user.email
            team_member.first_name = user.first_name
            team_member.last_name = user.last_name
            team_member.is_superuser = True
            team_member.is_staff = True
            team_member.is_active = True
            team_member.subscription_tier = premium_tier
            
            # TeamMember specific fields
            team_member.role = 'admin'
            team_member.department = 'Management'
            team_member.can_manage_users = True
            team_member.can_manage_subscriptions = True
            team_member.can_view_audit_logs = True
            team_member.can_manage_documents = True
            
            # Save the team member
            user.delete()  # Delete the original user
            team_member.save()  # Save the team member
            
    print(f"TeamMember updated successfully: {team_member.username}")
    print(f"Is superuser: {team_member.is_superuser}")
    print(f"Tier: {team_member.subscription_tier.name}")
    print(f"Role: {team_member.role}")

if __name__ == '__main__':
    convert_to_team_member()
