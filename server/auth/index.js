const router = require("express").Router();
const { User, Hour, NormalizeScore } = require("../db/models");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // FINDING USER IN DB
    const user = await User.findOne({ where: { email: email } });
    // CHECKING USER EXISTENCE AND CRITERIA
    if (!user) {
      console.log("No such user found:", email);
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(password)) {
      console.log("Incorrect password for user:", email);
      res.status(401).send("Wrong username and/or password");
    } else {
      // IF USER CHECKOUTS THEN SEND BACK TO FRONTEND
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    // CREATE USER IN DB AND SEND TO FRONTEND
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.get("/me", (req, res) => {
  res.json(req.user);
});
