from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import signup_backend
import login_backend
import logged_or_signed

listing_deletion_blueprint = Blueprint('listing_deletion', __name__)

@listing_deletion_blueprint.route('/listing_deletion', methods=['GET', 'POST'])
def listing_deletion():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120') 
    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')


    if(logged_or_signed.didUserSignup):
        email = signup_backend.email
        password = signup_backend.password
    elif(logged_or_signed.didUserLogin):
        email = login_backend.email
        password = login_backend.password

    listing_id = request.json['listing_id']
        
    listing_deletion = ("DELETE l FROM SeniorProject.listings As l INNER JOIN SeniorProject.Users AS u ON u.userid = l.userid WHERE (email = %s) AND (password = %s) AND (listingid = %s)")
    listing_info = (email, password, listing_id)

    gallery_deletion = ("DELETE FROM SeniorProject.gallery WHERE listingid = %s")
    gallery_info = (listing_id)
    cursor = cnx.cursor()
    

    try:
        cursor.execute(listing_deletion, listing_info)
        cursor.execute(gallery_deletion, gallery_info)
        cnx.commit()
        cursor.close()
        cnx.close()
        return "executed"
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"