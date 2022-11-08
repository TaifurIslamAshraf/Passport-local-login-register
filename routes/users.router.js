const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

//User models
const User = require("../models/user.model");

//Register : Get
router.get("/register", (req, res) => {
  res.render("register");
});

//Register : Post
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if (!name || !email || !password || !password2) {
      errors.push({ msg: "Plase fill in all fields" });
    }

    //Check password match
    if (password !== password2) {
      errors.push({ msg: "Password do not match" });
    }

    //Check Password length
    if (password.length < 6) {
      errors.push({ msg: "Password shold be at least 6 characters" });
    }

    if (errors.length > 0) {
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      //Validation passed
      await User.findOne({ email: email }).then((user) => {
        if (user) {
          //User exists
          errors.push({ msg: "Email already exists" });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          //create user
          bcrypt.hash(password, 10, async (err, hash) => {
            // Store hash in your password DB.
            const newUser = new User({
              name,
              email,
              password: hash,
            });
            await newUser
              .save()
              .then(() => {
                req.flash("success_msg", "You are registerd and can Login");
                res.redirect("/users/login");
              })
              .catch((err) => {
                console.log(err.message);
              });
          });
        }
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Login : Get
router.get("/login", (req, res) => {
  res.render("login");
});

//Login : post
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

//handle logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/login");
  });
});

module.exports = router;
