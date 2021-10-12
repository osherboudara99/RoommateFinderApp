from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode

signup_blueprint = Blueprint('signup', __name__)



@signup_blueprint.route('/signup', methods=['GET', 'POST'])
def signup():

    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    birthDay = request.json['birthDay']
    email =  request.json['email']
    phone = request.json['phone']
    password =  request.json['password']

        
    signup_sql = ("INSERT INTO SeniorProject.Users VALUES (NULL, %s, %s, %s, %s, %s, %s)")
    signup_values = (firstName, lastName, phone, password, email, birthDay)
    cursor = cnx.cursor()
    row_headers=[x[0] for x in cursor.description]

    cursor.execute(signup_sql, signup_values)

    rv = cursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    
    cursor.close()
    cnx.close()
    return json.dumps(json_data)
    