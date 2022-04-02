from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import signup_backend
import logged_or_signed
import login_backend

profile_pic_blueprint = Blueprint('profile_pic', __name__)


@profile_pic_blueprint.route('/profile_pic', methods=['GET', 'POST'])
def profile_pic_insertion():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120')
    cnx = mysql.connector.connect(user='root', password='',
                                  host='127.0.0.1')

    if(logged_or_signed.didUserSignup):
        email = signup_backend.email
        password = signup_backend.password
    elif(logged_or_signed.didUserLogin):
        email = login_backend.email
        password = login_backend.password
    

    profile_pic = request.json['profile_pic']

    profile_pic_insertion = (
        "INSERT INTO SeniorProject.profile_picture VALUES ((SELECT userid FROM SeniorProject.Users WHERE (email = %s) AND (password = %s)), %s)")
    profile_pic_answers = (email, password, profile_pic)
    cursor = cnx.cursor()

    try:
        cursor.execute(profile_pic_insertion, profile_pic_answers)
        cnx.commit()
        cursor.close()
        cnx.close()
        return "executed"
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"
