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






function checkTypes(type) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.type === type) {
      return next();
    } else {
      res.redirect('/home')
    }
  }
}

function checkRole(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/home')
    }
  }
}


router.get("/home/boss", (req, res, next) => {
      res.render("home/admin/boss" );
});

router.get("/home/admin1", (req, res, next) => {
  res.render("home/admin/expenses" );
});

router.get("/home/admin2", (req, res, next) => {
  res.render("home/admin/maintenance" );
});

router.get("/home/empleado", (req, res, next) => {
  res.render("home/portero" );
});

router.get("/swift-admin", (req, res, next) => {
  res.render("landing-page" );
});






/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
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
    res.render("empleados/empleados", {user});
  })
  .catch(err => console.log("error", err));
});

router.get("/empleado/delete/:id", (req, res) => {
  console.log("holaaa")
  User.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect("/empleados")
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
  Supplier.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect("/proveedores")
  });
});


// router.get("/informes", (req, res, next) => {

// })

router.get("/informes", (req, res, next) => {
  Building.find()
    .then(() => {
      // res.json(data);
      res.render("/informes", { informs });
    })
    .catch(err => console.log("error", err));
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
  let id_floors = [];

  for (let i = 0; i < req.body.floors; i++) {
    id_floors.push(new mongoose.mongo.ObjectId());
  }

  Building.create({
    address: req.body.address,
    floors: id_floors,
    startDate: req.body.startDate,
    year: req.body.year
  })
    .then(() => {
      for (let i = 0; i < id_floors.length; i++) {
        Floor.create({
          _id: id_floors[i]
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
    .then(piso => {
      // res.json(user);
      res.render("edit-piso", piso);
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
    req.body.id,
    {
      email: req.body.email,
      name: req.body.name,
      telephone: req.body.telephone,
      mobile: req.body.mobile
    },
    { new: true }
  ).then(() => {
    res.redirect("/edificios");
  });
});

router.get("/avisos", (req, res, next) => {
  Notification.find()
    .populate("building")
    .then(notification => {
      Building.find().then(buildings => {
        res.render("edificios/avisos", {
          notification: notification,
          buildings: buildings
        });
      });
    });
});

router.post("/add/notification",(req, res, next) => {
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
      res.json(notification);
    });
});

router.get("/edit/notification/:id",(req, res, next) => {
  Notification.findById(req.params.id)
    .populate("building")
    .then(notification => {
      res.json(notification);
    });
});

router.post("/edit/notification/:id",(req, res, next) => {
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

router.post("/add/vencimiento",(req, res, next) => {
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
  moment(req.body.expireDate, 'YYYY-MM-DD').toDate();
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

module.exports = router;
