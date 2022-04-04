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
        "SELECT * FROM (SELECT personality_type, description, email, password FROM SeniorProject.profile AS p INNER JOIN SeniorProject.Users AS u ON u.userid = p.userid) as a WHERE (email = %s) AND (password = %s)")
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