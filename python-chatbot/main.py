from flask import Flask, request, render_template, Response, jsonify

import chatbot

app = Flask(__name__)

message_history = []

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
    elif request.method == 'POST':
        message = request.json['message']
        message_history.append(f'User: {message}')
        ints = chatbot.predict_class(message)
        res = chatbot.get_response(ints, chatbot.intents)
        message_history.append(f'Bot: {res}')
        return jsonify(res)

   

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)

