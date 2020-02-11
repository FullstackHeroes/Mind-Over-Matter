const db = require("../server/db");
const { User, WeightedScore } = require("../server/db/models");

// ATTEMPT TO IMPORT MATERIAL FROM CLIENT SIDE
const share = require("../src/utils/share"),
  {
    dateCreate,
    emotions,
    sentimentSpectrum,
    snapIntDefault,
    dbIntDefault,
    calcScreenTime
  } = share.utilShare();

const userSeed = [
  {
    name: "Peter Parker",
    email: "peter@a.com",
    password: "123"
  },
  {
    name: "Steven Strange",
    email: "steve@a.com",
    password: "123"
  },
  {
    name: "Tony Stark",
    email: "tony@a.com",
    password: "123"
  }
];

const trueScoreGen = (userId, count) => {
  const trueRes = [];
  while (count) {
    const rounding = 10 ** 5,
      normScoreMin = 5,
      normScoreMax = 8,
      runScoreMin = 5,
      runScoreMax = 8,
      obj = {
        userId,
        trueScore: 0,
        normalizeScore:
          Math.floor(
            (Math.random() * (normScoreMax - normScoreMin) + normScoreMin) *
              rounding
          ) / rounding,
        runningScore:
          Math.floor(
            (Math.random() * (runScoreMax - runScoreMin) + runScoreMin) *
              rounding
          ) / rounding,
        sentimentDiff: 0,
        timeStamp: dateCreate(),
        count: dbIntDefault / snapIntDefault,
        screenScore:
          Math.floor((Math.random() * 0.5 + 0.5) * rounding) / rounding,
        screenTime: 0
      },
      numArr = new Array(7)
        .fill(null)
        .map((val, i) => (i === 0 ? Math.random() * 10 : Math.random())),
      totalRand = numArr.reduce((acm, val) => (acm += val), 0),
      hoursDiff =
        obj.timeStamp.getHours() - obj.timeStamp.getTimezoneOffset() / 60;

    // ADDING EACH INDIVIDUAL EMOTION SCORE AND IMPACTING TRUE SCORE
    for (let idx in emotions) {
      const emotion = emotions[idx],
        emotScore = Math.floor((numArr[idx] / totalRand) * rounding) / rounding;
      obj[emotion] = emotScore;
      obj.trueScore +=
        Math.floor(
          emotScore * sentimentSpectrum[emotion].spectrumScore * rounding
        ) / rounding;
    }

    // ADJUST EACH OF THE OTHER ATTRIBUTES
    obj.sentimentDiff =
      Math.floor((obj.runningScore / obj.normalizeScore) * rounding) / rounding;
    obj.timeStamp.setHours(hoursDiff);
    if (count <= 10) {
      obj.timeStamp.setSeconds(obj.timeStamp.getSeconds() - count + 1);
    } else {
      obj.timeStamp.setSeconds(obj.timeStamp.getSeconds() - count * 5000 + 1);
    }
    obj.count -= Math.round(Math.random() * obj.count * 0.3);
    obj.screenTime = calcScreenTime(obj.count, snapIntDefault);

    // STORE EACH INSTANCE OBJ INTO PARENT ARRAY
    trueRes.push(obj);
    count--;
  }

  return trueRes;
};

const normalScoreGen = (userId, count) => {
  const normRes = [];
  while (count) {
    const rounding = 10 ** 5,
      normScoreMin = 5,
      normScoreMax = 8,
      runScoreMin = 5,
      runScoreMax = 8,
      obj = {
        userId,
        normalizeScore:
          Math.floor(
            (Math.random() * (normScoreMax - normScoreMin) + normScoreMin) *
              rounding
          ) / rounding,
        runningScore:
          Math.floor(
            (Math.random() * (runScoreMax - runScoreMin) + runScoreMin) *
              rounding
          ) / rounding,
        sentimentDiff: 0,
        timeStamp: dateCreate()
      },
      hoursDiff =
        obj.timeStamp.getHours() - obj.timeStamp.getTimezoneOffset() / 60;

    // ADJUST EACH OF THE OTHER ATTRIBUTES
    obj.timeStamp.setHours(hoursDiff);
    obj.timeStamp.setSeconds(obj.timeStamp.getSeconds() - count + 1);
    obj.sentimentDiff =
      Math.floor((obj.runningScore / obj.normalizeScore) * rounding) / rounding;

    // STORE EACH INSTANCE OBJ INTO PARENT ARRAY
    normRes.push(obj);
    count--;
  }
  return normRes;
};

const seed = async () => {
  await db.sync({ force: true });
  console.log("db synced !");

  await User.bulkCreate(userSeed);
  await WeightedScore.bulkCreate(trueScoreGen(1, 100));

  console.log(`seeded successfully`);
};

const runSeed = async () => {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    await db.close();
    console.log("db connection closed");
  }
};

if (module === require.main) runSeed();

module.exports = seed;
