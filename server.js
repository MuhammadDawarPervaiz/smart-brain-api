// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
// Files
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
// DB Connection
const db = knex({
   client: 'pg',
   connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'dawar137',
      database: 'smart-brain'
   }
});
// Init Server
const app = express();
// Midlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors());
// Routes
app.get('/', (req, res) => { res.json(db.users) });
app.post('/signin', signin.handleSignin(db, bcrypt) );
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });
// Listening to port 3000
app.listen(3000, () => { console.log('app is runing on port 3000') });