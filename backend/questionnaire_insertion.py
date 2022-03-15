from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
from pymysql import NULL
import signup_backend

questionaire_blueprint = Blueprint('questionnaire', __name__)

@questionaire_blueprint.route('/questionnaire', methods=['GET', 'POST'])
def questionaire_table_creation():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120') 
    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')


    email = signup_backend.email
    password = signup_backend.password


    zipcode_location = request.json['location']
    budget = request.json['budget']
    student = request.json['student']
    working_professional = request.json['workingProfessional']
    try:
        job_title = request.json['jobTitle']
    except:
        job_title = NULL
    guests_often = request.json['guestsOften']
    cleanliness = request.json['cleanliness']
    roommate_yes_no =  request.json['roommate']
    smoker = request.json['smoker']
    pets = request.json['pets']
    zoom_friendly  = request.json['zoom_friendly']
    zoom_others_using = request.json['zoom_others_using']




        
    questionaire_insertion = ("INSERT INTO SeniorProject.questionnaire VALUES (NULL, (SELECT userid FROM SeniorProject.Users WHERE (email = %s) AND (password = %s)), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
    questionaire_answers = (email, password, zipcode_location, budget, student, working_professional, job_title, guests_often, roommate_yes_no, cleanliness, smoker, pets, zoom_friendly, zoom_others_using)
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