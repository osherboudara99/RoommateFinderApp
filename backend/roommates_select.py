from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import login_backend
import signup_backend
import logged_or_signed

roommates_select_blueprint = Blueprint(
    'roommates_select', __name__)


@roommates_select_blueprint.route('/roommates_select', methods=['GET', 'POST'])
def roommates_select():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120')
    cnx = mysql.connector.connect(user='root', password='',
                                  host='127.0.0.1')

    if(logged_or_signed.didUserSignup):
        email = signup_backend.email
        password = signup_backend.password
    elif(logged_or_signed.didUserLogin):
        email = login_backend.email
        password = login_backend.password
    #email = "test@test.com"
    #password = "1234"

    roommates_select = (
        "SELECT firstName, lastName, phone, email, zipcode_location, budget, student, working_professional, job_title, guests_often, cleanliness, cleanliness, smoker, pets, zoom_friendly, profile_pic, personality_type FROM SeniorProject.Users AS u INNER JOIN SeniorProject.questionnaire as q ON u.userid = q.userid INNER JOIN SeniorProject.profile_picture as pp ON u.userid = pp.userid LEFT JOIN SeniorProject.profile as p ON u.userid = p.userid WHERE roommates_yes_no = false \
            UNION \
SELECT firstName, lastName, phone, email, zipcode_location, budget, student, working_professional, job_title, guests_often, cleanliness, cleanliness, smoker, pets, zoom_friendly, profile_pic, personality_type FROM SeniorProject.Users AS u INNER JOIN SeniorProject.questionnaire as q ON u.userid = q.userid INNER JOIN SeniorProject.profile_picture as pp ON u.userid = pp.userid RIGHT JOIN SeniorProject.profile as p ON u.userid = p.userid WHERE roommates_yes_no = false and email != %s")
    roommate_info = (email,)
    cursor = cnx.cursor(buffered=True)

    try:
        cursor.execute(roommates_select, roommate_info)
        cnx.commit()
        values = cursor.fetchall()
        
        for x in cursor.description:
            stringHeader = x[0].replace('"', "'")
            row_headers = []
            row_headers = row_headers.append(stringHeader)

        json_data = []
        for result in values:
            # print(result)
            testStr = str(result)
            #newTestStr = testStr.replace("'", "") #to replace single quote ' with nothing
            json_data.append(testStr)

        cnx.close()
        # return values
        return json.dumps(json_data)
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"