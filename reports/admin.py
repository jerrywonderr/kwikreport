""""Admin module for the report app"""
from django.contrib import admin
from reports.models import Report

admin.site.register(Report)
