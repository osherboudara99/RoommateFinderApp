from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import login_backend
import signup_backend


profile_screen_blueprint = Blueprint('profile_screen', __name__)


@profile_screen_blueprint.route('/profile_screen', methods=['GET', 'POST'])
def profile_screen_select():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120')
    cnx = mysql.connector.connect(user='root', password='',
                                  host='127.0.0.1')

    if(signup_backend.didUserSignup):
        email = signup_backend.email
        password = signup_backend.password
    else:
        email = login_backend.email
        password = login_backend.password
    #email = "test@test.com"
    #password = "1234"

    profile_screen_select = ("SELECT * FROM (SELECT email, password, firstName, lastName, zipcode_location, budget, roommates_yes_no, smoker, pets, cleanliness, zoom_friendly FROM SeniorProject.Users AS u LEFT JOIN SeniorProject.questionnaire AS q ON u.userid = q.userid  UNION SELECT email, password, firstName, lastName, zipcode_location, budget, roommates_yes_no, smoker, pets, cleanliness, zoom_friendly FROM SeniorProject.Users AS u RIGHT JOIN SeniorProject.questionnaire AS q ON u.userid = q.userid) AS a WHERE (email = %s) AND (password = %s)")
    profile_info = (email, password)
    cursor = cnx.cursor(buffered=True)

    try:
        cursor.execute(profile_screen_select, profile_info)
        cnx.commit()
        values = cursor.fetchall()
        cursor.close()
        cnx.close()
        return str(values)
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"
