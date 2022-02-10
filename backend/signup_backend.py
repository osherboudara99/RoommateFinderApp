from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode

signup_blueprint = Blueprint('signup', __name__)
email = ''
password = ''


@signup_blueprint.route('/signup', methods=['POST'])
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
    

    try:
        cursor.execute(signup_sql, signup_values)
        cnx.commit()
        cursor.close()
        cnx.close()
        return "executed"
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"
    