const router = require("express").Router();
const db = require("../db");
const { isAdmin } = require("./routeProtectors");

//=======GET ALL HOURS==========

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const hours = await db.query("SELECT * FROM hours");
    res.json(hours);
  } catch (error) {
    next(error);
  }
});

//=======POST HOURS============

router.post("/", async function(req, res, next) {
  try {
    console.log(req.body);
    console.log(new Date().getTime());
    const {
      trueScore,
      userId,
      neutral,
      happy,
      sad,
      angry,
      disgusted,
      fearful,
      surprised
    } = req.body;
    const result = await db.query(
      `INSERT INTO users (happy, sad, angry, disgusted, fearful, surprised) VALUES(${userId}, ${neutral}, ${happy}, ${sad}, ${angry}, ${disgusted}, ${fearful}, ${surprised}, ${trueScore})`
    );
    res.JSON(result);
  } catch (err) {
    next(err);
  }
});

//=======GET HOURS BY USER ID==========

router.get("/:userId", async (req, res, next) => {
  const userHours = await db.query(
    `SELECT * FROM hours WHERE userId = ${req.params.userId}`
  );
  res.json(userHours);
});

module.exports = router;
