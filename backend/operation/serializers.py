from rest_framework import serializers
from .models import Operation
from backend.users.serializers import UserSerializer


class OperationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    class Meta:
        model = Operation
        fields = [
            "id", 
            "document",
            "username",
            "operation_type",
            "data",
            "position",
        ]
        read_only_fields = ["user", "timestamp"]
        
        
class SubmitOperationSerializer(serializers.Serializer):
    opt_type = serializers.ChoiceField(choices=['insert', 'delete'])
    position = serializers.IntegerField(min_value=0)
    content = serializers.CharField(required=False, allow_blank=True)
    length = serializers.IntegerField(min_value=0)
    
    def validate(self, data):
        if data["opt_type"] == "insert" and not data.get("content"):
            raise serializers.ValidationError("content is required for insert operation")
        if data["type"] == "delete" and not data.get("length"):
            raise serializers.ValidationError("Content Empty")
        return data