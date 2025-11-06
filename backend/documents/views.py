from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from .models import Documents
from .serializers import DocumentSerializer
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
import uuid
class DocumentViewSet(ModelViewSet):
    queryset = Documents.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        return super().perform_create(serializer)
    
    # def get_queryset(self, *args, **kwargs):
    #     user = self.request.user
    #     print(user)
    #     if user.is_anonymous:
    #         return self.queryset.none()
    #     return Documents.objects.filter(
    #         Q(owner_id=user.id)
    #     ).distinct()
