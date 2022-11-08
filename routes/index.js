const express = require("express");
const router = express.Router();

const { ensureAuthenticated } = require("../config/auth");

//home page
router.get("/", (req, res) => {
  res.status(200).render("index");
});

//dashboard page
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    name: req.user.name,
  });
});

module.exports = router;
