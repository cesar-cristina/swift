const express = require('express');
const router = express.Router();
const Building = require('../../models/Building');
const Floor = require('../../models/Floor');
const User = require('../../models/User');

router.get('/', (req, res, next) => {
  Building.find()
    .then(building => {
      // res.json(data);
      res.render("buildings/buildings", { building });
    })
    .catch(err => console.log('error', err));
});

router.get('/:id', (req, res, next) => {
  Building.findById(req.params.id)
    // .populate("floors")
    .populate({
      path: "floors",
      populate: {
        path: "owner",
        model: "User"
      }
    })
    .then(building => {
      // res.json(building);
      res.render("buildings/building", building);
    })
    .catch(err => console.log("error", err));
});

router.get('/floor/:id', (req, res, next) => {
  Floor.findById(req.params.id)
    .then(floor => {
      // res.json(floor);
    })
    .catch(err => console.log('error', err));
});

module.exports = router;
