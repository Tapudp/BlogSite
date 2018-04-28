const router = require('express').Router();
const User = require('../models/user-model');
const passport = require('passport');
const passportConfig = require('../config/passport-setup');
const Post = require('../models/post-model');

const authCheck = (req, res, next) => {
    if(!req.user){
        // if user is not logged in
        res.redirect('/login');
    } else {
        // if user is logged in
        next();
    }
}

router.get('/', authCheck, (req, res) => {
    //res.send('hi I\'m divyesh');
    Post.find({}, (err, posts) => {
        res.render('profile', {user: req.user, post: posts});
    })
    //res.render('profile', { user: req.user });
});

router.post('/',  (req, res) => {
    var postData = new Post(req.title, req.content);
    postData.save().then(result => {
        console.log(result);
        console.log(req.body);
        res.redirect('/');
    }).catch(err => {
        res.status(404).send('Unable to save data to db');
    });
    //res.send('you posted the the new blog with title ' + req.title + 'and content' +req.content) ;

});

module.exports = router;