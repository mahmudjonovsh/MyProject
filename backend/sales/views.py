from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q, Sum
from .models import Sale
from .serializers import SaleSerializer, SaleCreateSerializer, SaleUpdateSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sale_list_view(request):
    """
    Get all sales for the authenticated user with optional filtering
    """
    # Get query parameters for filtering
    status_filter = request.query_params.get('status', None)
    search_query = request.query_params.get('search', None)
    
    # Base queryset - only show sales for the current user
    sales = Sale.objects.filter(user=request.user)
    
    # Apply filters
    if status_filter:
        sales = sales.filter(status=status_filter)
    
    if search_query:
        sales = sales.filter(
            Q(title__icontains=search_query) |
            Q(description__icontains=search_query) |
            Q(customer_name__icontains=search_query) |
            Q(customer_email__icontains=search_query)
        )
    
    # Order by most recent
    sales = sales.order_by('-created_at')
    
    serializer = SaleSerializer(sales, many=True)
    return Response({
        'sales': serializer.data,
        'total_count': sales.count()
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sale_create_view(request):
    """
    Create a new sale
    """
    serializer = SaleCreateSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        sale = serializer.save()
        return Response({
            'message': 'Sale created successfully',
            'sale': SaleSerializer(sale).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sale_detail_view(request, pk):
    """
    Get a specific sale by ID
    """
    sale = get_object_or_404(Sale, pk=pk, user=request.user)
    serializer = SaleSerializer(sale)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def sale_update_view(request, pk):
    """
    Update a sale (full update with PUT, partial with PATCH)
    """
    sale = get_object_or_404(Sale, pk=pk, user=request.user)
    serializer = SaleUpdateSerializer(sale, data=request.data, partial=(request.method == 'PATCH'))
    if serializer.is_valid():
        sale = serializer.save()
        return Response({
            'message': 'Sale updated successfully',
            'sale': SaleSerializer(sale).data
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def sale_delete_view(request, pk):
    """
    Delete a sale
    """
    sale = get_object_or_404(Sale, pk=pk, user=request.user)
    sale.delete()
    return Response({
        'message': 'Sale deleted successfully'
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sale_statistics_view(request):
    """
    Get sales statistics for the authenticated user
    """
    sales = Sale.objects.filter(user=request.user)
    
    total_sales = sales.count()
    total_revenue = sales.filter(status='completed').aggregate(
        total=Sum('price')
    )['total'] or 0
    
    pending_sales = sales.filter(status='pending').count()
    completed_sales = sales.filter(status='completed').count()
    cancelled_sales = sales.filter(status='cancelled').count()
    
    return Response({
        'total_sales': total_sales,
        'total_revenue': float(total_revenue),
        'pending_sales': pending_sales,
        'completed_sales': completed_sales,
        'cancelled_sales': cancelled_sales
    }, status=status.HTTP_200_OK)