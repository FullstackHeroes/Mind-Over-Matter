const db = require("../server/db");
const { User, Hour, NormalizeScore } = require("../server/db/models");

const userSeed = [
  {
    name: "Peter",
    email: "peter@a.com",
    password: "123"
  },
  {
    name: "Steve",
    email: "steve@a.com",
    password: "123"
  }
];

const hourSeed = [
  {
    userId: 1,
    trueScore: 7,
    happy: 0.6,
    surprised: 0.05,
    neutral: 0.03,
    disgusted: 0.2,
    fearful: 0.0,
    angry: 0.05,
    sad: 0.07,
    timeStamp: new Date(),
    count: 335,
    screenScore: 0.85,
    screenTime: 15
  },
  {
    userId: 1,
    trueScore: 5,
    happy: 0.28,
    surprised: 0.2,
    neutral: 0.18,
    disgusted: 0.1,
    fearful: 0.12,
    angry: 0.07,
    sad: 0.05,
    timeStamp: new Date(),
    count: 310,
    screenScore: 0.99,
    screenTime: 13
  },
  {
    userId: 1,
    trueScore: 8,
    happy: 0.55,
    surprised: 0.02,
    neutral: 0.16,
    disgusted: 0.06,
    fearful: 0.1,
    angry: 0.1,
    sad: 0.01,
    timeStamp: new Date(),
    count: 320,
    screenScore: 0.88,
    screenTime: 12
  },
  {
    userId: 1,
    trueScore: 3,
    happy: 0.09,
    surprised: 0.0,
    neutral: 0.15,
    disgusted: 0.12,
    fearful: 0.29,
    angry: 0.24,
    sad: 0.11,
    timeStamp: new Date(),
    count: 280,
    screenScore: 0.98,
    screenTime: 14
  },
  {
    userId: 1,
    trueScore: 4.5,
    happy: 0.05,
    surprised: 0.02,
    neutral: 0.12,
    disgusted: 0.27,
    fearful: 0.22,
    angry: 0.28,
    sad: 0.04,
    timeStamp: new Date(),
    count: 290,
    screenScore: 0.77,
    screenTime: 11
  },
  {
    userId: 1,
    trueScore: 3,
    happy: 0.09,
    surprised: 0.14,
    neutral: 0.19,
    disgusted: 0.04,
    fearful: 0.15,
    angry: 0.31,
    sad: 0.08,
    timeStamp: new Date(),
    count: 330,
    screenScore: 0.78,
    screenTime: 14
  },
  {
    userId: 1,
    trueScore: 5,
    happy: 0.24,
    surprised: 0.15,
    neutral: 0.02,
    disgusted: 0.24,
    fearful: 0.21,
    angry: 0.02,
    sad: 0.12,
    timeStamp: new Date(),
    count: 290,
    screenScore: 0.95,
    screenTime: 12
  },
  {
    userId: 1,
    trueScore: 2,
    happy: 0.03,
    surprised: 0.1,
    neutral: 0.17,
    disgusted: 0.2,
    fearful: 0.02,
    angry: 0.17,
    sad: 0.31,
    timeStamp: new Date(),
    count: 275,
    screenScore: 0.78,
    screenTime: 10
  },
  {
    userId: 1,
    trueScore: 5,
    happy: 0.0,
    surprised: 0.23,
    neutral: 0.03,
    disgusted: 0.23,
    fearful: 0.21,
    angry: 0.02,
    sad: 0.28,
    timeStamp: new Date(),
    count: 310,
    screenScore: 0.98,
    screenTime: 15
  },
  {
    userId: 1,
    trueScore: 8,
    happy: 0.43,
    surprised: 0.14,
    neutral: 0.1,
    disgusted: 0.09,
    fearful: 0.06,
    angry: 0.17,
    sad: 0.01,
    timeStamp: new Date(),
    count: 250,
    screenScore: 0.78,
    screenTime: 13
  }
];

const normalizeScoreSeed = [
  {
    userId: 1,
    normalizeScore: 6.1,
    timeStamp: new Date("1/1/20")
  },
  {
    userId: 1,
    normalizeScore: 7.9,
    timeStamp: new Date("1/2/20")
  },
  {
    userId: 1,
    normalizeScore: 6.3,
    timeStamp: new Date("1/3/20")
  },
  {
    userId: 1,
    normalizeScore: 7.2,
    timeStamp: new Date("1/4/20")
  },
  {
    userId: 1,
    normalizeScore: 5.8,
    timeStamp: new Date("1/5/20")
  },
  {
    userId: 1,
    normalizeScore: 3.3,
    timeStamp: new Date("1/6/20")
  },
  {
    userId: 1,
    normalizeScore: 5.5,
    timeStamp: new Date("1/7/20")
  }
];

const seed = async () => {
  // await db.sync();
  await db.sync({ force: true });
  console.log("db synced !");

  await User.bulkCreate(userSeed);
  await Hour.bulkCreate(hourSeed);
  await NormalizeScore.bulkCreate(normalizeScoreSeed);

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
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
};

if (module === require.main) runSeed();

module.exports = seed;
