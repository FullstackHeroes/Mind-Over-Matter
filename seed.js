const db = require("./server/db");
const { green, red } = require("chalk");

const { User, Hour } = require("./server/db/models");

const seed = async () => {
  await db.sync({ force: true }).then(() => {
    User.create({
      firstName: "Peter",
      lastName: "Parker",
      email: "peter@mcu.org",
      address: "4 Hanover Square",
      zip: "11221"
    });
    User.create({
      firstName: "Steven",
      lastName: "Strange",
      email: "docunfamiliar@astralrealm.gov",
      address: "666 Park ave",
      zip: "11221"
    });
    Hour.create({
      trueScore: 5,
      happy: 1.0,
      surprised: 0.05,
      neutral: 0.05,
      disgusted: 0.05,
      fearful: 0.05,
      angry: 0.05,
      sad: 0.05,
      timeStamp: date.getTime()
    });

    Hour.create({
      trueScore: 5,
      happy: 1.0,
      surprised: 0.05,
      neutral: 0.05,
      disgusted: 0.05,
      fearful: 0.05,
      angry: 0.05,
      sad: 0.05,
      timeStamp: date.getTime()
    });
  });
  // seed your database here!

  console.log(green("Seeding success!"));
  db.close();
};

seed().catch(err => {
  console.error(red("Oh noes! Something went wrong!"));
  console.error(err);
  db.close();
});
