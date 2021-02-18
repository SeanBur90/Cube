var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.send('respond with a resource');
});

//login handle





module.exports = router;
