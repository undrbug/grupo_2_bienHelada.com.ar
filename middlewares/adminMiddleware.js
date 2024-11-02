function adminMiddleware(req, res, next) {
    if (req.session.userLogged && req.session.userLogged.isAdmin) {
        return next(); 
    }
    console.log(`El usuario ${req.session.userLogged.email} no tiene permisos de administrador`);
    return res.redirect('/'); //
}

module.exports = adminMiddleware;