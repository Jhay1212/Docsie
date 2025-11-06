from django.conf import settings
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter
from documents.urls import router as documents_router
from document_permission.urls import router as permission_router
from backend.users.api.views import UserViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)


app_name = "api"
urlpatterns = [
    path("", include(router.urls)),
    path("", include(documents_router.urls)),
    path("", include(permission_router.urls)),
]
