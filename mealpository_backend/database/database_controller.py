import json
import pyodbc
from database.recipe import Recipe
from database.ingredient import Ingredient
from database.instruction import Instruction
from database.secret import Secret

class DatabaseController:

    def __init__(self):
        secret = Secret()
        self.server = 'tcp:mealpository.database.windows.net' 
        self.database = 'mealdb'
        self.username = secret.getUsername()
        self.password = secret.getPassword()
        self.driver = '{ODBC Driver 18 for SQL Server}'
        self.cnxn = None
        self.cursor = None
        self.connect()

    def connect(self):
        self.cnxn = pyodbc.connect('DRIVER=' + self.driver + 
                      ';SERVER=' + self.server + 
                      ';DATABASE=' + self.database + 
                      ';UID=' + self.username + 
                      ';PWD=' + self.password)
        self.cursor = self.cnxn.cursor()
        print('Connection established')

    def get_recipes(self, user_id):
        try:
            sql_query1 = "SELECT * FROM Recipes WHERE user_id = ?"
            sql_query2 = "SELECT * FROM Ingredients WHERE recipe_id = ?"
            sql_query3 = "SELECT * FROM Instructions WHERE recipe_id = ?"

            self.cursor.execute(sql_query1, (user_id,)) # execute query to fetch recipes
            rows = self.cursor.fetchall()

            recipes = []
            for row in rows:

                ingredients = []
                self.cursor.execute(sql_query2, (row.recipe_id,))
                rows2 = self.cursor.fetchall()

                for row2 in rows2:
                    string_quantity = str(row2.quantity)
                    ingredient = Ingredient(row2.ingredient_id, row2.name, string_quantity, row2.unit, row2.category, row2.recipe_id)
                    ingredients.append(ingredient.serialize_self())

                instructions = []
                self.cursor.execute(sql_query3, (row.recipe_id,))
                rows3 = self.cursor.fetchall()

                for row3 in rows3:
                    string_number = str(row3.number)
                    instruction = Instruction(row3.instruction_id, string_number, row3.instruction, row3.recipe_id)
                    instructions.append(instruction.serialize_self())

                recipe = Recipe(row.recipe_id, row.title, row.description, row.servings, row.prep_time,
                        row.cook_time, row.total_time, row.image_url, row.user_id, row.file_name, ingredients, instructions)
                recipes.append(recipe.serialize_self())

            json_data = json.dumps(recipes)

            return json_data
    
        except pyodbc.Error as e:
            print('Error connecting to SQL server:', e)
            raise

        finally:
            if self.cursor:
                self.cursor.close()
            if self.cnxn:
                self.cnxn.close()

    def upload_recipe(self, new_recipe):
        try:
            sql_query1 = ("INSERT INTO Recipes (recipe_id, title, description, servings, prep_time, cook_time, total_time, image_url, user_id)"
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);")
            values1 = (new_recipe.recipe_id, new_recipe.title, new_recipe.description, new_recipe.servings, new_recipe.prep_time, new_recipe.cook_time, new_recipe.total_time, new_recipe.image_url, new_recipe.user_id)
            self.cursor.execute(sql_query1, values1)

            sql_query2 = ("INSERT INTO Ingredients (ingredient_id, name, quantity, unit, recipe_id)"
            "VALUES (?, ?, ?, ?, ?)")
            for ingr in new_recipe.ingredients:
                values2 = (ingr.ingredient_id, ingr.name, ingr.quantity, ingr.unit, ingr.recipe_id)
                self.cursor.execute(sql_query2, values2)

            sql_query3 = ("INSERT INTO Instructions (instruction_id, number, instruction, recipe_id)"
            "VALUES (?, ?, ?, ?)")
            for inst in new_recipe.instructions:
                number = int(inst.number)
                values3 = (inst.instruction_id, number, inst.instruction, inst.recipe_id)
                self.cursor.execute(sql_query3, values3)
            
            self.cnxn.commit()
    
        except pyodbc.Error as e:
            print('Error connecting to SQL server:', e)
            raise

        finally:
            if self.cursor:
                self.cursor.close()
            if self.cnxn:
                self.cnxn.close()