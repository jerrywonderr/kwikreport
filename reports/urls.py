"""
URL mappings for the pages app
"""
from django.urls import path
from reports.views import create_report

urlpatterns = [
    path('add', create_report, name='add-report'),
]
