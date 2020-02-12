const router = require("express").Router();
const { WeightedScore } = require("../db/models");
// const { isAdmin } = require("./routeProtectors");
// const db = require("../db");

const dateCreate = () => {
  const date = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  return new Date(date);
};

const buildIndScoreObj = userWtdObj => {
  // SETTING UP THE TIME INGREDIENTS
  const currentDate = dateCreate(),
    hoursDiff = currentDate.getHours() - currentDate.getTimezoneOffset() / 60;

  currentDate.setHours(hoursDiff);

  const oneHourMilli = 3600000,
    twoFourHourMilli = oneHourMilli * 24,
    todayStart = new Date(
      new Date(
        new Date(new Date(currentDate).setHours(0)).setMinutes(0)
      ).setSeconds(0)
    ),
    yesterStart = new Date(todayStart - twoFourHourMilli),
    weekStart = new Date(todayStart - twoFourHourMilli * 7);

  // SETTING UP ALL TIME VARIABLES TO SEND BACK
  let normalizeScoreArr = [],
    runningScoreArr = [],
    sentimentDiffArr = [],
    threeHourSnapCount = 0,
    screenMinsToday = 0,
    screenMinsYesterday = 0,
    screenHoursWeek = 0;

  // LOOPING THROUGH OBJECT TO PARSE THROUGH WHAT TO PUT BACK
  for (const { dataValues: ele } of userWtdObj.slice(
    (-twoFourHourMilli * 31) / 1000
  )) {
    // NORMALIZE SCORE RESPONSE
    const normalizeScoreObj = {};
    normalizeScoreObj.normalizeScore = ele.normalizeScore;
    normalizeScoreObj.timeStamp = ele.timeStamp;
    normalizeScoreObj.userId = ele.userId;
    normalizeScoreArr.push(normalizeScoreObj);

    // RUNNING SCORE RESPONSE
    const runningScoreObj = {};
    runningScoreObj.runningScore = ele.runningScore;
    runningScoreObj.timeStamp = ele.timeStamp;
    runningScoreObj.userId = ele.userId;
    runningScoreArr.push(runningScoreObj);

    // SENTIMENT DIFF RESPONSE
    const sentimentDiffObj = {};
    sentimentDiffObj.sentimentDiff = ele.sentimentDiff;
    sentimentDiffObj.timeStamp = ele.timeStamp;
    sentimentDiffObj.userId = ele.userId;
    sentimentDiffArr.push(sentimentDiffObj);

    // VALUE TIME REFERENCE POINTS
    const valDate = new Date(ele.timeStamp),
      minDiff = (currentDate - valDate) / 1000;

    // THREE HOUR SNAP COUNT
    if ((oneHourMilli * 3) / 1000 >= minDiff) threeHourSnapCount += ele.count;

    // TODAY TIMING
    if (valDate >= todayStart) screenMinsToday += ele.screenTime / 60;

    // YESTERDAY TIMING
    if (valDate >= yesterStart && valDate < todayStart)
      screenMinsYesterday += ele.screenTime / 60;

    // PAST 7 DAYS TIMING
    if (valDate >= weekStart && valDate < todayStart)
      screenHoursWeek += Math.round((ele.screenTime / 3600) * 100) / 100;
  }

  return {
    normalizeScoreArr,
    runningScoreArr,
    sentimentDiffArr,
    threeHourSnapCount,
    screenMinsToday,
    screenMinsYesterday,
    screenHoursWeek
  };
};

// -------------------------- MAIN FUNCTIONING ROUTES -------------------------- //
// ********** MAIN GET ROUTE ********** //
router.get("/:userId", async (req, res, next) => {
  try {
    // RETRIEVE THE FULL OBJECT OF THE INDIVIDUAL'S PROFILE
    const fullScoreObj = await WeightedScore.findAll({
      where: {
        userId: req.params.userId
      }
    });

    // LET'S START DOING THE MAGIC
    if (fullScoreObj && fullScoreObj.length) {
      const {
        threeHourSnapCount,
        screenMinsToday,
        screenMinsYesterday,
        screenHoursWeek,
        normalizeScoreArr,
        runningScoreArr,
        sentimentDiffArr
      } = buildIndScoreObj(fullScoreObj);

      // LET'S SEND IT BACK!
      res.json({
        fullScoreObj,
        normalizeScoreArr,
        runningScoreArr,
        sentimentDiffArr,
        threeHourSnapCount,
        screenMinsToday,
        screenMinsYesterday,
        screenHoursWeek
      });
    } else res.json([]);
  } catch (error) {
    next(error);
  }
});

