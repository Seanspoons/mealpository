from django.urls import re_path
from . import views

urlpatterns = [
    re_path('get_recipes', views.get_recipes),
    
]