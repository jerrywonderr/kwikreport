"""
URL mappings for the pages app
"""
from django.urls import path
from user_profile.views import LoginView, LogoutView

urlpatterns = [
    path(
        "login",
        LoginView.as_view(),
        name="login",
    ),
    path("logout", LogoutView.as_view(), name="logout"),
]
