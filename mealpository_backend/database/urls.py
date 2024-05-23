from django.urls import re_path
from . import views

urlpatterns = [
    re_path('get_recipes', views.get_recipes),
    re_path('upload_recipe', views.upload_recipe),
    re_path('delete_recipes', views.delete_recipes)
    
]