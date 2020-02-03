const router = require("express").Router();
const db = require("../db");
const { isAdmin } = require("./routeProtectors");

//=======GET ALL WEEKS==========

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const weeks = await db.query("SELECT * FROM weeks");
    res.json(weeks);
  } catch (error) {
    next(error);
  }
});

//=======GET WEEKS BY USER ID==========

router.get("/:userId", async (req, res, next) => {
  const userWeeks = await db.query(
    `SELECT * FROM weeks WHERE userId = ${req.params.userId}`
  );
  res.json(userWeeks);
});

module.exports = router;
