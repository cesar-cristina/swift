const express = require("express");
const session = require("express-session");
const passport = require('passport');
const ensureLogin = require("connect-ensure-login");
const LocalStrategy = require("passport-local").Strategy;
const router = express.Router();
const User = require("../models/User");




// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    (req, username, password, next) => {
      User.findOne(
        {
          username
        },
        (err,user) => {
          if(err) {
            return next(err);
          }
          if(!user) {
            return next(null,false, {
              message: "Incorrect username"
            });
          }
          if(!bcrypt.compareSync(password, user.password)){
            return next(null, false, {
              message: "Incorrect password"
            });
          }
          return next(null, user);
        }

      );
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("serialize");
  console.log(`storing ${user._id} in the session`);
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  console.log("deserialize");
  console.log(`Attaching ${id} to req.user`);
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});


// router.get('/private', ensureAuthenticated, (req, res) => {
//   res.render('private', {user: req.user});
// });

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect('/login')
//   }
// }


router.get("/singup", (req, res, next) => {
  res.render("auth/singup");
});

router.post("/singup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/singup", { message: "Indicate username and password" });
    return;
  }
  const plainPassword1 = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (["boss", "expenses", "maintenance","employee","owner","tenant"].indexOf(req.body.type) === -1) {
    res.render("auth/singup", { message: "specified role was not valid"});
    return;
  }


  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/singup", { message: "The username already exists" });
      return;
    }
    else {
      Users.create({ name: req.body.username, password: hash, type: req.body.type })
        .then((userCreated) => {
          res.json({ created: true, userCreated });
        })
        .catch(() => {
          res.render("auth/singup",{ created: false });
        });
    }


    // const newUser = new User({
    //   username,
    //   password: hashPass
    // });

    // newUser.save()
    // .then(() => {
    //   res.redirect("/");
    // })
    // .catch(err => {
    //   res.render(, { message: "Something went wrong" });
    // })
  });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});


// router.post("/login", passport.authenticate("local", {
//   successReturnToOrRedirect: "/",
//   failureRedirect: "/login",
//   failureFlash: true,
//   passReqToCallback: true
// }));

//   const username = req.body.username;
//   const password = req.body.password;

//   if (username === "" || password === "") {
//     res.render("auth/login", {
//       message: "Please enter both, username and password to sign up."
//     });
//     return;
//   }

//   User.findOne({ username })
//   .then(user => {
//     console.log(user)
//       if (!user) {
//         res.render("auth/login", {
//           message: "The username doesn't exist."
//         });
//         return;
//       }
//       if (bcrypt.compareSync(password, user.password)) {
//         // Save the login in the session!
//         req.session.currentUser = user;
//         res.redirect("/home");
//       } else {
//         res.render("auth/login", {
//           message: "Incorrect password"
//         });
//       }
//   })
//   .catch(error => {
//     next(error);
//   })





router.get("/home", (req, res) => {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser).then((allUserData) => {
      allUserData.type = `${allUserData.type.toLowerCase()}`;

      let viewData = {
        user: allUserData
      };

      if (allUserData.type === "boss") {
        viewData.isBoss = true;
      }

      if (allUserData.type === "expenses") {
        viewData.isExpenses = true;
      }

      if (allUserData.type === "maintenance") {
        viewData.isMaintenance = true;
      }

      if (allUserData.type === "employee") {
        viewData.isEmployee = true;
      }

      if (allUserData.type === "owner") {
        viewData.isOwner = true;
      }

      if (allUserData.type === "tenant") {
        viewData.isTenant = true;
      }

      res.render("home", viewData);
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});

router.get("/remember", (req, res) => {
  res.render("remember");
});

router.post("/remember-password", (req, res) => {
  console.log(`find in mongo the user with email ${req.body.email}`);
});



module.exports = router;
