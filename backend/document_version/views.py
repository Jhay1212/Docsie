from django.shortcuts import render
from .serializers import DocumentVersionSerializer
from rest_framework.viewsets import ModelViewSet
from .models import DocumentVersion
from rest_framework import permissions
from documents.models import Documents

class DocumentVersionViewset(ModelViewSet):
    model = DocumentVersion
    queryset = DocumentVersion.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            docs = Documents.objects.filter(owner_id=user.id).distinct()
            return docs

        return Documents.objects.none()

# Create your views here.
