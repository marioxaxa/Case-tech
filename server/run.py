from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object('config.Config')
cors = CORS(app, origins='*')

if __name__ == "__main__":
    app.run(debug=True, port=8080)
