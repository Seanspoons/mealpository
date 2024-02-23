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

    def create_user(self, user):
        try:
            sql_query = """
                INSERT INTO Users (user_id, first_name, sub_status, email)
                VALUES (?, ?, ?, ?)
            """

            self.cursor.execute(sql_query, (user.id, user.first_name, 0, user.email))
            self.cnxn.commit()
    
        except pyodbc.Error as e:
            print('Error executing SQL query:', e)
            self.cnxn.rollback()
            raise

        finally:
            if self.cursor:
                self.cursor.close()
            if self.cnxn:
                self.cnxn.close()
