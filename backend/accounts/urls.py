from django.urls import path
from . import views

urlpatterns = [
    path('auth/register/', views.register_view, name='register'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/verify/', views.verify_token_view, name='verify_token'),
    path('auth/profile/', views.user_profile_view, name='user_profile'),
]