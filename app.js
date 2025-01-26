const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const productosRoutes = require('./routes/productos'); // Cambié cursosRoutes por productosRoutes
const authRoutes = require('./routes/authRoutes');
const { appConfig } = require('./config');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir archivos estáticos (imágenes) desde la carpeta storage/imgs
app.use('/public', express.static(`${__dirname}/storage/imgs`));




// Configuración de sesión
app.use(
    session({
        secret: `${appConfig.secret}`,
        resave: false, 
        cookie: { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }, // Cookie expira en 7 días
        saveUninitialized: false, 
    })
);

// Rutas
app.use('/v1', productosRoutes); 
app.use('/auth', authRoutes);

module.exports = app;
