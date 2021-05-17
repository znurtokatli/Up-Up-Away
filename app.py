from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy import engine
from sqlalchemy import log
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, Table
from sqlalchemy.sql.schema import MetaData
import pandas as pd
from flask import Blueprint, render_template, Flask, jsonify



#connect to database
# engine = create_engine("postgres://postgres:welcome1$@localhost:5432/aviation")

# DATABASE_URL = f'postgresql://postgres:welcome1@localhost:5432/aviation'
#conn = create_engine(f'postgresql://postgres:{sqlkey}@localhost:5432/aviation').connect()


#################################################
# Database Setup
#################################################
# engine = create_engine(DATABASE_URL)


# flight_details = pd.read_sql_query('SELECT * FROM flight_details', engine.connect()).to_dict()

# Create app

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("base.html")

@app.route('/chart1')
def chart1():
    return render_template("base1.html")   #bar chart

@app.route('/chart2')
def chart2():
    return render_template("base2.html")       #scatter

@app.route('/chart3')
def chart3():
    return render_template("base3.html")       #scatter

# @app.route('/api/data')
# def api():
#     return flight_details

if __name__ == '__main__':
    app.run(debug = True)

   
# d3.json('/api/data').then(data=>{
#     console.log(data)
# }) 