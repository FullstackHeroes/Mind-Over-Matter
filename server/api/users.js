const router = require("express").Router();
const { User } = require("../db/models");
const db = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "name"]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.params.id);
    if (!user) return res.status(404).json("No such user at our store!");
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;

////////////////////////////////////////////////////////////////
//BELOW IS SQL BASED QUERIES, WE MAY CHOOSE TO PIVOT INTO SQL//
///////////////////////////////////////////////////////////////
// //WHEN WE BULD IN SECURITY THIS WILL BE ADMIN ONLY.
// router.get("/", async (req, res, next) => {
//   try {
//     const users = await db.query("SELECT * FROM users");
//     res.JSON(users.rows[0]);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async function(req, res, next) {
//   try {
//     const { email, firstName, lastName, password } = req.body;
//     const result = await db.query(
//       `INSERT INTO users (email,first_name,last_name,password) VALUES('${email}','${firstName}','${lastName}','${password}')`
//     );
//     res.sendStatus(201);
//   } catch (err) {
//     next(err);
//   }
// });

// //SECURITY ON THIS ROUTE WILL BE SELF OR ADMIN
// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const user = await db.query(`SELECT * FROM users WHERE id = ${id}`);
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// });

// router.patch("/:id", async function(req, res, next) {
//   try {
//     const result = await db.query(
//       'UPDATE users SET email=$1, "firstName"=$2, "lastName"=$3 WHERE id=$4 RETURNING *',
//       [req.body.email, req.body.firstName, req.body.lastName, req.params.id]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     next(err);
//   }
// });

// //SECURITY ON THIS WILL BE SELF OR ADMIN
// router.delete("/:id", async function(req, res, next) {
//   try {
//     const user = await db.query("DELETE FROM users WHERE id=$1", [
//       req.params.id
//     ]);
//     res.JSON({ message: "Deleted" });
//   } catch (err) {
//     next(err);
//   }
// });
