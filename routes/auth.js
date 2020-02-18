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


router.get("/", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});


router.get("/login", (req, res, next) => {
  res.render("auth/login");
});


router.post("/login", (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  // passport.authenticate("local", {
  //   successReturnToOrRedirect: "/",
  //   failureRedirect: "/login",
  //   failureFlash: true,
  //   passReqToCallback: true
  // })

  // const checkBossOrExpensesOrMaintenance = checkRoles(["boss", "expenses", "maintenance"]);

  // function checkRoles(roles) {
  //   // eslint-disable-next-line
  //   return function(req, res, next) {
  //     if (req.isAuthenticated() && roles.includes(req.user.role)) {
  //       return next();
  //     } else {
  //       if (req.isAuthenticated()) {
  //         res.redirect("/");
  //       } else {
  //         res.redirect("/login");
  //       }
  //     }
  //   };
  // }

  if (theUsername === "" || thePassword === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({ "username": theUsername })
  .then(user => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password"
        });
      }
  })
  .catch(error => {
    next(error);
  })
 });


router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
