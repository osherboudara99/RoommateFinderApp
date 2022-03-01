from flask import Blueprint, app, request
import os
import mysql.connector
from mysql.connector import errorcode

login_blueprint = Blueprint('login', __name__)


@login_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120')
    cnx = mysql.connector.connect(user='root', password='',
                                  host='127.0.0.1')

    global email
    global password

    email = request.json['email']
    password = request.json['password']
    cursor = cnx.cursor()
    login_sql = (
        "SELECT email, password FROM SeniorProject.Users WHERE (email = %s) AND password = %s")
    login_values = (email, password)

    cursor.execute(login_sql, login_values)

    values = cursor.fetchall()
    # print(values[0][1])

    if values and values[0][0] == email and values[0][1] == password:
        cursor.close()
        cnx.close()
        return "logged in"
    else:
        cursor.close()
        cnx.close()
        return "not logged in"
