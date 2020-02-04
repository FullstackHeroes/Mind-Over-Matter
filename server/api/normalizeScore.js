const router = require("express").Router();
const { User, Hour, NormalizeScore } = require("../db/models");

router.post("/", async function(req, res, next) {
  console.log("normalize -", req.body);
  try {
    const { normalizeScore, timeStamp } = req.body;
    const newNormalize = await NormalizeScore.create({
      normalizeScore,
      timeStamp
    });
    res.json(newNormalize);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
