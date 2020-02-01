const { db } = require("../server/db");
const { User, Hour, Day, Week } = require("../server/db/models");

const seed = async () => {
  // await db.sync();
  await db.sync({ force: true });
  console.log("db synced !");
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
