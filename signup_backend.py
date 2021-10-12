from flask import Blueprint, app
import os
import mysql.connector
from mysql.connector import errorcode

signup_blueprint = Blueprint('signup', __name__)



@signup_blueprint.route('/signup', methods=['GET', 'POST'])
def signup(): 
    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')

        

    cursor = cnx.cursor()


    #cursor.execute("INSERT INTO SeniorProject.Users VALUES (NULL,'blahj', 'blah', 'blah', 'blahj', 'blah', 'blah')")

    
    cursor.close()
    cnx.close()
    return "signup page"