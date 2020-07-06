const router = require('express').Router();
let User = require('../models/product.model');

router.route('/').get((req, res) => {
    Product.find()
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});
 router.route('/add').post((req, res) => {
     const username = req.body.username;
     const description = req.body.description;
     const duration = Number(req.body.description);
     const date = Date.parse(req.body.date);

     const newExercise = new Product({
         username,
         description,
         duration,
         date,
     });
     newExercise.save()
     .then(() => res.json('Product Added'))
     .catch(err => res.status(400).json('Error: ' + err));

 });

 module.exports = router;