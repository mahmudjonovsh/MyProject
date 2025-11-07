from django.contrib import admin
from .models import Sale

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'status', 'customer_name', 'created_at', 'user']
    list_filter = ['status', 'created_at', 'updated_at']
    search_fields = ['title', 'description', 'customer_name', 'customer_email']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Sale Information', {
            'fields': ('title', 'description', 'price', 'status')
        }),
        ('Customer Information', {
            'fields': ('customer_name', 'customer_email', 'customer_phone')
        }),
        ('System Information', {
            'fields': ('user', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def save_model(self, request, obj, form, change):
        if not change:
            obj.user = request.user
        super().save_model(request, obj, form, change)