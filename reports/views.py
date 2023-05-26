"""Views for the report app"""

import json
from django.shortcuts import render
from django.views.decorators.http import (
    require_GET, require_POST
)
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

from reports.models import Report

@login_required
@require_GET
def create_report(request):
    """This views handles report creation"""
    return render(request, 'add-report.html')

@login_required
@require_POST
def save_report(request):
    """Endpoint to save a report"""
    content = request.body.decode('utf-8')
    content = json.loads(content)
    report = Report()
    report.save_report(request.user, content)
    return HttpResponse(report.to_json(), content_type="application/json")
