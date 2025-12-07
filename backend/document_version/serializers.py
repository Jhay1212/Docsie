from .models import DocumentVersion
from rest_framework import serializers

class DocumentVersionSerializer(serializers.ModelSerializer):
    document = serializers.StringRelatedField(read_only=True)
    class Meta: 
        model = DocumentVersion
        read_only_fields = ["version_number", "document", "content_delta", "change_summary", "created_by", ]
