const express = require("express");
const session = require("express-session");
const passport = require('passport');
const ensureLogin = require("connect-ensure-login");
const LocalStrategy = require("passport-local").Strategy;
const router = express.Router();
const User = require("../models/User");


const checkBoss  = checkTypes('boss');
const checkExpenses = checkTypes('expenses');
const checkMaintenance  = checkTypes('maintenance');
const checkOwner = checkTypes('owner');
const checkTenant = checkTypes('tenant');
const checkEmployee = checkTypes('employee');



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


router.get('/private', ensureAuthenticated, (req, res) => {
  res.render('private', {user: req.user});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}


router.get('/private', checkTypes('boss'), (req, res) => {
  res.render('private', {user: req.user});
});

router.get('/private', checkTypes('expenses'), (req, res) => {
  res.render('private', {user: req.user});
});

router.get('/private', checkTypes('maintenance'), (req, res) => {
  res.render('private', {user: req.user});
});

router.get('/private', checkTypes('owner'), (req, res) => {
  res.render('private', {user: req.user});
});

router.get('/private', checkTypes('tenant'), (req, res) => {
  res.render('private', {user: req.user});
});

router.get('/private', checkTypes('employee'), (req, res) => {
  res.render('private', {user: req.user});
});



function checkTypes(type) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.type === type) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}


router.get("/", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});


router.get("/login", (req, res, next) => {
  res.render("auth/login");
});


router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const thePassword = req.body.password;


  if (username === "" || password === "") {
    res.render("auth/login", {
      message: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({ username })
  .then(user => {
    console.log(user)
      if (!user) {
        res.render("auth/login", {
          message: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("auth/login", {
          message: "Incorrect password"
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

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});

module.exports = router;
