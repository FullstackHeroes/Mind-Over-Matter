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
  WHERE date(hours."timeStamp") = CURRENT_DATE AND hours."userId" = ${req.params.userId}`;
  const userHours = await db.query(text);
  const screenTimeArr = userHours[0];
  if (screenTimeArr.length) {
    const dailyScreenTime = screenTimeArr.reduce((a, b) => ({
      screenTime: a.screenTime + b.screenTime
    }));
    res.json(Math.round(dailyScreenTime.screenTime / 3600));
  } else res.json(0);
});

router.get("/:userId/threehours", async (req, res, next) => {
  const text = `SELECT hours."count" FROM hours WHERE date(hours."timeStamp") >= CURRENT_DATE - INTERVAL '3 hours' AND hours."userId" = ${req.params.userId}`;
  const userSnapCount = await db.query(text);
  const snapCountArr = userSnapCount[0];
  if (snapCountArr.length) {
    const threeHourSnapCount = snapCountArr.reduce((a, b) => ({
      count: a.count + b.count
    }));
    res.json(threeHourSnapCount);
  } else res.json(0);
});

router.get("/:userId/month", async (req, res, next) => {
  const text = `SELECT hours."screenTime" FROM hours where DATE_PART('month', date(hours."timeStamp")) = DATE_PART('month', CURRENT_DATE) AND hours."userId" = ${req.params.userId}`;
  const userHours = await db.query(text);
  const screenTimeArr = userHours[0];
  if (screenTimeArr.length) {
    const dailyScreenTime = screenTimeArr.reduce((a, b) => ({
      screenTime: a.screenTime + b.screenTime
    }));
    res.json(Math.floor(dailyScreenTime.screenTime / 3600));
  } else res.json(0);
});

router.get("/:userId/year", async (req, res, next) => {
  const text = `SELECT hours."screenTime" FROM hours where DATE_PART('year', date(hours."timeStamp")) = DATE_PART('year', CURRENT_DATE) AND hours."userId" = ${req.params.userId}`;
  const userHours = await db.query(text);
  const screenTimeArr = userHours[0];
  if (screenTimeArr.length) {
    const dailyScreenTime = screenTimeArr.reduce((a, b) => ({
      screenTime: a.screenTime + b.screenTime
    }));
    res.json(Math.floor(dailyScreenTime.screenTime / 3600));
  } else res.json(0);
});

router.get("/:userId/yesterday", async (req, res, next) => {
  const text = `SELECT hours."screenTime" FROM hours WHERE date(hours."timeStamp") = CURRENT_DATE - INTERVAL '1 day' AND hours."userId" = ${req.params.userId}`;
  const userHours = await db.query(text);
  const screenTimeArr = userHours[0];
  if (screenTimeArr.length) {
    const yesterdayScreenTime = screenTimeArr.reduce((a, b) => ({
      screenTime: a.screenTime + b.screenTime
    }));
    res.json(Math.floor(yesterdayScreenTime.screenTime / 3600));
  } else res.json(0);
});

router.get("/:userId/week", async (req, res, next) => {
  const text = `SELECT hours."screenTime" FROM hours WHERE date("timeStamp") >= CURRENT_DATE - INTERVAL '7 days' AND hours."userId" = ${req.params.userId}`;
  const userHours = await db.query(text);
  const screenTimeArr = userHours[0];
  if (screenTimeArr.length) {
    const weeksScreenTime = screenTimeArr.reduce((a, b) => ({
      screenTime: a.screenTime + b.screenTime
    }));
    res.json(Math.round(weeksScreenTime.screenTime / 3600));
  } else res.json(0);
});

module.exports = router;
