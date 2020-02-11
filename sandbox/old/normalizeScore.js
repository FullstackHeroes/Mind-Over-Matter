const router = require("express").Router();
const { NormalizeScore } = require("../../server/db/models");

router.get("/:userId", async function(req, res, next) {
  try {
    const allNormalizeScores = await NormalizeScore.findAll({
        where: {
          userId: req.params.userId
        }
      }),
      normalizeScoreArr = [],
      runningScoreArr = [],
      sentimentDiffArr = [];
    if (allNormalizeScores.length) {
      allNormalizeScores.map(entry => {
        const normalizeScoreObj = {},
          runningScoreObj = {},
          sentimentDiffObj = {};
        normalizeScoreObj.id = entry.id;
        normalizeScoreObj.normalizeScore = entry.normalizeScore;
        normalizeScoreObj.timeStamp = entry.timeStamp;
        normalizeScoreObj.userId = entry.userId;
        runningScoreObj.id = entry.id;
        runningScoreObj.runningScore = entry.runningScore;
        runningScoreObj.timeStamp = entry.timeStamp;
        runningScoreObj.userId = entry.userId;
        sentimentDiffObj.id = entry.id;
        sentimentDiffObj.sentimentDiff = entry.sentimentDiff;
        sentimentDiffObj.timeStamp = entry.timeStamp;
        sentimentDiffObj.userId = entry.userId;
        normalizeScoreArr.push(normalizeScoreObj);
        runningScoreArr.push(runningScoreObj);
        sentimentDiffArr.push(sentimentDiffObj);
      });
    }
    res.json({ normalizeScoreArr, runningScoreArr, sentimentDiffArr });
  } catch (err) {
    next(err);
  }
});

router.post("/", async function(req, res, next) {
  try {
    const {
        normalizeScore,
        timeStamp,
        userId,
        runningScore,
        sentimentDiff
      } = req.body,
      newNormalize = await NormalizeScore.create({
        normalizeScore,
        timeStamp,
        userId,
        runningScore,
        sentimentDiff
      }),
      allNormalizeScores = await NormalizeScore.findAll({
        where: {
          userId: userId
        }
      }),
      normalizeScoreArr = [],
      runningScoreArr = [],
      sentimentDiffArr = [];
    if (allNormalizeScores.length) {
      allNormalizeScores.map(entry => {
        const normalizeScoreObj = {},
          runningScoreObj = {},
          sentimentDiffObj = {};
        normalizeScoreObj.id = entry.id;
        normalizeScoreObj.normalizeScore = entry.normalizeScore;
        normalizeScoreObj.timeStamp = entry.timeStamp;
        normalizeScoreObj.userId = entry.userId;
        runningScoreObj.id = entry.id;
        runningScoreObj.runningScore = entry.runningScore;
        runningScoreObj.timeStamp = entry.timeStamp;
        runningScoreObj.userId = entry.userId;
        sentimentDiffObj.id = entry.id;
        sentimentDiffObj.sentimentDiff = entry.sentimentDiff;
        sentimentDiffObj.timeStamp = entry.timeStamp;
        sentimentDiffObj.userId = entry.userId;
        normalizeScoreArr.push(normalizeScoreObj);
        runningScoreArr.push(runningScoreObj);
        sentimentDiffArr.push(sentimentDiffObj);
      });
    }
    res.json({ normalizeScoreArr, runningScoreArr, sentimentDiffArr });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
