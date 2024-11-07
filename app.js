const express = require("express");
const mainRoute = require("./routes/main.route.js");
const usersRoute = require('./routes/users.route.js');
const productsRoute = require('./routes/products.route.js');
const contactRoute = require('./routes/contact.route.js');
const methodOverride = require('method-override');
const session = require('express-session');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware.js');
const cookieParser = require('cookie-parser');

const app = express();

// Configuración del motor de vistas
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware para archivos estáticos
app.use(express.static("./public"));

// Middleware para capturar datos de formularios
app.use(methodOverride('_method'));

// Puerto de la aplicación
const PORT = process.env.PORT || 3700;

// Middleware para analizar el cuerpo de la solicitud
//Sin esto, en el req.body no se puede acceder a los datos enviados por el formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware para manejar sesiones
app.use(session({ 
    secret: 'algosere', 
    resave: false, 
    saveUninitialized: false
}));

app.use(cookieParser());
app.use(userLoggedMiddleware);

// Rutas
app.use("/", mainRoute);
app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/contact', contactRoute);
// app.use('/cart', cartRoute);

app.use((req, res, next) => {
    res.status(404).render('errors/404.ejs', {
        title: '404 - Page not Found'
    });
});

// Inicio del servidor
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));