from flask import Blueprint, app, request, json
import requests
from bs4 import BeautifulSoup
import os
import mysql.connector
from mysql.connector import errorcode
import logged_or_signed

zipcode_blueprint = Blueprint('zipcode', __name__)


@zipcode_blueprint.route('/zipcode', methods=['GET'])
def zipcode_retrieval():
    
    response = requests.get("https://www.zipcodeapi.com/API#distance")

    soup = BeautifulSoup(response.content, 'html.parser')

    api_key = soup.find("input", {"class": "input-block-level"})['value']
    
    with open("src/consts/api_key.js", "w") as file1:
        file1.write('const api_key = "%s"; \n export default api_key;' % api_key)
        file1.close()
    
    return api_key