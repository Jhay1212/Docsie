from backend.users.serializers import UserSerializer
from documents.serializers import DocumentSerializer
from rest_framework import serializers
from .models import DocumentPermission

class DocumentPermissionSerializer(serializers.ModelSerializer):
    granted_by = UserSerializer()
    docs = DocumentSerializer()
    class Meta:
        model = DocumentPermission
        fields = "__all__"