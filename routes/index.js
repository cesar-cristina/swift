const express = require("express");
const router = express.Router();
const Building = require("../models/Building");
const Floor = require("../models/Floor");
const User = require("../models/User");
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer");
const axios = require("axios");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/auth", (req, res, next) => {
  res.render("auth/prueba");
});

router.get("/edificios", (req, res, next) => {
  Building.find()
    .then(building => {
      // res.json(data);
      res.render("edificios/edificios", { building });
    })
    .catch(err => console.log("error", err));
});

router.get("/edificio/:id", (req, res, next) => {
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
      res.render("edificios/edificio", building);
    })
    .catch(err => console.log("error", err));
});

router.get("/piso/:id", (req, res, next) => {
  Floor.findById(req.params.id)
    .then(floor => {
      // res.json(floor);
    })
    .catch(err => console.log("error", err));
});

router.get("/edit/user/:id", (req, res, next) => {
  User.findById(req.params.id)
    .populate({
      path: "floors",
      populate: {
        path: "owner",
        model: "User"
      }
    })
    .then(user => {
      // res.json(user);
      res.render("edit-user", user);
    })
    .catch(err => console.log("error", err));
});

router.get("/avisos", (req, res, next) => {
  Notification.find()
    .populate("building")
    .then(notification => {
      Building.find().then(buildings => {
        // res.json(buildings)
        res.render("edificios/avisos", {
          notification: notification,
          buildings: buildings
        });
      });
      // res.json(notification)
    });
});

router.post("/add/notification", (req, res, next) => {
  Notification.create({
    building: req.body.building,
    subject: req.body.subject,
    message: req.body.message
  }).then(() => {
    const URL = "http://localhost:3000/building/" + req.body.building;

    axios.get(URL).then(emailsPayload => {
      const emails = emailsPayload.data;

      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "ironhacker2020@gmail.com",
          pass: "ironhack"
        }
      });

      transporter.sendMail({
        from: "<ironhacker2020@gmail.com>",
        to: `${emails.join(",")}`,
        subject: `${req.body.subject}`,
        text: `${req.body.message}`
      });

      res.redirect("/avisos");
    });
  });
});

router.get("/shownotification/:id", (req, res, next) => {
  Notification.findById(req.params.id)
    .populate("building")
    .then(notification => {
      // res.render('avisos', {notification: notification, hideform: true})
      res.json(notification);
    });
});

router.get("/edit/notification/:id", (req, res, next) => {
  Notification.findById(req.params.id)
    .populate("building")
    .then(notification => {
      // res.render('avisos', {notification: notification, hideform: true})
      res.json(notification);
    });
});

router.post("/edit/notification/:id", (req, res, next) => {
  Notification.findByIdAndUpdate(
    req.body.id,
    {
      subject: req.body.subject,
      message: req.body.message
    },
    { new: true }
  ).then(() => {
    res.redirect("/avisos");
  });
});

router.get("/building/:id", (req, res, next) => {
  Building.findById(req.params.id)
    .populate({
      path: "floors",
      populate: {
        path: "owner",
        model: "User"
      }
    })
    .populate({
      path: "floors",
      populate: {
        path: "tenant",
        model: "User"
      }
    })
    .then(building => {
      // let emails = building.floors.filter(floor => floor.owner);
      let emails = [];
      for (var i = 0; i < building.floors.length; i++) {
        emails.push(building.floors[i].owner.email);
        if (building.floors[i].tenant !== undefined) {
          emails.push(building.floors[i].tenant.email);
        }
      }

      res.json(emails);
      res.render("edificios/emails", building);
    });
});

module.exports = router;
