import json
import pyodbc
from database.recipe import Recipe 
from database.secret import Secret

class DatabaseController:

    def __init__(self):
        secret = Secret()
        self.server = 'tcp:host-mealpository.database.windows.net' 
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
            sql_query = "SELECT * FROM Recipes WHERE user_id = ?"
            print("ID IS: " + user_id)

            self.cursor.execute(sql_query, (user_id,)) # execute query
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
            raise

        finally:
            if self.cursor:
                self.cursor.close()
            if self.cnxn:
                self.cnxn.close()