const router = require("express").Router();
const db = require("../db");
const chalk = require("chalk");
const { isAdmin } = require("./routeProtectors");
const { User, WeightedScore } = require("../db/models");

const dateCreate = () => {
  const date = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  return new Date(date);
};

//=======GET ALL WEIGHTEDSCORES==========
router.get("/", async (req, res, next) => {
  try {
    const score = await WeightedScore.findAll({
      include: [{ model: User, as: "user" }]
    });
    res.json(score);
  } catch (error) {
    next(error);
  }
});

//=======POST WEIGHTEDSCORES============
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
    await WeightedScore.create({
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
    const newFullScoreObj = await WeightedScore.findAll({
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
  try {
    // RETRIEVE THE FULL OBJECT OF THE INDIVIDUAL'S PROFILE
    const userWtdObj = await WeightedScore.findAll({
      where: {
        userId: req.params.userId
      }
    });

    // LET'S START DOING THE MAGIC
    if (userWtdObj && userWtdObj.length) {
      const currentDate = dateCreate(),
        hoursDiff =
          currentDate.getHours() - currentDate.getTimezoneOffset() / 60;
      currentDate.setHours(hoursDiff);

      // SETTING UP ALL NECESSARY VARIABLES
      const oneHour = 3600000,
        twoFourHour = oneHour * 24,
        todayStart = new Date(
          new Date(
            new Date(new Date(currentDate).setHours(0)).setMinutes(0)
          ).setSeconds(0)
        ),
        yesterStart = new Date(todayStart - twoFourHour),
        weekStart = new Date(todayStart - twoFourHour * 7),
        screenMinsToday = 0,
        screenMinsYesterday = 0,
        screenHoursWeek = 0,
        threeHourSnapCount = 0,
        curYear = currentDate.getFullYear(),
        curMonth = currentDate.getMonth() + 1,
        curDay = currentDate.getDate(),
        curHour = currentDate.getHours();

      // LOOPING THROUGH OBJECT TO PARSE THROUGH WHAT TO PUT BACK
      for (const ele of userWtdObj) {
        const valDate = new Date(ele.dataValues.timeStamp),
          valYear = valDate.getFullYear(),
          valMonth = valDate.getMonth() + 1,
          valDay = valDate.getDate(),
          valHour = valDate.getHours(),
          minDiff = (currentDate - valDate) / 1000;

        // console.log("INSIDE --", currentDate, todayMin);
        // TODAY TIMING
        if (valDate >= todayStart) {
          console.log("TODAY INSIDE");
        }

        // YESTERDAY TIMING
        if (valDate >= yesterStart && valDate < todayStart) {
          console.log("YESTERDAY INSIDE");
        }

        // WEEK TIMING
      }
      // res.json({ userWtdObj });
      res.json(userWtdObj);
    } else res.json([]);
  } catch (error) {
    next(error);
  }
});

// NEED A CONDITIONAL. HANGS IF THERE IS NO DATA FOR TODAY
router.get("/:userId/today", async (req, res, next) => {
  const text = `SELECT weighteds."screenTime"
  FROM weighteds
  WHERE date(weighteds."timeStamp") = CURRENT_DATE AND weighteds."userId" = ${req.params.userId}`;
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
  const text = `SELECT weighteds."count" FROM weighteds WHERE date(weighteds."timeStamp") >= CURRENT_DATE - INTERVAL '3 hours' AND weighteds."userId" = ${req.params.userId}`;
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
  const text = `SELECT weighteds."screenTime" FROM weighteds where DATE_PART('month', date(weighteds."timeStamp")) = DATE_PART('month', CURRENT_DATE) AND weighteds."userId" = ${req.params.userId}`;
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
  const text = `SELECT weighteds."screenTime" FROM weighteds where DATE_PART('year', date(weighteds."timeStamp")) = DATE_PART('year', CURRENT_DATE) AND weighteds."userId" = ${req.params.userId}`;
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
  const text = `SELECT weighteds."screenTime" FROM weighteds WHERE date(weighteds."timeStamp") = CURRENT_DATE - INTERVAL '1 day' AND weighteds."userId" = ${req.params.userId}`;
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
  const text = `SELECT weighteds."screenTime" FROM weighteds WHERE date("timeStamp") >= CURRENT_DATE - INTERVAL '7 days' AND weighteds."userId" = ${req.params.userId}`;
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
