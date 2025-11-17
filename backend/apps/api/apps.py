from django.apps import AppConfig

class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.api"
    verbose_name = "Organization Management"

    def ready(self):
        import apps.api.admin  # This will ensure admin.py is loaded properly
        import apps.api.signals  # Import signals for auto-provisioning
