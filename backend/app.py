from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)

CORS(app)

# DATABASE
def init_db():

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullname TEXT,
            email TEXT,
            phone TEXT,
            experience TEXT
        )
    """)

    conn.commit()
    conn.close()

init_db()

# HOME
@app.route("/")
def home():

    return jsonify({
        "message": "Backend running"
    })

# REGISTER
@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    fullname = data.get("fullname")
    email = data.get("email")
    phone = data.get("phone")
    experience = data.get("experience")

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO registrations
        (fullname, email, phone, experience)
        VALUES (?, ?, ?, ?)
    """, (fullname, email, phone, experience))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Registration successful"
    })

# VIEW ALL
@app.route("/participants")
def participants():

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM registrations")

    data = cursor.fetchall()

    conn.close()

    participants_list = []

    for participant in data:

        participants_list.append({
            "id": participant[0],
            "fullname": participant[1],
            "email": participant[2],
            "phone": participant[3],
            "experience": participant[4]
        })

    return jsonify(participants_list)

if __name__ == "__main__":
    app.run(debug=True)