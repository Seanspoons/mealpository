import pyodbc
import os
from authentication.secret import Secret

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

    def connect(self):
        try:
            self.cnxn = pyodbc.connect('DRIVER=' + self.driver + 
                                        ';SERVER=' + self.server + 
                                        ';DATABASE=' + self.database + 
                                        ';UID=' + self.username + 
                                        ';PWD=' + self.password)
            self.cursor = self.cnxn.cursor()
            print('Connection established')
        except pyodbc.Error as e:
            print('Error establishing connection:', e)
            raise

    def get_user_id(self, email):
        try:
            sql_query = "SELECT user_id FROM Users WHERE email = ?"

            # Use parameterized query to prevent SQL injection
            self.cursor.execute(sql_query, (email,))
            row = self.cursor.fetchone()
            
            if row:
                user_id = row.user_id
                print("returning ID")
                return str(user_id)
            else:
                print("returning none")
                return None
    
        except pyodbc.Error as e:
            print('Error executing SQL query:', e)
            raise

        finally:
            # Close cursor and connection in a finally block to ensure they're always closed
            if self.cursor:
                self.cursor.close()
            if self.cnxn:
                self.cnxn.close()
