"""Views for the report app"""

from django.shortcuts import render

def create_report(request):
    """This views handles report creation"""
    return render(request, 'add-report.html')