// ********** MAIN POST ROUTE ********** //
router.post("/", async function(req, res, next) {
  try {
    const {
      userId,
      normalizeScore,
      runningScore,
      sentimentDiff,
      trueScore,
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
      userId,
      normalizeScore,
      runningScore,
      sentimentDiff,
      trueScore,
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
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

// ---------------------------- PRIOR GET ALL AND TIME ROUTES (NOT USED) ---------------------------- //
// // GETTING ALL SCORES FOR ALL USERS
// router.get("/", async (req, res, next) => {
//   try {
//     const score = await WeightedScore.findAll({
//       include: [{ model: User, as: "user" }]
//     });
//     res.json(score);
//   } catch (error) {
//     next(error);
//   }
// });

// // NEED A CONDITIONAL. HANGS IF THERE IS NO DATA FOR TODAY
// router.get("/:userId/today", async (req, res, next) => {
//   const text = `SELECT weighteds."screenTime"
//   FROM weighteds
//   WHERE date(weighteds."timeStamp") = CURRENT_DATE AND weighteds."userId" = ${req.params.userId}`;
//   const userHours = await db.query(text);
//   const screenTimeArr = userHours[0];
//   if (screenTimeArr.length) {
//     const dailyScreenTime = screenTimeArr.reduce((a, b) => ({
//       screenTime: a.screenTime + b.screenTime
//     }));
//     res.json(Math.round(dailyScreenTime.screenTime / 3600));
//   } else res.json(0);
// });

// router.get("/:userId/threehours", async (req, res, next) => {
//   const text = `SELECT weighteds."count" FROM weighteds WHERE date(weighteds."timeStamp") >= CURRENT_DATE - INTERVAL '3 hours' AND weighteds."userId" = ${req.params.userId}`;
//   const userSnapCount = await db.query(text);
//   const snapCountArr = userSnapCount[0];
//   if (snapCountArr.length) {
//     const threeHourSnapCount = snapCountArr.reduce((a, b) => ({
//       count: a.count + b.count
//     }));
//     res.json(threeHourSnapCount);
//   } else res.json(0);
// });

// router.get("/:userId/month", async (req, res, next) => {
//   const text = `SELECT weighteds."screenTime" FROM weighteds where DATE_PART('month', date(weighteds."timeStamp")) = DATE_PART('month', CURRENT_DATE) AND weighteds."userId" = ${req.params.userId}`;
//   const userHours = await db.query(text);
//   const screenTimeArr = userHours[0];
//   if (screenTimeArr.length) {
//     const dailyScreenTime = screenTimeArr.reduce((a, b) => ({
//       screenTime: a.screenTime + b.screenTime
//     }));
//     res.json(Math.floor(dailyScreenTime.screenTime / 3600));
//   } else res.json(0);
// });

// router.get("/:userId/year", async (req, res, next) => {
//   const text = `SELECT weighteds."screenTime" FROM weighteds where DATE_PART('year', date(weighteds."timeStamp")) = DATE_PART('year', CURRENT_DATE) AND weighteds."userId" = ${req.params.userId}`;
//   const userHours = await db.query(text);
//   const screenTimeArr = userHours[0];
//   if (screenTimeArr.length) {
//     const dailyScreenTime = screenTimeArr.reduce((a, b) => ({
//       screenTime: a.screenTime + b.screenTime
//     }));
//     res.json(Math.floor(dailyScreenTime.screenTime / 3600));
//   } else res.json(0);
// });

// router.get("/:userId/yesterday", async (req, res, next) => {
//   const text = `SELECT weighteds."screenTime" FROM weighteds WHERE date(weighteds."timeStamp") = CURRENT_DATE - INTERVAL '1 day' AND weighteds."userId" = ${req.params.userId}`;
//   const userHours = await db.query(text);
//   const screenTimeArr = userHours[0];
//   if (screenTimeArr.length) {
//     const yesterdayScreenTime = screenTimeArr.reduce((a, b) => ({
//       screenTime: a.screenTime + b.screenTime
//     }));
//     res.json(Math.floor(yesterdayScreenTime.screenTime / 3600));
//   } else res.json(0);
// });

// router.get("/:userId/week", async (req, res, next) => {
//   const text = `SELECT weighteds."screenTime" FROM weighteds WHERE date("timeStamp") >= CURRENT_DATE - INTERVAL '7 days' AND weighteds."userId" = ${req.params.userId}`;
//   const userHours = await db.query(text);
//   const screenTimeArr = userHours[0];
//   if (screenTimeArr.length) {
//     const weeksScreenTime = screenTimeArr.reduce((a, b) => ({
//       screenTime: a.screenTime + b.screenTime
//     }));
//     res.json(Math.round(weeksScreenTime.screenTime / 3600));
//   } else res.json(0);
// });

module.exports = router;
