from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import signup_backend

profile_screen_blueprint = Blueprint('profile_screen', __name__)

@profile_screen_blueprint.route('/profile_screen', methods=['GET', 'POST'])
def profile_screen_select():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120') 
    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')


    email = signup_backend.email
    password = signup_backend.password
        
    profile_screen_select = ("SELECT firstName, lastName, zipcode_location, budget, roommate_yes_no, smoker, pets, cleanliness, zoom_friendly, personality_type, description FROM SeniorProject.Users AS u INNER JOIN SeniorProject.questionnaire AS q ON u.userid = q.userid INNER JOIN SeniorProject.profile AS p ON u.userid = p.userid WHERE (email = %s) AND (password = %s)")
    profile_info = (email, password)
    cursor = cnx.cursor()
    

    try:
        cursor.execute(profile_screen_select, profile_info)
        cnx.commit()
        cursor.close()
        cnx.close()
        return "executed"
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"