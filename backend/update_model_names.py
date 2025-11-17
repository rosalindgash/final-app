"""
Update script to fix model verbose names for proper capitalization
"""
import os
import django
import sys

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

# Import models
from django.apps import apps

def update_model_verbose_names():
    """Update verbose names for all models to ensure proper capitalization"""
    print("Updating model verbose names for proper capitalization...")
    
    # Model name mapping with proper capitalization
    model_names = {
        'customuser': 'User',
        'userpreferences': 'User Preferences',
        'additionalstorage': 'Additional Storage',
        'subscription': 'Subscription',
        'subscriptiontier': 'Subscription Tier',
        'accountprovisioning': 'Account Provisioning',
        'document': 'Document',
        'documenttag': 'Document Tag',
        'backup': 'Backup',
        'teammember': 'Team Member',
        'accesscontrol': 'Access Control',
        'auditlog': 'Audit Log',
        'notification': 'Notification',
        'storageusage': 'Storage Usage',
    }
    
    # Loop through all models in the api app
    api_app = apps.get_app_config('api')
    for model in api_app.get_models():
        model_name = model.__name__.lower()
        
        if model_name in model_names:
            # Update the model's Meta attributes
            proper_name = model_names[model_name]
            
            # We can't modify Meta directly, but we can print instructions
            print(f"For model {model.__name__}:")
            print(f"  Set verbose_name = '{proper_name}'")
            print(f"  Set verbose_name_plural = '{proper_name}s' (or appropriate plural)")
            print("")

if __name__ == '__main__':
    update_model_verbose_names()
    print("\nNOTE: This script provides guidance on which model Meta classes to update.")
    print("You'll need to manually update the Meta classes in your models.py file.")
    print("After updating, restart your Django server for changes to take effect.")
