import os

# Set the default settings module based on the environment
environment = os.getenv('DJANGO_ENVIRONMENT', 'local')
if environment == 'production':
    from .production import *
else:
    from .local import *
