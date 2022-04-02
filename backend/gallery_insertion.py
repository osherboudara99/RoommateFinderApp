from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import signup_backend
import login_backend
import logged_or_signed

gallery_insertion_blueprint = Blueprint('gallery_insertion', __name__)

@gallery_insertion_blueprint.route('/gallery_insertion', methods=['GET', 'POST'])
def gallery_insertion():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120') 
    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')


    if(logged_or_signed.didUserSignup):
        email = signup_backend.email
        password = signup_backend.password
    elif(logged_or_signed.didUserLogin):
        email = login_backend.email
        password = login_backend.password

    gallery_pic = request.json['gallery_pic']
        
    gallery_pic_insertion = ("INSERT INTO SeniorProject.gallery VALUES (NULL, (SELECT userid FROM SeniorProject.Users WHERE (email = %s) AND (password = %s)), %s)")
    gallery_pic_info = (email, password, gallery_pic)
    cursor = cnx.cursor()
    

    try:
        cursor.execute(gallery_pic_insertion, gallery_pic_info)
        cnx.commit()
        cursor.close()
        cnx.close()
        return "executed"
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"