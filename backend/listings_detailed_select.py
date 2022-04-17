from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import signup_backend
import logged_or_signed
import login_backend

listings_detailed_select_blueprint = Blueprint('listings_detailed_select', __name__)

@listings_detailed_select_blueprint.route('/listings_detailed_select', methods=['GET', 'POST'])
def listings_detailed_select():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120') 
    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')


    if(logged_or_signed.didUserSignup):
        email = signup_backend.email
        password = signup_backend.password
    elif(logged_or_signed.didUserLogin):
        email = login_backend.email
        password = login_backend.password


    listing_id_pressed = request.json["listingid"]
        
    listing_select = ("SELECT total_rent, square_footage, bedrooms, bathrooms, total_occupants, description, title, date_created, gallery_pic, firstName, lastName, email, phone, L.userid, L.listingid FROM listings as L INNER JOIN gallery as G ON L.listingid = G.listingid INNER JOIN Users as U on L.userid = U.userid WHERE (L.listingid = %s) ")
    cursor = cnx.cursor(buffered=True)

    try:
        cursor.execute(listing_select, listing_id_pressed)
        cnx.commit()
        values = cursor.fetchall()
        cnx.close()
        return str(values)
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"