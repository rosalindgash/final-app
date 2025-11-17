from django.contrib.admin import AdminSite

class OrganizationAdminSite(AdminSite):
    site_header = 'Organization Management System'
    site_title = 'Organization Management System'
    index_title = 'Welcome to Organization Management System'

    def get_app_list(self, request):
        """
        Override the get_app_list method to organize models into logical sections
        """
        # Get the default app list
        app_list = super().get_app_list(request)
        
        # Define our custom sections with properly capitalized model names
        sections = {
            'Subscriber Settings': [
                ('customuser', 'Users'),
                ('userpreferences', 'User Preferences'),
                ('additionalstorage', 'Additional Storage'),
            ],
            'Account Provisioning': [
                ('subscription', 'Subscriptions'),
                ('subscriptiontier', 'Subscription Tiers'),
                ('accountprovisioning', 'Account Provisioning'),
            ],
            'Files': [
                ('document', 'Documents'),
                ('documenttag', 'Document Tags'),
                ('backup', 'Backups'),
            ],
            'System': [
                ('teammember', 'Team Members'),
                ('accesscontrol', 'Access Controls'),
                ('auditlog', 'Audit Logs'),
                ('notification', 'Notifications'),
                ('storageusage', 'Storage Usage'),
            ]
        }

        # Create new app list with our sections
        custom_app_list = []
        
        # Track models we've already included
        included_models = set()
        
        # First, add our custom sections
        for section_name, model_tuples in sections.items():
            section_models = []
            
            for model_name, verbose_name in model_tuples:
                # Find this model in the original app_list
                for app in app_list:
                    for model in app['models']:
                        if model['object_name'].lower() == model_name.lower():
                            # Create a copy of the model dict with updated name
                            model_copy = model.copy()
                            model_copy['name'] = verbose_name  # Use our properly capitalized name
                            section_models.append(model_copy)
                            included_models.add(model['object_name'])
                            break
            
            if section_models:
                custom_app_list.append({
                    'name': section_name,  # Properly capitalized section name
                    'app_label': 'api',
                    'app_url': '/admin/api/',
                    'has_module_perms': True,
                    'models': section_models,
                })
        
        # Add any remaining apps/models that weren't included in our sections
        for app in app_list:
            remaining_models = []
            
            for model in app['models']:
                if model['object_name'] not in included_models:
                    remaining_models.append(model)
            
            if remaining_models:
                custom_app_list.append({
                    'name': app['name'],
                    'app_label': app['app_label'],
                    'app_url': app['app_url'],
                    'has_module_perms': app['has_module_perms'],
                    'models': remaining_models,
                })
        
        return custom_app_list

# Create a single instance
admin_site = OrganizationAdminSite(name='organization_admin')
