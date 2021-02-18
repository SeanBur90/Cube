var express = require('express');
var router = express.Router();
var User = require('../models/user');
const bcrypt = require('bcrypt')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/', function(req, res, next) {
  console.log('Register is working', req.body);
  let name =req.body.username;
  let pass = req.body.password;

  let errors = [];

  if(!name || !pass) {
   errors.push('Please fill in all fields')
    //alert('Please fill out all fields')
  }


  if( errors.length >= 1) {
    res.render('register', { 
        errors
     });

  } else {
    // let user = new User({name, pass});
    // user.save().then((request) => {
    //   console.log('this is the req', request)
    //   res.render('loginPage', { title: 'Login' });
    // })

    User.findOne({username : name})
      .then(user => {
        if(user) {
          errors.push('Name is already registered')
          res.render('register', { 
          errors
       });
        } else {
          const newUser = new User({
            username: name,
            password: pass,
          })

          bcrypt.genSalt(9, (err, salt) => { 
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              //set password to hash
              newUser.password = hash;
              //save user
              newUser.save()
                .then(user => {
                  res.redirect('login')
                  console.log(newUser);
                })
                .catch(err => console.log(err))
            })
          })

            
        }        
      })
  }
 

  

  // if(req.body.password != req.body.repeatPassword) {
  //   req.send('Passwords do not match');
  // } try {

  // }
  

  
})

module.exports = router;