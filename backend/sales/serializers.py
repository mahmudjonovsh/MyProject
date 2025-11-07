from rest_framework import serializers
from .models import Sale

class SaleSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    formatted_price = serializers.ReadOnlyField()
    status_badge_class = serializers.ReadOnlyField()
    
    class Meta:
        model = Sale
        fields = [
            'id', 'title', 'description', 'price', 'status',
            'customer_name', 'customer_email', 'customer_phone',
            'created_at', 'updated_at', 'user', 'user_email',
            'formatted_price', 'status_badge_class'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'user']
    
    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than zero.")
        return value
    
    def validate_status(self, value):
        valid_statuses = [choice[0] for choice in Sale.STATUS_CHOICES]
        if value not in valid_statuses:
            raise serializers.ValidationError(f"Status must be one of: {', '.join(valid_statuses)}")
        return value
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class SaleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = [
            'title', 'description', 'price', 'status',
            'customer_name', 'customer_email', 'customer_phone'
        ]
    
    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than zero.")
        return value
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class SaleUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = [
            'title', 'description', 'price', 'status',
            'customer_name', 'customer_email', 'customer_phone'
        ]
    
    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than zero.")
        return value