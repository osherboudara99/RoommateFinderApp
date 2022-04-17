from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import signup_backend
import logged_or_signed
import login_backend

gallery_select_blueprint = Blueprint('gallery_select', __name__)

@gallery_select_blueprint.route('/gallery_select', methods=['GET', 'POST'])
def gallery_select():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120') 
    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')


    if(logged_or_signed.didUserSignup):
        email = signup_backend.email
        password = signup_backend.password
    elif(logged_or_signed.didUserLogin):
        email = login_backend.email
        password = login_backend.password
        
    gallery_select = ("SELECT gallery_pic, gallery_id FROM SeniorProject.gallery AS g INNER JOIN SeniorProject.listings ON g.listingid = l.listingid WHERE (email = %s) AND (password = %s)")
    gallery_info = (email, password)
    cursor = cnx.cursor()

    try:
        cursor.execute(gallery_select, gallery_info)
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