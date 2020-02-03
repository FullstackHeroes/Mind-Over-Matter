const db = require("../server/db");
const { User, Hour, Day, Week } = require("../server/db/models");

const userSeed = [
  {
    first_name: "Peter",
    last_name: "Parker",
    email: "peter@mcu.org",
    password: "123"
  },
  {
    first_name: "Steven",
    last_name: "Strange",
    email: "ar@realm.gov",
    password: "123"
  }
];

const hourSeed = [
  {
    userId: 1,
    trueScore: 6,
    happy: 1.0,
    surprised: 0.05,
    neutral: 0.05,
    disgusted: 0.07,
    fearful: 0.05,
    angry: 0.05,
    sad: 0.05,
    timeStamp: Date.now(),
    count: 335,
    screenScore: 85
  },
  {
    userId: 1,
    trueScore: 5,
    happy: 0.01,
    surprised: 0.05,
    neutral: 0.05,
    disgusted: 0.05,
    fearful: 0.07,
    angry: 0.05,
    sad: 0.05,
    timeStamp: Date.now(),
    count: 310,
    screenScore: 99
  },
  {
    userId: 1,
    trueScore: 9,
    happy: 0.04,
    surprised: 0.85,
    neutral: 0.25,
    disgusted: 0.05,
    fearful: 0.05,
    angry: 0.05,
    sad: 0.1,
    timeStamp: Date.now(),
    count: 320,
    screenScore: 88
  },
  {
    userId: 1,
    trueScore: 10,
    happy: 0.04,
    surprised: 0.85,
    neutral: 0.07,
    disgusted: 0.05,
    fearful: 0.05,
    angry: 0.05,
    sad: 0.1,
    timeStamp: Date.now(),
    count: 280,
    screenScore: 98
  },
  {
    userId: 1,
    trueScore: 5,
    happy: 0.04,
    surprised: 0.85,
    neutral: 0.25,
    disgusted: 0.07,
    fearful: 0.05,
    angry: 0.05,
    sad: 0.1,
    timeStamp: Date.now(),
    count: 290,
    screenScore: 77
  },
  {
    userId: 1,
    trueScore: 8,
    happy: 0.04,
    surprised: 0.07,
    neutral: 0.25,
    disgusted: 0.05,
    fearful: 0.05,
    angry: 0.05,
    sad: 0.1,
    timeStamp: Date.now(),
    count: 330,
    screenScore: 78
  },
  {
    userId: 1,
    trueScore: 8,
    happy: 0.04,
    surprised: 0.85,
    neutral: 0.25,
    disgusted: 0.05,
    fearful: 0.85,
    angry: 0.05,
    sad: 0.1,
    timeStamp: Date.now(),
    count: 290,
    screenScore: 95
  },
  {
    userId: 1,
    trueScore: 9,
    happy: 1.0,
    surprised: 0.65,
    neutral: 0.05,
    disgusted: 0.07,
    fearful: 0.05,
    angry: 0.05,
    sad: 0.05,
    timeStamp: Date.now(),
    count: 275,
    screenScore: 78
  },
  {
    userId: 1,
    trueScore: 7,
    happy: 0.65,
    surprised: 0.6,
    neutral: 0.05,
    disgusted: 0.07,
    fearful: 0.65,
    angry: 0.05,
    sad: 0.05,
    timeStamp: Date.now(),
    count: 310,
    screenScore: 98
  },
  {
    userId: 1,
    trueScore: 8,
    happy: 0.7,
    surprised: 0.05,
    neutral: 0.05,
    disgusted: 0.07,
    fearful: 0.65,
    angry: 0.05,
    sad: 0.05,
    timeStamp: Date.now(),
    count: 250,
    screenScore: 78
  }
];

const seed = async () => {
  // await db.sync();
  await db.sync({ force: true });
  console.log("db synced !");

  await User.bulkCreate(userSeed);
  await Hour.bulkCreate(hourSeed);

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
