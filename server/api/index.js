const router = require("express").Router();
const users = require("./users");
const weightedScore = require("./weightedScore");
const article = require("./article");

router.use("/users", users);
router.use("/weightedScore", weightedScore);
router.use("/article", article);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
