from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from database.database_controller import DatabaseController

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_recipes(request):
    try:
        user_id = request.query_params.get('user_id')
        db_controller = DatabaseController()
        recipes_data = db_controller.get_recipes(user_id)

        return Response({"detail": "Data retrieved successfully.", "data": recipes_data})
    except Exception as ex:
        print('An error occured:', ex)
        return Response({"detail": "An error occured.", "error": str(ex)}, status=500)
