from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
from login_backend import email, password

questionaire_blueprint = Blueprint('login_backend', __name__)

@app.route('/questionaire', methods=['GET', 'POST'])
def questionaire_table_creation(): 
    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')
    userid = request.json['userid']
    zipcode_location = request.json['location']
    budget = request.json['budget']
    roommate_yes_no =  request.json['roommate_yes_no']
    cleanliness = request.json['cleanliness']
    smoker = request.json['smoker']
    pets = request.json['pets']
    zoom_friendly  = request.json['zoom_friendly']
    zoom_others_using = request.json['zoom_others_using']


        
    questionaire_insertion = ("INSERT INTO SeniorProject.questionnaire VALUES (NULL, SELECT userid FROM SeniorProject.Users WHERE (email = %s) AND password = %s, %s, %s, %s, %s, %s, %s, %s, %s)")
    questionaire_answers = (email, password, zipcode_location, budget, roommate_yes_no, cleanliness, smoker, pets, zoom_friendly, zoom_others_using)
    cursor = cnx.cursor()
    

    try:
        cursor.execute(questionaire_insertion, questionaire_answers)
        cnx.commit()
        cursor.close()
        cnx.close()
        return "executed"
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"