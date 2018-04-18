const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

// router.get('/:lol', (req, res) => {
//     res.send('hello Mr. '+req.params.lol);
// })

router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
})

router.get('/profile', (req, res) => {
    res.render('profile');
})

router.get('/logout', (req, res) => {
//    res.send('<h1>this is the logout page how are you</h1>'+ '<style>body{font-family: consolas;margin: 0;}nav{background: #3B5998;padding: 20px;}nav ul{max-width: 960px;margin: 0 auto;padding: 0;}nav li{list-style-type: none;display: inline-block;margin: 0 10px 0 0;}nav a{color: #fff;font-size: 18px;background: rgba(255, 255, 255, 0.2);text-decoration: none;padding: 10px;display: block;}main, header{max-width: 960px;margin: 30px auto;padding: 0 10px;color: #333;}.google-btn{color: #fff;text-decoration: none;font-size: 18px;padding: 10px;background: #ff5353;}</style><nav><ul><li><a href="/logout"><button type="submit"> Logout</button></a></li><li><a href="/login"><button> Login</button></a></li><li><a href="/">Homepage</a></li><li><a href="/profile">Profile</a></li></ul></nav>' + 'lol I tried something weird');
    req.logout();
    res.redirect('/');
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback router for google to redirect to 
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/');
});

module.exports = router;