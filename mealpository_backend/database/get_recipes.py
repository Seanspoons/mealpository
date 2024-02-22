import pyodbc 

server = 'tcp:host-mealpository.database.windows.net' 
database = 'mealdb'
username = '' 
password = ''
driver = '{ODBC Driver 18 for SQL Server}'

try:
    cnxn = pyodbc.connect('DRIVER=' + driver + 
                      ';SERVER=' + server + 
                      ';DATABASE=' + database + 
                      ';UID=' + username + 
                      ';PWD=' + password)

    cursor = cnxn.cursor()
    print('Connection established')
except:
    print('Cannot connect to SQL server')