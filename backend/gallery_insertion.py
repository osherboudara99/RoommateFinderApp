from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import signup_backend
import login_backend
import logged_or_signed
import listings_insertion

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

    gallery_pic = request.json['galleryMainPic']
        
    gallery_insertion = ("INSERT INTO SeniorProject.gallery VALUES (NULL, (SELECT userid FROM SeniorProject.Users WHERE (email = %s) AND (password = %s)), (SELECT listingid FROM SeniorProject.listings as L INNER JOIN SeniorProject.Users as U ON L.userid = U.userid WHERE (email = %s) AND (password = %s) AND (title = %s)), %s)")
    gallery_info = (email,password, email, password, listings_insertion.title, gallery_pic)
    cursor = cnx.cursor()
    

    try:
        cursor.execute(gallery_insertion, gallery_info)
        cnx.commit()
        cursor.close()
        cnx.close()
        return "executed"
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"