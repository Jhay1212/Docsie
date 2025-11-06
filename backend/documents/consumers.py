import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from .models import Documents

class DocumentConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        self.document_id = self.scope['url_route']['kwargs']['id']
        self.room_group_name = f'Document:{self.document_id}'
        self.incoming_user = self.scope['user']

        if not self.incoming_user in Documents.objects.get(id=self.document_id).collaborator.all():
            self.close()
            
        
        await self.channel_layer.group_add(self.document_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.document_group_name, self.channel_name)
        
        return
    
    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        content = data["content"]
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "rich_text_update",
                "content": content,
            }
        )
    async def rich_text_update(self, event):
        await self.send(text_data=event["content"])
# class DocumentConsumer(WebsocketConsumer):
    
#     def connect(self):
#         print(self)
#         self.accept()
        
#     def receive(self, text_data=None, bytes=None):
#         self.send(text_data="Hello World test connection")
#         self.send(bytes_data="HelloWorld")
#         self.close()
        
        
#     def disconnect(self, code):
#         self.close(code=code)