from flask import Flask, render_template, request
import os
import mysql.connector
from mysql.connector import errorcode

app = Flask(__name__)





@app.route('/', methods=['GET', 'POST'])
def db_conn(): 
    try:
        cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1')
        cnx.close()
        return "success"
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            return "Something is wrong with your user name or password"
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            return "Database does not exist"
        else:
            return err


if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'), 
            port=int(os.getenv('PORT', 4444)))