from django.db import models
from django.conf import settings

class Sale(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    customer_name = models.CharField(max_length=100, blank=True)
    customer_email = models.EmailField(blank=True)
    customer_phone = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sales')
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Sale'
        verbose_name_plural = 'Sales'
    
    def __str__(self):
        return f"{self.title} - ${self.price}"
    
    @property
    def formatted_price(self):
        return f"${self.price:,.2f}"
    
    @property
    def status_badge_class(self):
        """Returns CSS class based on status for frontend styling"""
        status_classes = {
            'pending': 'warning',
            'completed': 'success',
            'cancelled': 'danger'
        }
        return status_classes.get(self.status, 'secondary')