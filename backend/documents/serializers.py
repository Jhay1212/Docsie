from rest_framework import serializers
from .models import Documents

class DocumentSerializer(serializers.ModelSerializer):
    owner_id = serializers.StringRelatedField()
    # version_number = serializers
    class Meta:
        model = Documents
        fields = [
            'id',
            'title',
            'slug',
            'owner_id',
            'text', 
            'date_created',
            'date_modified', 
            'is_public'
            ]
        read_only_fields = ['date_created', 'date_modified']