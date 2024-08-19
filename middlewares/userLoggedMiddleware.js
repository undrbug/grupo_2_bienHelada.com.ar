function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    if (req.session.userLogged) {
        res.locals.isLogged = true;
        //Pasamos a las vistas la información del usuario logueado
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = userLoggedMiddleware;