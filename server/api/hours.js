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
  console.log(req.body);
  console.log(new Date().getTime());
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
    timeStamp
  } = req.body;

  try {
    const newHour = await Hour.create({
      trueScore,
      userId,
      happy,
      surprised,
      neutral,
      disgusted,
      fearful,
      angry,
      sad,
      timeStamp
    });
    res.json(newHour);
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

module.exports = router;
