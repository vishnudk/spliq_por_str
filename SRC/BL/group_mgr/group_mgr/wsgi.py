import os
import elasticapm

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "group_mgr.settings")

elasticapm.instrument()

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
