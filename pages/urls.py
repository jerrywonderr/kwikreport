"""
URL mappings for the pages app
"""
from django.urls import path
from pages.views import home, contact, account

urlpatterns = [
    path('', home, name='home'),
    path('contact/', contact, name='contact'),
    path('account/', account, name='account'),
]
