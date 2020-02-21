const express = require("express");
const router = express.Router();
const Building = require("../models/Building");
const Floor = require("../models/Floor");
const User = require("../models/User");
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer");
const axios = require("axios");
const Supplier = require("../models/Supplier");
const Vencimiento = require("../models/Vencimiento");
const moment = require("moment");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const saltRounds = 10;
const session = require("express-session");

const passport = require("passport");
require("../passport/index.js");

/* GET home page */
router.get("/home", (req, res, next) => {
  // res.json(req.user)
  let user = req.user;

  if (user.type === "owner") {
    User.findById(user._id)
      .populate({
        path: "floor",
        populate: {
          path: "owner",
          model: "User"
        }
      })
      .populate({
        path: "floor",
        populate: {
          path: "_id"
        }
      })
      .populate({
        path: "floor",
        populate: {
          path: "building"
        }
      })
      .populate({
        path: "floor",
        populate: {
          path: "tenant"
        }
      })
      .then(user => {
        // res.json(user);
        res.render("owner/home", { user });
      });
  }

  if (user.role === "admin") {
    res.render("index", { user });
  }
});

router.get("/", (req, res, next) => {
  res.render("auth/login");
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

// router.get("/home", (req, res, next) => {
//   console.log(req.user);
//   res.render("index");
// });

router.get("/auth", (req, res, next) => {
  res.render("auth/prueba");
});

router.get("/empleados", (req, res, next) => {
  User.find({ role: "admin" })
    .then(user => {
      res.render("empleados/empleados", { user });
    })
    .catch(err => console.log("error", err));
});

router.get("/empleado/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      // res.json(building);
      res.render("empleados/empleado", { user });
    })
    .catch(err => console.log("error", err));
});

router.post("/empleado/add", (req, res, next) => {
  User.create()
    .then(user => {
      res.render("empleados/empleados", { user });
    })
    .catch(err => console.log("error", err));
});

router.get("/empleado/delete/:id", (req, res) => {
  console.log("holaaa");
  User.findByIdAndDelete(req.params.id).then(() => {
    res.redirect("/empleados");
  });
});

router.get("/proveedores", (req, res, next) => {
  Supplier.find()
    .then(supplier => {
      res.render("proveedores/proveedores", { supplier });
    })
    .catch(err => console.log("error", err));
});

router.post("/add/proveedor", (req, res, next) => {
  Supplier.create({
    name: req.body.name,
    address: req.body.address,
    service: req.body.service,
    telephone: req.body.telephone,
    mobile: req.body.mobile
  }).then(() => {
    res.redirect("/proveedores");
  });
});

router.get("/proveedor/:id", (req, res, next) => {
  Supplier.findById(req.params.id)
    .then(supplier => {
      res.render("proveedores/proveedor", { supplier });
    })
    .catch(err => console.log("error", err));
});

router.get("/edit/proveedor/:id", (req, res, next) => {
  Supplier.findById(req.params.id)
    .then(supplier => {
      res.render("proveedores/edit-proveedor", { supplier });
    })
    .catch(err => console.log("error", err));
});

router.post("/edit/proveedor/:id/", (req, res, next) => {
  Supplier.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
      address: req.body.address,
      telephone: req.body.telephone,
      mobile: req.body.mobile,
      service: req.body.service
    },
    { new: true }
  ).then(() => {
    res.redirect("/proveedores");
  });
});

router.get("/proveedor/delete/:id", (req, res, next) => {
  Supplier.findByIdAndDelete(req.params.id).then(() => {
    res.redirect("/proveedores");
  });
});

router.get("/edificios", (req, res, next) => {
  Building.find()
    .then(building => {
      // res.json(data);
      res.render("edificios/edificios", { building });
    })
    .catch(err => console.log("error", err));
});

router.post("/add/edificio", (req, res, next) => {
  let id_building = new mongoose.mongo.ObjectId();

  let id_floors = [];

  for (let i = 0; i < req.body.floors; i++) {
    id_floors.push(new mongoose.mongo.ObjectId());
  }

  Building.create({
    _id: id_building,
    address: req.body.address,
    floors: id_floors,
    startDate: req.body.startDate,
    year: req.body.year
  })
    .then(() => {
      for (let i = 0; i < id_floors.length; i++) {
        Floor.create({
          _id: id_floors[i],
          building: id_building
        });
      }
    })
    .then(() => {
      res.redirect("/edificios");
    });
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

router.get("/edit/piso/:id", (req, res, next) => {
  Floor.findById(req.params.id)
    .populate("building")
    .then(piso => {
      // res.json(piso);
      res.render("edit-piso", piso);
    })
    .catch(err => console.log("error", err));
});

router.post("/add/owner", (req, res, next) => {
  let id_owner = new mongoose.mongo.ObjectId();

  User.create({
    _id: id_owner,
    username: req.body.username,
    password: bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(saltRounds)
    ),
    name: req.body.name,
    email: req.body.email,
    floor: req.body.id_floor,
    telephone: req.body.telephone,
    mobile: req.body.mobile,
    imgPath: "/images/user.jpg",
    role: "user",
    type: "owner"
  })
    .then(() => {
      return Floor.findByIdAndUpdate(
        req.body.id_floor,
        {
          owner: id_owner,
          name: req.body.namefloor
        },
        { new: true }
      );
    })
    .then(() => {
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: `${process.env.MAILFROM}`,
          pass: `${process.env.PSWMAIL}`
        }
      });

      transporter.sendMail({
        from: "<ironhacker2020@gmail.com>",
        to: `${req.body.email}, cesarvalleiva@gmail.com`,
        subject: `Swift te da la bienvenida!`,
        text: `Hola ${req.body.name}, tu usuario ya está creado para entrar en la web: https://swiftadmin.herokuapp.com/login`
      });

      res.redirect(`/edificio/${req.body.id_building}`);
    })
    .catch(err => console.log("error", err));
});

