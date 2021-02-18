var express = require('express');
var router = express.Router();
var Cubes = require('../models/cube')
var cube = 

/* GET home page. */
router.get('/', function(req, res, next) {
  Cubes.find().then((cube) => {
    console.log('Cubes are: ', cube)
    res.render('index', { title: 'Cubicle', cube: cube });
  })
  .catch((err) => res.render(err));
    
});

module.exports = router;
