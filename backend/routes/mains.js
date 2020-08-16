const router = require('express').Router();
let Main = require('../models/main.model');

router.route('/').get((req, res) => {
  Main.find()
    .then(mains => res.json(mains))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newMain = new Main({
    username,
    description,
    duration,
    date,
  });

  newMain.save()
  .then(() => res.json('Main added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Main.findById(req.params.id)
    .then(main => res.json(main))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Main.findByIdAndDelete(req.params.id)
    .then(() => res.json('Main deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Main.findById(req.params.id)
    .then(main => {
      main.username = req.body.username;
      main.description = req.body.description;
      main.duration = Number(req.body.duration);
      main.date = Date.parse(req.body.date);

      main.save()
        .then(() => res.json('Main updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;