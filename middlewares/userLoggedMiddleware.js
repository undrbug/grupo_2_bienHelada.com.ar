// const dataUsers = require("../services/dataUsers.js");
const services_db = require("../services/services_db.js");

async function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  //recuperamos el email del usuario desde la cookie, si es que hay una
  let userEmail = req.cookies.userEmail;
  
  try {
    //buscamos al usuario por el email
    let user = await services_db.getByEmail(userEmail);
    // let user = dataUsers.findByEmail(userEmail);
    console.log(user);
    //Si encontramos al usuario, lo guardamos en la sesión
    if (user) {
      delete user.password;
      req.session.userLogged = user;
    }
    
  } catch (error) {
    console.log("Error al buscar el usuario", error.message);
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
