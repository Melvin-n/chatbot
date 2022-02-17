from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from pyexpat import model
import numpy as np
import io
from PIL import Image
import tensorflow as tf
from tensorflow import keras
from keras.models import load_model
from keras.models import load_model
from keras.preprocessing.image import  img_to_array


import chatbot

app = Flask(__name__)
CORS(app)
message_history = []

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return 'Turners API'
    if request.method == 'POST':
        print(request.json)
        message = request.json['message']
        message_history.append(f'User: {message}')
        ints = chatbot.predict_class(message)
        res = chatbot.get_response(ints, chatbot.intents)
        message_history.append(f'Bot: {res}')
        return jsonify(res)

def get_model():
    global model
    model = load_model('models/car_suv_model.h5')
    print('Model loaded')

def preprocess_image(image, target_size):
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)

    return image

print('Loading Keras Model...')
get_model()


@app.route('/predict', methods=['POST'])
def predict():
    message = request.get_json(force=True)
    encoded = message['image']
    decoded = base64.b64decode(encoded)
    image = Image.open(io.BytesIO(decoded))
    processed_image = preprocess_image(image, target_size=(224, 224))

    prediction = model.predict(processed_image.tolist())
    print(f'car: {prediction[0][0]}, suv: {prediction[0][1]}' )
    response = {
        'prediction' : {
            'car': int(prediction[0][0]),
            'suv': int(prediction[0][1])
        }
    }
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
