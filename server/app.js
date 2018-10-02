
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const googleAuth = require('./config/google-auth');
const localAuth = require('./config/local-auth');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8080;
var config = require('./config');

app.use(cookieParser());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.keys]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.dbUrl, { useNewUrlParser: true }, () => {
    console.log("connected to db");
});

app.listen(PORT, () => {
  console.log('app listening on port 8080');
})
