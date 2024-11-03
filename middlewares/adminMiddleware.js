function adminMiddleware(req, res, next) {
    if (req.session.userLogged && req.session.userLogged.isAdmin) {
        return next(); 
    }
    console.log(`El usuario no tiene permisos de administrador`);
    return res.redirect('/users/login');
}

module.exports = adminMiddleware;