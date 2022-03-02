from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import signup_backend
import logged_or_signed
import login_backend

profile_blueprint = Blueprint('profile', __name__)

@profile_blueprint.route('/profile', methods=['GET', 'POST'])
def profile_insertion():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120') 
    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')


    if(logged_or_signed.didUserSignup):
        email = signup_backend.email
        password = signup_backend.password
    elif(logged_or_signed.didUserLogin):
        email = login_backend.email
        password = login_backend.password

    personality_type = request.json['personality']
    description  = request.json['descr']
        
    profile_insertion = ("INSERT INTO SeniorProject.profile VALUES (NULL, (SELECT userid FROM SeniorProject.Users WHERE (email = %s) AND (password = %s)), (SELECT questionaire_id FROM SeniorProject.questionnaire AS q INNER JOIN SeniorProject.Users AS u ON u.userid = q.userid WHERE (email = %s) AND (password = %s)), %s, %s)")
    profile_answers = (email, password, email, password, personality_type, description)
    cursor = cnx.cursor()
    

    try:
        cursor.execute(profile_insertion, profile_answers)
        cnx.commit()
        cursor.close()
        cnx.close()
        return "executed"
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"