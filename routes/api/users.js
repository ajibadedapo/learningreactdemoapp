const express = require('express');
const router = express.Router();
 //load user model
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/test', (req, res) => res.json({msg:req.body}));

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if(user){
            return res.status(400).json({email: 'Email already exists'});
        }else{
            const avatar = gravatar.url(req.body.email, {
               $: '200',
               r: 'pg',
               d: 'mm'
            });
            const newUser = new User({
               name: req.body.name,
               email: req.body.email,
               avatar: avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if(err) throw err;
                    newUser.password =hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));

                });
            })
        }
    })
});


router.post('/login', (req, res) => {
   const email = req.body.email;
   const password = req.body.password;

   //Find user by email
    User.findOne({email})
        .then(user => {
           //check for user
            if(!user){
                return res.status(404).json({msg: 'User not found'});
            }
            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        res.json({msg: 'Success'});
                    }else{
                        return res.status(400).json({password: 'Password incorrect'});
                    }
                });
        });
});


router.get('/current', passport.authenticate('jwt', {session: false}), () => {
    res.json({msg: 'Success'});
});

module.exports = router;