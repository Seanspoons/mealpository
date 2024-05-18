class Ingredient:
    def __init__(self, 
                 ingredient_id, name, quantity, unit, category, recipe_id
                ):
        self.ingredient_id = ingredient_id
        self.name = name
        self.quantity = quantity
        self.unit = unit
        self.category = category
        self.recipe_id = recipe_id

    def serialize_self(self):
        return {
            'ingredient_id': self.ingredient_id,
            'name': self.name,
            'quantity': self.quantity,
            'unit': self.unit,
            'category': self.category,
            'recipe_id': self.recipe_id

        }
