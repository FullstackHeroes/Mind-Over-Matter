const path = require("path");
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./db");
const PORT = process.env.PORT || 3000;
const app = express();

module.exports = app;

// SET UP OUR APPLICATION SERVER
const createApp = () => {
  // LOGGING MIDDLEWARE
  app.use(morgan("dev"));

  // BODY PARSING
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // COMPRESSION MIDDLEWARE
  app.use(compression());

  // ROUTING
  app.use("/api", require("./api"));

  // STATIC FILE-SERVING MIDDLEWARE
  app.use(express.static(path.join(__dirname, "../public")));

  // REMAINING REQUESTS WITH EXTENSION (.js, .css, etc.) SEND 404
  app.use((req, res, next) => {
    const extension = path.extname(req.path);
    if (extension.length) {
      const err = new Error("Not found");
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // SEND INDEX.HTML FILE FROM PUBLIC
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // ERROR HANDLING ENDWARE
  app.use((err, req, res, next) => {
    console.error("OH NO SERVER --", err.stack);
    res.status(err.status || 500).send(err.message || "Server Error");
  });
};

// FUNCTION TO LAUNCH SERVER
const startListening = () => {
  const server = app.listen(PORT, () =>
    console.log(`Listening it up on port ${PORT}`)
  );
};

// SYNCING DATABASE
// const syncDB = () => db.sync()

// TRIGGER THE START APP / DATABASE FUNCTION
const startApp = async () => {
  // await syncDB();
  await createApp();
  await startListening();
};

// ALLOWS RUNNING DIRECTLY FROM COMMAND LINE
if (require.main === module) startApp();
else createApp();
