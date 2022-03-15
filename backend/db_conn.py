from flask import Flask, render_template, request
import os
import mysql.connector
from mysql.connector import errorcode
from login_backend import login_blueprint
from signup_backend import signup_blueprint
from questionnaire_insertion import questionaire_blueprint
from profile_insertion import profile_blueprint
from profile_screen_select import profile_screen_blueprint
from profile_pic_insertion import profile_pic_blueprint
from profile_pic_select import profile_pic_select_blueprint
from personality_test_select import personality_test_select_blueprint
from flask_cors import CORS, cross_origin




app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'


@app.route('/', methods=['GET', 'POST'])
def connect(): 
    try:
        ##cnx = mysql.connector.connect(user='seniorproject', password='', host='38.34.124.120')
        cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')

        

        cursor = cnx.cursor()

        cursor.execute("CREATE DATABASE IF NOT EXISTS SeniorProject")

        cursor.execute("CREATE TABLE IF NOT EXISTS SeniorProject.Users ( \
  `userid` int(10) NOT NULL AUTO_INCREMENT, \
  `firstName` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci, \
  `lastName` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL, \
  `phone` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL, \
  `password` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL, \
  `email` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL, \
  `birthDay` DATE DEFAULT NULL,\
  PRIMARY KEY (`userid`), \
  UNIQUE KEY `phone_UNIQUE` (`phone`), \
  UNIQUE KEY `email_UNIQUE` (`email`), \
  CHECK (`phone` NOT LIKE '%[^0-9]%' AND LENGTH(`phone`) = 10) \
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci")


        cursor.execute("CREATE TABLE IF NOT EXISTS SeniorProject.questionnaire ( \
    `questionaire_id` int(10) unsigned NOT NULL AUTO_INCREMENT, \
    `userid` int(10) DEFAULT NULL, \
    `zipcode_location` int(5) unsigned NOT NULL, \
    `budget` int NOT NULL, \
    `student` BOOLEAN NOT NULL, \
    `working_professional` BOOLEAN NOT NULL, \
    `job_title` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL, \
    `guests_often` BOOLEAN NOT NULL, \
    `roommates_yes_no` BOOLEAN NOT NULL, \
    `cleanliness` int(2) unsigned NOT NULL,  \
    `smoker` BOOLEAN NOT NULL, \
    `pets` BOOLEAN NOT NULL, \
    `zoom_friendly` BOOLEAN NOT NULL, \
    `zoom_others_using` BOOLEAN NOT NULL,  \
    PRIMARY KEY (`questionaire_id`), \
    UNIQUE KEY `user_UNIQUE` (`userid`), \
    CONSTRAINT `qs_user_id_1` FOREIGN KEY (`userid`) REFERENCES `Users` (`userid`) \
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci")


        cursor.execute("CREATE TABLE IF NOT EXISTS SeniorProject.profile ( \
    `profile_id` int(10) unsigned NOT NULL AUTO_INCREMENT, \
    `userid` int(10) DEFAULT NULL, \
    `questionaire_id` int(10) DEFAULT NULL, \
    `personality_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL, \
    `description` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL, \
    PRIMARY KEY (`profile_id`), \
    UNIQUE KEY `user_UNIQUE` (`userid`), \
    UNIQUE KEY `questionaire_UNIQUE` (`questionaire_id`), \
    CONSTRAINT `qs_user_id_2` FOREIGN KEY (`userid`) REFERENCES `Users` (`userid`) \
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci")


        cursor.execute("CREATE TABLE IF NOT EXISTS SeniorProject.profile_picture ( \
    `userid` int(10) DEFAULT NULL, \
    `questionaire_id` int(10) DEFAULT NULL, \
    `profile_pic` LONGBLOB DEFAULT NULL, \
    UNIQUE KEY `user_UNIQUE` (`userid`), \
    UNIQUE KEY `questionaire_UNIQUE` (`questionaire_id`), \
    CONSTRAINT `qs_user_id_3` FOREIGN KEY (`userid`) REFERENCES `Users` (`userid`) \
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci")
    
        cursor.close()
        cnx.close()
        return "success"
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            return "Something is wrong with your user name or password"
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            return "Database does not exist"
        else:
            return err

app.register_blueprint(login_blueprint)

app.register_blueprint(signup_blueprint)

app.register_blueprint(questionaire_blueprint)

app.register_blueprint(profile_blueprint)

app.register_blueprint(profile_screen_blueprint)

app.register_blueprint(profile_pic_blueprint)

app.register_blueprint(profile_pic_select_blueprint)

app.register_blueprint(personality_test_select_blueprint)

if __name__ == '__main__':
    app.run(host='127.0.0.1', 
            port=5000, debug=True)
    
    
    