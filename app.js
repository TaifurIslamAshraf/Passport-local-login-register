const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const app = express();

//passport config
require("./config/passport")(passport);

//Conected mongodb
require("./config/database");

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Express session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

//passport midelware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routers
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users.router"));

module.exports = app;
