"""App config file for app module"""
from django.apps import AppConfig


class ReportsConfig(AppConfig):
    """App config class for report app"""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'reports'
