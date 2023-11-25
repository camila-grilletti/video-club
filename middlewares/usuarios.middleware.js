const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/api/auth/signin');
}

const isLogged = (req, res, next) => {
    const user = req.user?.name;
    res.locals.user = user;
    return next();
};

export default {
    isAuthenticated,
    isLogged
};