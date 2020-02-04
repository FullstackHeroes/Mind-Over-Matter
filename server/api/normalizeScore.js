const router = require("express").Router();
const { User, Hour, NormalizeScore } = require("../db/models");

router.post("/", async function(req, res, next) {
  try {
    const { normalizeScore, timeStamp, userId } = req.body;
    const newNormalize = await NormalizeScore.create({
      normalizeScore,
      timeStamp,
      userId
    });
    res.json(newNormalize);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
