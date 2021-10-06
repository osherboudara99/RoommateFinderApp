from flask import Blueprint, app
import os
import mysql.connector
from mysql.connector import errorcode

login_blueprint = Blueprint('login', __name__)



@login_blueprint.route('/login', methods=['GET', 'POST'])
def login(): 
    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')

        

    cursor = cnx.cursor()


    #cursor.execute("SELECT email, phone, password FROM SeniorProject.Users WHERE (email = %s OR phone = %s) AND password = %s", (email_var, phone_var, password_var))

    
    cursor.close()
    cnx.close()
    return "login page"
