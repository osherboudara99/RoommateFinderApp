from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode
import signup_backend
import logged_or_signed
import login_backend

listings_insertion_blueprint = Blueprint('listings_insertion', __name__)


@listings_insertion_blueprint.route('/listings_insertion', methods=['GET', 'POST'])
def listings_insertion():
    ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120')
    cnx = mysql.connector.connect(user='root', password='',
                                  host='127.0.0.1')

    if(logged_or_signed.didUserSignup):
        email = signup_backend.email
        password = signup_backend.password
    elif(logged_or_signed.didUserLogin):
        email = login_backend.email
        password = login_backend.password
    

    total_rent = request.json['rent']
    square_footaqe = request.json['squareFootage']
    bedrooms = request.json['bedrooms']
    bathrooms = request.json['bathrooms']
    total_occupants = request.json['totalOccupants']
    description = request.json['descr']
    global title
    title = request.json['title']


    listing_insertion = (
        "INSERT INTO SeniorProject.listings VALUES ((SELECT userid FROM SeniorProject.Users WHERE (email = %s) AND (password = %s)), NULL,  %s, %s, %s, %s, %s, %s, %s, NOW())")
    listing_answers = (email, password, total_rent, square_footaqe, bedrooms, bathrooms, total_occupants, description, title)


    cursor = cnx.cursor()

    try:
        cursor.execute(listing_insertion, listing_answers)
        cnx.commit()
        cursor.close()
        cnx.close()
        return "executed"
    except mysql.connector.IntegrityError as err:
        cursor.close()
        cnx.close()
        print(err)
        return "not executed"
