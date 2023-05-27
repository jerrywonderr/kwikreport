"""
URL mappings for the pages app
"""
from django.urls import path
from pages.views import home

urlpatterns = [
    path('', home, name='home'),
]
