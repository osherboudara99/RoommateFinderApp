from flask import Blueprint, app, request, json
import os
import mysql.connector
from mysql.connector import errorcode

questionaire_blueprint = Blueprint('questionaire_table_creation', __name__)\

@app.route('/questionaire', methods=['GET', 'POST'])
def questionaire_table_creation(): 
    try:
        cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')

        

        cursor = cnx.cursor()
        #still needs editing
        cursor.execute("CREATE TABLE IF NOT EXISTS SeniorProject.questionaire ( \
  `questionaire_id` int(10) unsigned NOT NULL AUTO_INCREMENT, \
  `userid` int(10) DEFAULT NULL, \
  `zipcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL, \
  `phone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL, \
  `password` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL, \
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL, \
  `birthDay` DATE DEFAULT NULL,\
  PRIMARY KEY (`questionaire_id`), \
  CONSTRAINT `qs_user_id` FOREIGN KEY (`userid`) REFERENCES `SeniorProject.Users` (`userid`)\
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci")
    
        cursor.close()
        cnx.close()
        return "success. questionaire table created"
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_BAD_TABLE_ERROR:
            return "table not created"
        else:
            return err