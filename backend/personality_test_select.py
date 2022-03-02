from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import signup_backend
import logged_or_signed
import login_backend

personality_test_select_blueprint = Blueprint('personality_test_select', __name__)

@personality_test_select_blueprint.route('/profile_pic_select', methods=['GET', 'POST'])
def personality_select():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120') 
    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')


    if(logged_or_signed.didUserSignup):
        email = signup_backend.email
        password = signup_backend.password
    elif(logged_or_signed.didUserLogin):
        email = login_backend.email
        password = login_backend.password
        
    personality_select = ("SELECT personality_type, description FROM SeniorProject.profile AS p INNER JOIN SeniorProject.Users AS u ON u.userid = p.userid WHERE (email = %s) AND (password = %s)")
    personality_info = (email, password)
    cursor = cnx.cursor()

    try:
        cursor.execute(personality_select, personality_info)
        cnx.commit()
        cursor.close()
        values = cursor.fetchall()
        cnx.close()
        return str(values)
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"