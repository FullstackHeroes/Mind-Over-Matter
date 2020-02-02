const router = require("express").Router();
const { User } = require("../db/models");

//WHEN WE BULD IN SECURITY THIS WILL BE ADMIN ONLY.
router.get("/", async (req, res, next) => {});

//SECURITY ON THIS ROUTE WILL BE SELF OR ADMIN
router.delete("/:id", async (req, res, next) => {});

module.exports = router;
