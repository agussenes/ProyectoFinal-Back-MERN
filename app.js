const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const contactoRoutes = require('./routes/contactoRoutes'); 

const productosRoutes = require('./routes/productos'); 
const authRoutes = require('./routes/authRoutes');
const { appConfig } = require('./config');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.use('/public', express.static(`${__dirname}/storage/imgs`));





app.use(
    session({
        secret: `${appConfig.secret}`,
        resave: false, 
        cookie: { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
        saveUninitialized: false, 
    })
);


app.use('/v1', productosRoutes); 
app.use('/auth', authRoutes);

app.use('/api', contactoRoutes); 

module.exports = app;
