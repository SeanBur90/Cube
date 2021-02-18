const LocatlStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = function(passport) {
    passport.use(
        new LocatlStrategy({ username: 'username'}, (password) => {
            //match user
            User.findOne({ username: username})
                .then( user => {
                    if(!user) {
                        return done(null, false, {message: 'That username is not registered'});

                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {message: 'Password incorrect'})
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}