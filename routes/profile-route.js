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




router.post('/',  (req, res) => {
    var postData = new Post(req.body);
    if(postData.length){

        postData.save().then(result => {
            console.log(result);
            console.log(req.body);
            res.redirect('/');
        }).catch(err => {
            res.status(404).send('Unable to save data to db');
        });
    } else {
        res.redirect('/profile');
    }
    //res.send('you posted the the new blog with title ' + req.title + 'and content' +req.content) ;
    
});

router.get('/', authCheck, (req, res) => {
    //res.send('hi I\'m divyesh');
    Post.find({}, (err, posts) => {
        if(err) { console.log(err); }
        else if (posts.length){
            console.log('Found: ', posts);
            res.render('profile', {user: req.user, posts: posts});
        }
        else {
            console.log('No document(s) found with defined "find" criteria!');
        }
    });
    

    //res.render('profile', { user: req.user });
});

module.exports = router;
