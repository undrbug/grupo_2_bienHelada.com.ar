const express = require("express");
const app = express();
const path = require("path");

 app.use(express.static("./public"));

 const PORT = process.env.PORT || 3700;

 app.get("/", function(req, res) {
    res.sendFile(path.resolve("views/home.html"))
})

app.get("/login", function(req, res) {
    res.sendFile(path.resolve("views/login.html"))
})
app.get("/registro", function(req, res) {
    res.sendFile(path.resolve("views/registro.html"))
})
app.get("/productcart", function(req, res) {
    res.sendFile(path.resolve("views/productCart.html"))
})
app.get("/detalleproducto", function(req, res) {
    res.sendFile(path.resolve("views/detalleProducto.html"))
})
app.get("/recuperarPassword.html", function(req, res) {
    res.sendFile(path.resolve("views/recuperarPassword.html"))
})
app.get("/restablecerPassword.html", function(req, res) {
    res.sendFile(path.resolve("views//restablecerPassword.html"))
})
 app.listen(PORT, () =>
   console.log("Server running on http://localhost:3700")
 )