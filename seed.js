const db = require("./server/db");

const { User, Hour } = require("./server/db/models");

const seed = async () => {
  await db.sync({ force: true }).then(() => {
    User.create({
      first_name: "Peter",
      last_name: "Parker",
      email: "peter@mcu.org",
      password: "123"
    });
    User.create({
      first_name: "Steven",
      last_name: "Strange",
      email: "ar@realm.gov",
      password: "123"
    });
    Hour.create({
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
    });

    Hour.create({
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
    });
    Hour.create({
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
    });
    Hour.create({
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
    });
    Hour.create({
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
    });
    Hour.create({
      userId: 1,
      trueScore: 7,
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
    });
    Hour.create({
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
    });
    Hour.create({
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
    });
    Hour.create({
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
    });
    Hour.create({
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
    });
  });
  // seed your database here!

  console.log("Seeding success!");
  db.close();
};

seed().catch(err => {
  console.error("Oh noes! Something went wrong!");
  console.error(err);
  db.close();
});
