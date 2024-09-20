from app.app import create_app
from flask import request, jsonify

flask_app = create_app()

if __name__ == "__main__":
    flask_app.run(debug=True, port=8080)
