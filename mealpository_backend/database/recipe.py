class Recipe:
    def __init__(self, 
                 recipe_id, title, description, instructions, servings, prep_time,
                   cook_time, total_time, image_url, user_id, file_name, ingredients
                ):
        self.recipe_id = recipe_id
        self.title = title
        self.description = description
        self.instructions = instructions
        self.servings = servings
        self.prep_time = prep_time
        self.cook_time = cook_time
        self.total_time = total_time
        self.image_url = image_url
        self.user_id = user_id
        self.file_name = file_name
        self.ingredients = ingredients

    def serialize_self(self):
        return {
            'recipe_id': self.recipe_id,
            'title': self.title,
            'description': self.description,
            'instructions': self.instructions,
            'servings': self.servings,
            'prep_time': self.prep_time,
            'cook_time': self.cook_time,
            'total_time': self.total_time,
            'image_url': self.image_url,
            'user_id': self.user_id,
            'file_name': self.file_name,
            'ingredients': self.ingredients
        }
