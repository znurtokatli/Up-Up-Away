#module dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect
import psycopg2

import pandas as pd

from config import conn_str    

# connect to database
def connect2db(conn_str):
    try:
        engine = create_engine(f"postgresql://{conn_str}" )
        conn = engine.connect()   
    except(Exception) as error:
        print(error)
        #sys.exit(1)
    print("Connection Succesful")
    
    return conn

# insert values to given from parameters
def insertvalues(conn, table, values):
    
    try:
        values.to_sql(name = table, con = conn, if_exists = 'append', index = False)
    except Exception as error:
        print("Error While Insert Data: " + error)
    print("Values Succesfully Insert To " + table)
 
# execute select statement  
def executeSelectstatement(conn, table, column):

    query1 = f"select {column} from {table};"
    try: 
        for row in conn.execute(query1):
            result = dict(row.items())
    except Exception as error:
        print("Error " + error)
    
    return result

 # execute statement  
def executestatement(conn, str): 
    global result
    query1 = f"{str};"
    try: 
        for row in conn.execute(query1):
            result = dict(row.items())
    except Exception as error:
        print("Error " + error)
    
    return result   

# database connection close 
def closeconnection(conn):

    try:
        conn.close()
    except Exception as error:
        print("Error: " + error)
    print("DB Connection Closed")