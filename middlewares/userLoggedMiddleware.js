const dataUsers = require("../services/dataUsers.js");

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  //recuperamos el email del usuario desde la cookie, si es que hay una
  let userEmail = req.cookies.userEmail;
  
  //buscamos al usuario por el email
  let user = dataUsers.findByEmail(userEmail);

  //Si encontramos al usuario, lo guardamos en la sesión
  if (user) {
    delete user.password;
    req.session.userLogged = user;
  }

  //Si hay un usuario logueado, lo pasamos a las vistas
  if (req.session.userLogged) {
    res.locals.isLogged = true;
    //Pasamos a las vistas la información del usuario logueado
    res.locals.userLogged = req.session.userLogged;
  }

  next();
}

module.exports = userLoggedMiddleware;
