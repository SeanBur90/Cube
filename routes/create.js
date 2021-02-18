var express = require('express');
var router = express.Router();
var Cubes = require('../models/cube');
const Accessory = require('../models/accessory');


/* GET home page. */
router.get('/', function(req, res, next) {
  Cubes.find().then((cube) => {
    res.render('create', { title: 'Create Cube', cubes: cube });
  })
  .catch((err) => res.render(err));
    
});

router.get('/accessory', function(req, res, next) {
  res.render('createAccessory', { title: 'Create Accessory'})
})

router.post('/', function(req, res, next) {
    console.log("incoming form submission ", req.body)

    const newCube = new Cubes({
      name: req.body.name,
      description: req.body.description,
      image_url: req.body.imageUrl,
      level: req.body.difficultyLevel,
      accessories: [],
    });
    
    newCube.save()
    .then((result) => {
      console.log(result)
      res.redirect('/')
      })
      .catch((err) => {
        res.send(err)
      })
    })

    router.post('/accessory', function(req, res, next) {
      console.log("the accessory form is ", req.body)
      const newAcc = new Accessory({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl
      });
      newAcc.save()
        .then((result) => { 
          
          console.log('the new accessory is ', result)
          res.redirect('/');

        })

    })




module.exports = router;
