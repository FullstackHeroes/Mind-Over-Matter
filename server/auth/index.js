const router = require("express").Router();
const { User, WeightedScore } = require("../db/models");
module.exports = router;

const dateCreate = () => {
  const date = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York"
  });
  return new Date(date);
};

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // FINDING USER IN DB
    const user = await User.findOne({ where: { email: email } });

    // CHECKING USER EXISTENCE AND CRITERIA
    if (!user) {
      console.log("No such user found:", email);
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(password)) {
      console.log("Incorrect password for user:", email);
      res.status(401).send("Wrong username and/or password");
    } else {
      // IF USER CHECKOUTS THEN SEND BACK TO FRONTEND
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    // CREATE USER IN DB AND SEND TO FRONTEND
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });

    const initialArr = [];
    let count = 15;

    while (count) {
      // SET UP TIME OBJECT
      const timeStamp = dateCreate(),
        hoursDiff = timeStamp.getHours() - timeStamp.getTimezoneOffset() / 60;
      timeStamp.setHours(hoursDiff);

      // CREATE INITIAL SCORING OBJECT FOR NEW USER AND POST INTO DB
      const initScore = {
        userId: user.dataValues.id,
        trueScore: 5,
        normalizeScore: 5,
        runningScore: 5,
        sentimentDiff: 1,
        happy: 0.143,
        surprised: 0.143,
        neutral: 0.143,
        disgusted: 0.143,
        fearful: 0.143,
        angry: 0.143,
        sad: 0.142,
        timeStamp,
        count: 100,
        screenScore: 0.95,
        screenTime: 0.01
      };
      initScore.timeStamp.setSeconds(
        initScore.timeStamp.getSeconds() - count + 1
      );
      initialArr.push(initScore);
      count--;
    }
    await WeightedScore.bulkCreate(initialArr);

    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.post("/logout", async (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/SignIn");
});

router.get("/me", (req, res) => {
  res.json(req.user);
});

router.use("/google", require("./google"));
