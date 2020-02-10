const router = require("express").Router();
const users = require("./users");
const weightedScore = require("./weightedScore");
const normalizeScore = require("./normalizeScore");

router.use("/weightedScore", weightedScore);
router.use("/users", users);
router.use("/normalizeScore", normalizeScore);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
