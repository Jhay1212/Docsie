import datetime


class OTOperation:
    def __init__(self, operation_type, position, content: str, length=0):
        self.operation_type = operation_type
        self.content = content
        self.position = position
        self.length = length if operation_type == "delete" else len(content)
        self.timestamp = datetime.now()
        
def transform(op1, op2):
    if op1.operation_type == "insert" and op2.operation_type == "insert":
        if op1.position < op2.position:
            return op1, op2
        elif op1.position > op2.position:
            return OTOperation("insert", op1.position + op2.length, op1.content)
            
        
    
        