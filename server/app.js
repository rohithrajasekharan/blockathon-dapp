const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const localAuth = require('./config/local-auth');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8080;
const config = require('./config.js');
app.use(cors({credentials:true, origin: "http://localhost:3000"}));
app.use(cookieParser());
app.use(cookieSession({
maxAge: 24 * 60 * 60 * 1000,
keys: ['eagggggawgedsge']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));
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
