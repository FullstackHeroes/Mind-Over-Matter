const router = require("express").Router();
const users = require("./users");
const hours = require("./hours");
// const scores = require("./scores")

router.use("/hours", hours);
router.use("/users", users);
// router.use("/scores", scores); //uncomment when score routes are up.

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;

// router.use("/users", require("./users"));
router.use("/hours", require("./hours"));
router.use("/days", require("./days"));
router.use("/weeks", require("./weeks"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
