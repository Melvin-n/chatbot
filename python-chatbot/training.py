import random
import json
import pickle
import numpy as np
from tensorflow import keras

import nltk
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from keras.optimizers import gradient_descent_v2
SGD = gradient_descent_v2.SGD
lemmatizer = WordNetLemmatizer()

# open json intents file and read it a dict
intents = json.loads(open('intents.json').read())

words = []
classes = []
documents = []

# characters that will be ignored
ignore_letters = ['?', '!', '.', ',']

# appends all words into words list and appends all words with their tags as a tuple into documents
for intent in intents['intents']:
    for pattern in intent['patterns']:
        # tokenize seperates a string into seperate words
        word_list = word_tokenize(pattern)
        words.extend(word_list)
        documents.append((word_list, intent["tag"]))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])


# lemmatize individual words
words = [lemmatizer.lemmatize(word) for word in words if word not in ignore_letters]
words = sorted(set(words))

# set removes duplicates, sorted sorts values
classes = sorted(set(classes))



# save the word and documents result into a pickle file (written as binary)
pickle.dump(words, open('words.pkl', 'wb'))
pickle.dump(classes, open('classes.pkl', 'wb'))


training = []
output_empty = [0] * len(classes)

# set word values to either 0 or 1 depending on if it occurs in a pattern
# compare the words list with the word_patterns, append 0 or 1 if it does occur
for document in documents:
    bag = []
    word_patterns = document[0]
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)

    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1
    training.append([bag, output_row])

# shuffle the training data
random.shuffle(training)

# create a 2d array out of the training data
training = np.array(training)

# split the 2d array into x and y values
train_x = list(training[:, 0])
train_y = list(training[:, 1])


# neural network

# sequential model, appropriate for a basic stack of layers with one input and one output each
model = Sequential()

# dense layer: commonly used layer in which neuron is connect to all neurons in preceding layer
model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu'))

#dropout helps prevent overfitting by randomly drop neurons in each iteration
# overfitting: when ai gets very good at responding to training data but not so good at recognising new patterns
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]), activation='softmax'))
 # sgd = method for finding the lowest loss functions (?)
sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
# compiles metrics
model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])

# saves data after number of epochs(iterations)
hist = model.fit(np.array(train_x), np.array(train_y), epochs=200, batch_size=5, verbose=1)
model.save('chatbot_model.model', hist)

print('Done')