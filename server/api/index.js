const router = require("express").Router();
const users = require("./users");
const weightedScore = require("./weightedScore");

router.use("/users", users);
router.use("/weightedScore", weightedScore);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
