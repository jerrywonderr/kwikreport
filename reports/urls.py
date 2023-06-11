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
    view_report,
    make_report_private,
    make_report_public
)

urlpatterns = [
    path("all/", get_all_reports, name="get-reports"),
    path("add/", display_create_report_page, name="add-report"),
    path("edit/<str:report_id>/", display_create_report_page, name="edit-report"),
    path("find/", find_report, name="find-report"),
    path("save/", save_report, name="save-report"),
    path("drop/<str:report_id>/", delete_report, name="delete-report"),
    path("share/<str:report_id>/", delete_report, name="share-report"),
    path("view/<str:report_id>/", view_report, name="view-report"),
    path("public/<str:report_id>/", make_report_public, name="make-report-public"),
    path("private/<str:report_id>/", make_report_private, name="make-report-private"),
]
