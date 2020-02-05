const router = require("express").Router();
const { NormalizeScore } = require("../db/models");

router.get("/:userId", async function(req, res, next) {
  try {
    const allNormalizeScores = await NormalizeScore.findAll({
      where: {
        userId: req.params.userId
      }
    });
    res.json(allNormalizeScores);
  } catch (err) {
    next(err);
  }
});

router.post("/", async function(req, res, next) {
  try {
    const { normalizeScore, timeStamp, userId } = req.body;
    const newNormalize = await NormalizeScore.create({
      normalizeScore,
      timeStamp,
      userId
    });
    const allNormalizeScores = await NormalizeScore.findAll({
      where: {
        userId: userId
      }
    });
    res.json(allNormalizeScores);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
