from django.shortcuts import render
from .serializers import DocumentPermissionSerializer
from .models import DocumentPermission
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class DocumentPermissionViewSet(viewsets.ModelViewSet):
    queryset = DocumentPermission.objects.all()
    serializer_class = DocumentPermissionSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
