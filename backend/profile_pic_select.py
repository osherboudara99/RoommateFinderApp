from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import signup_backend
import logged_or_signed
import login_backend

profile_pic_select_blueprint = Blueprint('profile_pic_select', __name__)

@profile_pic_select_blueprint.route('/profile_pic_select', methods=['GET', 'POST'])
def profile_pic_select():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120') 
    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')


    if(logged_or_signed.didUserSignup):
        email = signup_backend.email
        password = signup_backend.password
    elif(logged_or_signed.didUserLogin):
        email = login_backend.email
        password = login_backend.password
        
    profile_pic_select = ("SELECT profile_pic FROM SeniorProject.profile_picture AS p INNER JOIN SeniorProject.Users AS u ON u.userid = p.userid WHERE (email = %s) AND (password = %s)")
    profile_pic_info = (email, password)
    cursor = cnx.cursor(buffered=True)

    try:
        cursor.execute(profile_pic_select, profile_pic_info)
        cnx.commit()
        values = cursor.fetchall()
        cnx.close()
        return str(values)
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"