// import dependencies and initialize express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const healthRoutes = require('./routes/health-route');
const swaggerRoutes = require('./routes/swagger-route');
const firebase = require('firebase/app');

// Add the Firebase products that you want to use
require('firebase/auth');
require('firebase/firestore');

var firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY || "",
  authDomain: "angel-house-soup-kitchen.firebaseapp.com",
  databaseURL: "https://angel-house-soup-kitchen.firebaseio.com",
  projectId: "angel-house-soup-kitchen",
  storageBucket: "angel-house-soup-kitchen.appspot.com",
  messagingSenderId: "659909295973",
  appId: "1:659909295973:web:335910e329c036a3166b8c",
  measurementId: "G-85K4D4DQ21"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = express();

// enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes and api calls
app.use('/health', healthRoutes);
app.use('/swagger', swaggerRoutes);

app.post('/add', (req, res) => {
  console.log("Add endpoint")
  res.end();
});

// default path to serve up index.html (single page application)
app.all('', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
});

// start node server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
  console.log(`Swagger UI available http://localhost:${port}/swagger/api-docs`);
});

// error handler for unmatched routes or api calls
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

module.exports = app;
