const express = require("express");
const app = express();
const mainRoute = require("./routes/main.route.js");
const usersRoute = require('./routes/users.route.js');
const productsRoute = require('./routes/products.route.js');

// Configuración del motor de vistas
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware para archivos estáticos
app.use(express.static("./public"));

// Puerto de la aplicación
const PORT = process.env.PORT || 3700;

// Rutas
app.use("/", mainRoute);
app.use('/users', usersRoute);
app.use('/products', productsRoute);

// Inicio del servidor
app.listen(PORT, () => console.log("Server running on http://localhost:3700"));
