from django.shortcuts import render

# Create your views here.


def home(request):
    """
    The home view function
    """
    return render(request, "home.html")
