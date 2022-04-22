from flask import Blueprint, app, jsonify, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import signup_backend
import logged_or_signed
import login_backend
listings_select_blueprint = Blueprint('listings_select', __name__)


@listings_select_blueprint.route('/listings_select', methods=['GET', 'POST'])
def listings_select():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120')
    cnx = mysql.connector.connect(user='root', password='',
                                  host='127.0.0.1')

    if(logged_or_signed.didUserSignup):
        email = signup_backend.email
        password = signup_backend.password
    elif(logged_or_signed.didUserLogin):
        email = login_backend.email
        password = login_backend.password

    listing_select = ("SELECT total_rent, square_footage, bedrooms, bathrooms, total_occupants, description, title, date_created, gallery_pic, firstName, lastName, email, phone, L.userid, L.listingid, G.gallery_id FROM SeniorProject.listings as L INNER JOIN SeniorProject.gallery as G ON L.listingid = G.listingid INNER JOIN SeniorProject.Users as U on L.userid = U.userid WHERE email != %s ")
    listing_info = (email,)
    cursor = cnx.cursor(buffered=True, dictionary=True)

    try:
        cursor.execute(listing_select, listing_info)
        cnx.commit()
        values = cursor.fetchall()

        # this will extract row headers
        #row_headers = [x[0] for x in cursor.description]

        for x in cursor.description:
            stringHeader = x[0].replace("'", '"')
            row_headers = []
            row_headers = row_headers.append(stringHeader)

        json_data = []
        for result in values:
            # print(result)
            testStr = str(result)
            newTestStr = testStr.replace("'", "")
            json_data.append(newTestStr)

        cnx.close()
        # return values
        return jsonify(json_data)

    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"
