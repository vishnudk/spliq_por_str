"""
WSGI config for user_mgr project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
import elasticapm
elasticapm.instrument()
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'user_mgr.settings')

application = get_wsgi_application()
