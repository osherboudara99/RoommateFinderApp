from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import signup_backend
import logged_or_signed
import login_backend

own_listings_select_blueprint = Blueprint('own_listings_select', __name__)

@own_listings_select_blueprint.route('/own_listings_select', methods=['GET', 'POST'])
def own_listings_select():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120') 
    cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')


    if(logged_or_signed.didUserSignup):
        email = signup_backend.email
        password = signup_backend.password
    elif(logged_or_signed.didUserLogin):
        email = login_backend.email
        password = login_backend.password
        
    own_listing_select = ("SELECT * FROM (SELECT total_rent, square_footage, bedrooms, bathrooms, total_occupants, L.description as description, title, gallery_pic, firstName, lastName, email, phone, L.zipcode_location as location, L.userid, L.listingid, G.gallery_id, personality_type FROM SeniorProject.listings as L INNER JOIN SeniorProject.gallery as G ON L.listingid = G.listingid INNER JOIN SeniorProject.Users as U on L.userid = U.userid LEFT JOIN SeniorProject.profile as p ON p.userid = U.userid WHERE email = %s ORDER BY date_created desc) AS a \
UNION \
SELECT * FROM (SELECT total_rent, square_footage, bedrooms, bathrooms, total_occupants, L.description as description, title, gallery_pic, firstName, lastName, email, phone, L.zipcode_location as location, L.userid, L.listingid, G.gallery_id, personality_type FROM SeniorProject.listings as L INNER JOIN SeniorProject.gallery as G ON L.listingid = G.listingid INNER JOIN SeniorProject.Users as U on L.userid = U.userid RIGHT JOIN SeniorProject.profile as p ON p.userid = U.userid  \
WHERE email = %s ORDER BY date_created desc) AS b")
    listing_info = (email, email)
    cursor = cnx.cursor(buffered=True, dictionary=True)

    try:
        cursor.execute(own_listing_select, listing_info)
        cnx.commit()
        values = cursor.fetchall()
        for x in cursor.description:
            stringHeader = x[0].replace('"', "'")
            row_headers = []
            row_headers = row_headers.append(stringHeader)

        json_data = []
        for result in values:
            # print(result)
            testStr = str(result)
            #newTestStr = testStr.replace("'", "") #to replace single quote ' with nothing
            json_data.append(testStr)

        cnx.close()
        # return values
        return json.dumps(json_data)
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"