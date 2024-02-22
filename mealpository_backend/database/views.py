from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from database_controller import DatabaseController

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_recipes(request):
    db_controller = DatabaseController()
    recipes_data = db_controller.get_recipes()
    return Response({"detail": "data retrieved successfully.", "data": recipes_data})
