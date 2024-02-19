function auth (req, res, next) {
    console.log('middleware auth: ', req.session.user);
    if (req.session?.user?.username === 'fede' && req.session?.user?.admin) {
        return next()
    }
    return res.status(401).send('Error de authentication')
}

export default auth;