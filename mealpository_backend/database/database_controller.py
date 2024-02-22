import json
import os
import pyodbc
from recipe import Recipe 

class DatabaseController:

    def __init__(self):
        self.server = 'tcp:host-mealpository.database.windows.net' 
        self.database = 'mealdb'
        self.username = os.environ.get('SQL_USERNAME')
        self.password = os.environ.get('SQL_PASSWORD')
        self.driver = '{ODBC Driver 18 for SQL Server}'
        self.cnxn = None
        self.cursor = None

    def connect(self):
        self.cnxn = pyodbc.connect('DRIVER=' + self.driver + 
                      ';SERVER=' + self.server + 
                      ';DATABASE=' + self.database + 
                      ';UID=' + self.username + 
                      ';PWD=' + self.password)
        self.cursor = self.cnxn.cursor()
        print('Connection established')

    def get_recipes(self):
        try:
            sql_query = "SELECT * FROM Recipes"

            self.cursor.execute(sql_query) # execute query
            rows = self.cursor.fetchall()

            recipes = []
            for row in rows:
                recipe = Recipe(row.recipe_id, row.title, row.description, row.instructions, row.servings, row.prep_time,
                        row.cook_time, row.total_time, row.image_url, row.user_id, row.file_name)
                recipes.append(recipe.serialize_self())

            json_data = json.dumps(recipes)

            return json_data
    
        except pyodbc.Error as e:
            print('Error connecting to SQL server:', e)

        except Exception as ex:
            print('An error occurred:', ex)