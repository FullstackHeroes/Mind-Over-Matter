const router = require("express").Router();
const db = require("../db");
const { isAdmin } = require("./routeProtectors");

//=======GET ALL DAYS==========

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const days = await db.query("SELECT * FROM days");
    res.json(days);
  } catch (error) {
    next(error);
  }
});

//=======GET DAYS BY USER ID==========

router.get("/:userId", async (req, res, next) => {
  const userDays = await db.query(
    `SELECT * FROM days WHERE userId = ${req.params.userId}`
  );
  res.json(userDays);
});

module.exports = router;
