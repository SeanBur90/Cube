var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('loginPage', { title: 'Login' });
});

router.post('/', function(req, res, next)  {
  
  console.log('test')
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,

  })(req, res, next)


})

module.exports = router;