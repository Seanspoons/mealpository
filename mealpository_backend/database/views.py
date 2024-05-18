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
    
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def upload_recipe(request):
    
    new_recipe_data = request.data # get the recipe from the request body
    
    # Extract data from the request
    newRecipeID = new_recipe_data.get('newRecipeID')
    title = new_recipe_data.get('title')
    description = new_recipe_data.get('description')
    servings = new_recipe_data.get('servings')
    prepTime = new_recipe_data.get('prepTime')
    cookTime = new_recipe_data.get('cookTime')
    totalTime = new_recipe_data.get('totalTime')
    imageURL = new_recipe_data.get('imageURL')
    userID = new_recipe_data.get('userID')
    instructions = new_recipe_data.get('instructions')
    ingredientsList = new_recipe_data.get('ingredientsList')
    recipeIngredientsList = new_recipe_data.get('recipeIngredientsList')
