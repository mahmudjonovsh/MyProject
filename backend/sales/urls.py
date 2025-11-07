from django.urls import path
from . import views

app_name = 'sales'

urlpatterns = [
    # List all sales for the authenticated user
    path('sales/', views.sale_list_view, name='sale-list'),
    
    # Create a new sale
    path('sales/create/', views.sale_create_view, name='sale-create'),
    
    # Get a specific sale by ID
    path('sales/<int:pk>/', views.sale_detail_view, name='sale-detail'),
    
    # Update a sale (PUT for full update, PATCH for partial update)
    path('sales/<int:pk>/update/', views.sale_update_view, name='sale-update'),
    
    # Delete a sale
    path('sales/<int:pk>/delete/', views.sale_delete_view, name='sale-delete'),
    
    # Get sales statistics
    path('sales/statistics/', views.sale_statistics_view, name='sale-statistics'),
]