const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.users){
        // if user is not logged in
        res.redirect('/login');
    } else {
        // if user is logged in
        next();
    }
}

router.get('/', authCheck, (req, res) => {
    res.render('profile', { user: req.user });//send('you are logged in, this is your profile- ' +req.user.username);
});

module.exports = router;