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

//NEED A CONDITIONAL. HANGS IF THERE IS NO DATA FOR TODAY
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

router.get("/:userId/month", async (req, res, next) => {
  const text = `SELECT hours."screenTime" FROM hours where DATE_PART('month', date(hours."timeStamp")) = DATE_PART('month', CURRENT_DATE);`;
  const userHours = await db.query(text);
  const screenTimeArr = userHours[0];
  const dailyScreenTime = screenTimeArr.reduce((a, b) => ({
    screenTime: a.screenTime + b.screenTime
  }));
  res.json(Math.floor(dailyScreenTime.screenTime / 120));
});

router.get("/:userId/year", async (req, res, next) => {
  const text = `SELECT hours."screenTime" FROM hours where DATE_PART('year', date(hours."timeStamp")) = DATE_PART('year', CURRENT_DATE)`;
  const userHours = await db.query(text);
  const screenTimeArr = userHours[0];
  const dailyScreenTime = screenTimeArr.reduce((a, b) => ({
    screenTime: a.screenTime + b.screenTime
  }));
  res.json(Math.floor(dailyScreenTime.screenTime / 120));
});

router.get("/:userId/yesterday", async (req, res, next) => {
  const text = `SELECT hours."screenTime" FROM hours WHERE date(hours."timeStamp") = CURRENT_DATE - INTERVAL '1 day'`;
  const userHours = await db.query(text);
  const screenTimeArr = userHours[0];
  const yesterdayScreenTime = screenTimeArr.reduce((a, b) => ({
    screenTime: a.screenTime + b.screenTime
  }));
  res.json(Math.floor(yesterdayScreenTime.screenTime / 60));
});

router.get("/:userId/week", async (req, res, next) => {
  const text = `SELECT hours."screenTime" FROM hours WHERE date("timeStamp") >= CURRENT_DATE - INTERVAL '7 days'`;
  const userHours = await db.query(text);
  const screenTimeArr = userHours[0];
  const weeksScreenTime = screenTimeArr.reduce((a, b) => ({
    screenTime: a.screenTime + b.screenTime
  }));
  res.json(Math.round(weeksScreenTime.screenTime / 120));
});

module.exports = router;