router.get("/edit/user/:id", (req, res, next) => {
  User.findById(req.params.id)
    .populate({
      path: "floor",
      populate: {
        path: "owner",
        model: "User"
      }
    })
    .populate({
      path: "floor",
      populate: {
        path: "_id"
      }
    })
    .populate({
      path: "floor",
      populate: {
        path: "building"
      }
    })
    .then(user => {
      // res.json(user);
      res.render("edit-user", user);
    })
    .catch(err => console.log("error", err));
});

router.post("/edit/user/:id/", (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      telephone: req.body.telephone,
      mobile: req.body.mobile
    },
    { new: true }
  ).then(() => {
    res.redirect(`/edificio/${req.body.id_building}`);
  });
});

router.get("/avisos", (req, res, next) => {
  let user = req.user;

  if (user.type === "owner") {
    User.findById(user._id).then(user => {
      Notification.find({ building: user.building }).then(notifications => {
        // res.json(notifications);
        res.render("owner/avisos", {
          notifications: notifications,
          user: user
        });
      });
    });
  }

  if (user.role === "admin") {
    Notification.find()
      .populate("building")
      .then(notifications => {
        // res.json(notifications)
        Building.find().then(buildings => {
          res.render("edificios/avisos", {
            user: user,
            notification: notifications,
            buildings: buildings
          });
        });
      });
  }
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
          user: `${process.env.MAILFROM}`,
          pass: `${process.env.PSWMAIL}`
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
      res.json(notification);
    });
});

router.get("/edit/notification/:id", (req, res, next) => {
  Notification.findById(req.params.id)
    .populate("building")
    .then(notification => {
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

router.get("/vencimientos", (req, res, next) => {
  Vencimiento.find()
    .populate("building")
    .populate("supplier")
    .then(vencimientos => {
      // res.json(vencimientos);

      vencimientos = vencimientos.map(element => {
        element.formatedDate = moment(element.expireDate).format("DD-MM-YYYY");
        return element;
      });

      Building.find()
        .then(buildings => {
          return buildings;
        })
        .then(buildings => {
          Supplier.find().then(supplier => {
            res.render("edificios/vencimientos", {
              vencimientos: vencimientos,
              buildings: buildings,
              supplier: supplier
            });
          });
        });
    });
});

router.post("/add/vencimiento", (req, res, next) => {
  Vencimiento.create({
    building: req.body.building,
    supplier: req.body.supplier,
    amount: req.body.amount,
    expireDate: req.body.expireDate
  }).then(() => {
    res.redirect("/vencimientos");
  });
});

router.get("/edit/vencimiento/:id", (req, res, next) => {
  Vencimiento.findById(req.params.id)
    .populate("building")
    .populate("supplier")
    .then(vencimiento => {
      vencimiento.formatDate = moment(vencimiento.expireDate).format(
        "YYYY-MM-DD"
      );
      res.render("edit-vencimiento", { vencimiento });
    });
});

router.post("/edit/vencimiento/:id", (req, res, next) => {
  moment(req.body.expireDate, "YYYY-MM-DD").toDate();
  Vencimiento.findByIdAndUpdate(
    req.params.id,
    {
      amount: req.body.amount,
      expireDate: req.body.expireDate
    },
    { new: true }
  ).then(vencimiento => {
    console.log(req.body.amount);
    res.redirect("/vencimientos");
  });
});

router.get("/miedificio", (req, res, next) => {
  // res.json(req.user)
  let user = req.user;

  if (user.type === "owner") {
    User.findById(user._id)
      .populate({
        path: "floor",
        populate: {
          path: "owner"
        }
      })
      .then(user => {
        Building.findById(user.floor.building._id)
          .populate("floors")
          .populate({
            path: "floors",
            populate: {
              path: "owner"
            }
          })
          .then(building => {
            // res.json(building);
            // res.json(user.floor.building._id);
            res.render("owner/miedificio", { user: user, building: building });
          });
      });
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    // cannot access session here
    res.redirect("/login");
  });
});

router.post("/add/place/:id", (req, res, next) => {
  Building.findByIdAndUpdate(req.params.id, {
    $push: { placesOfInterest: "cesar" }
  }).then(building => {
   
    res.redirect("/home");
  });
});

module.exports = router;
