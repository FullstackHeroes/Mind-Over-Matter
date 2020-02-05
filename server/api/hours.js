const router = require("express").Router();
const db = require("../db");
const { isAdmin } = require("./routeProtectors");
const { User, Hour } = require("../db/models");

//=======GET ALL HOURS==========
router.get("/", async (req, res, next) => {
  try {
    const hours = await Hour.findAll({
      include: [{ model: User, as: "user" }]
    });
    res.json(hours);
  } catch (error) {
    next(error);
  }
});

//=======POST HOURS============
router.post("/", async function(req, res, next) {
  try {
    const {
      trueScore,
      userId,
      happy,
      surprised,
      neutral,
      disgusted,
      fearful,
      angry,
      sad,
      timeStamp,
      count,
      screenScore,
      screenTime
    } = req.body;
    await Hour.create({
      trueScore,
      userId,
      happy,
      surprised,
      neutral,
      disgusted,
      fearful,
      angry,
      sad,
      timeStamp,
      count,
      screenScore,
      screenTime
    });
    const newFullScoreObj = await Hour.findAll({
      where: {
        userId: userId
      }
    });
    res.json(newFullScoreObj);
  } catch (err) {
    next(err);
  }
});

//=======GET HOURS BY USER ID==========
router.get("/:userId", async (req, res, next) => {
  const userHours = await Hour.findAll({
    where: {
      userId: req.params.userId
    }
  });
  res.json(userHours);
});

router.get("/:userId/today", async (req, res, next) => {
  const text = `SELECT hours."screenTime"
  FROM hours
  WHERE date(hours."timeStamp") = CURRENT_DATE;`;
  const userHours = await db.query(text);
  const screenTimeArr = userHours[0];
  const dailyScreenTime = screenTimeArr.reduce((a, b) => ({
    screenTime: a.screenTime + b.screenTime
  }));
  res.json(Math.floor(dailyScreenTime.screenTime / 60));
});

module.exports = router;
