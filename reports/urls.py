"""
URL mappings for the pages app
"""
from django.urls import path
from reports.views import (
    display_create_report_page,
    save_report,
    find_report,
    delete_report,
    get_all_reports,
)

urlpatterns = [
    path("all/", get_all_reports, name="get-reports"),
    path("add/", display_create_report_page, name="add-report"),
    path("edit/<str:report_id>/", display_create_report_page, name="edit-report"),
    path("find/", find_report, name="find-report"),
    path("save/", save_report, name="save-report"),
    path("drop/<str:report_id>/", delete_report, name="delete-report"),
    path("share/<str:report_id>/", delete_report, name="share-report"),
]
