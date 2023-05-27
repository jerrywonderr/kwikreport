"""Admin models for user_profile app"""
from django.contrib import admin

from user_profile.models import User

admin.site.register(User)
