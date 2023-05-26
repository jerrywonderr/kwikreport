"""
URL mappings for the pages app
"""
from django.urls import path
from reports.views import create_report, save_report

urlpatterns = [
    path('add', create_report, name='add-report'),
    path('', save_report, name="save-report"),
]
