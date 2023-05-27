"""Views for the report app"""

import json
from django.shortcuts import render
from django.views.decorators.http import (
    require_GET, require_POST, require_http_methods
)
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize

from reports.models import Report
from reports.helpers import report_save


@login_required
@require_GET
def display_create_report_page(request, report_id=None):
    """This views handles report creation"""
    params = {}
    if report_id:
        params['report_id'] = report_id
    return render(request, 'add-report.html', params)


@login_required
@require_GET
def get_all_reports(request):
    """Gets all report owned by the user in session"""
    reports = Report.objects.filter(owner=request.user) # pylint: disable=no-member
    reports = serialize('json', reports)
    return HttpResponse(reports, content_type="application/json")


@login_required
@require_GET
def find_report(request):
    """This views handles report retrieval"""
    report_id = request.GET.get('id')
    report = Report.objects.get(id=report_id) # pylint: disable=no-member
    return HttpResponse(report.to_json(), content_type="application/json")


@login_required
@require_POST
def save_report(request):
    """Endpoint to save a report"""
    content = request.body.decode('utf-8')
    content = json.loads(content)
    report = report_save(request.user, content)
    return HttpResponse(report.to_json(), content_type="application/json")


@login_required
@require_http_methods(['DELETE'])
def delete_report(request, report_id):
    """Deletes a report"""
    report = Report.objects.get(id=report_id, owner=request.user) # pylint: disable=no-member
    report.delete()
    return JsonResponse({'status': 'ok'})
