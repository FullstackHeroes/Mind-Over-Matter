const router = require("express").Router();
const users = require("./users");
const hours = require("./hours");
const normalizeScore = require("./normalizeScore");

router.use("/hours", hours);
router.use("/users", users);
router.use("/normalizeScore", normalizeScore);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
