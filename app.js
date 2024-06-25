const express = require("express");
const app = express();
const path = require("path");

 app.use(express.static("./public"));

 app.get("/", function(req, res) {
    res.sendFile(path.resolve("views/home.html"))
})

app.get("/home.html", function(req, res) {
    res.sendFile(path.resolve("views/home.html"))
})

app.get("/login.html", function(req, res) {
    res.sendFile(path.resolve("views/login.html"))
})
app.get("/registro.html", function(req, res) {
    res.sendFile(path.resolve("views/registro.html"))
})
app.get("/productCart.html", function(req, res) {
    res.sendFile(path.resolve("views/productCart.html"))
})
app.get("/detalleProducto.html", function(req, res) {
    res.sendFile(path.resolve("views/detalleProducto.html"))
})
app.get("/recuperarPassword.html", function(req, res) {
    res.sendFile(path.resolve("views/recuperarPassword.html"))
})
app.get("/restablecerPassword.html", function(req, res) {
    res.sendFile(path.resolve("views//restablecerPassword.html"))
})
 app.listen(3700, () =>
   console.log("Server running on http://localhost:3700")
 )