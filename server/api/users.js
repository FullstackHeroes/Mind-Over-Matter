const router = require("express").Router();
const db = require("../db");

//WHEN WE BULD IN SECURITY THIS WILL BE ADMIN ONLY.
router.get("/", async (req, res, next) => {
  try {
    const users = await db.query("SELECT * FROM users");
    res.JSON(users.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.post("/", async function(req, res, next) {
  try {
    const { email, firstName, lastName, password } = req.body;
    const result = await db.query(
      `INSERT INTO users (email,first_name,last_name,password) VALUES('${email}','${firstName}','${lastName}','${password}')`
    );
    // res.JSON(result.rows[0]);
    console.log("result:", result);
  } catch (err) {
    next(err);
  }
});

//SECURITY ON THIS ROUTE WILL BE SELF OR ADMIN
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.query(`SELECT * FROM users WHERE id = ${id}`);
    res.JSON(user.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async function(req, res, next) {
  try {
    const result = await db.query(
      'UPDATE users SET email=$1, "firstName"=$2, "lastName"=$3 WHERE id=$4 RETURNING *',
      [req.body.email, req.body.firstName, req.body.lastName, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

//SECURITY ON THIS WILL BE SELF OR ADMIN
router.delete("/:id", async function(req, res, next) {
  try {
    const user = await db.query("DELETE FROM users WHERE id=$1", [
      req.params.id
    ]);
    res.JSON({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
