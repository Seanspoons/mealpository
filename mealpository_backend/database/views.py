from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from database.database_controller import DatabaseController
from database.recipe import Recipe
from database.instruction import Instruction
from database.ingredient import Ingredient

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
    try:
        new_recipe_data = request.data # get the recipe from the request body

        # Extract data from the request
        recipeID = new_recipe_data.get('recipe_id')
        title = new_recipe_data.get('title')
        description = new_recipe_data.get('description')
        servings = new_recipe_data.get('servings')
        prepTime = new_recipe_data.get('prep_time')
        cookTime = new_recipe_data.get('cook_time')
        totalTime = new_recipe_data.get('total_time')
        imageURL = new_recipe_data.get('image_url')
        userID = new_recipe_data.get('user_id')
        ingredients = new_recipe_data.get('ingredients') # list of dictionaries
        instructions = new_recipe_data.get('instructions') # list of dictionaires

        ingredient_objects = []
        for ingredient_data in ingredients:
            ingredient = Ingredient(ingredient_data.get('ingredient_id'), ingredient_data.get('name'), ingredient_data.get('quantity'), ingredient_data.get('unit'), ingredient_data.get('category'), ingredient_data.get('recipe_id'))
            ingredient_objects.append(ingredient)

        instruction_objects = []
        for instruction_data in instructions:
            instruction = Instruction(instruction_data.get('instruction_id'), instruction_data.get('number'), instruction_data.get('instruction'), instruction_data.get('recipe_id'))
            instruction_objects.append(instruction)

        new_recipe = Recipe(recipeID, title, description, servings, prepTime, cookTime, totalTime, imageURL, userID, "none", ingredient_objects, instruction_objects)

        db_controller = DatabaseController()
        recipesUpload = db_controller.upload_recipe(new_recipe)

        return Response({"detail": "Data uploaded successfully."})
    except Exception as ex:
        print('An error occured:', ex)
        return Response({"detail": "An error occured.", "error": str(ex)}, status=500)
