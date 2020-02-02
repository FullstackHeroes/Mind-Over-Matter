const router = require("express").Router();
const db = require("../db");
const { User } = require("../db/models");

//WHEN WE BULD IN SECURITY THIS WILL BE ADMIN ONLY.
router.get("/", async (req, res, next) => {
  try {
    const users = await db.query("SELECT * FROM users");
    res.JSON(users.rows[0]);
  } catch (error) {
    next(error);
  }
});

//SECURITY ON THIS ROUTE WILL BE SELF OR ADMIN
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    res.JSON(user.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.post("/", async function(req, res, next) {
  try {
    const result = await db.query(
      "INSERT INTO users (name,type) VALUES ($1,$2) RETURNING *",
      [req.body.name, req.body.type]
    );
    return res.JSON(result.rows[0]);
  } catch (err) {
    return next(err);
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
    return next(err);
  }
});

module.exports = router;

// router.post("/", async function(req, res, next) {
//   try {
//     const result = await db.query(
//       "INSERT INTO fishes (name,type) VALUES ($1,$2) RETURNING *",
//       [req.body.name, req.body.type]
//     );
//     return res.json(result.rows[0]);
//   } catch (err) {
//     return next(err);
//   }
// });

// router.patch("/:id", async function(req, res, next) {
//   try {
//     const result = await db.query(
//       "UPDATE fishes SET name=$1, type=$2 WHERE id=$3 RETURNING *",
//       [req.body.name, req.body.type, req.params.id]
//     );
//     return res.json(result.rows[0]);
//   } catch (err) {
//     return next(err);
//   }
// });

// router.delete("/:id", async function(req, res, next) {
//   try {
//     const result = await db.query("DELETE FROM fishes WHERE id=$1", [
//       req.params.id
//     ]);
//     return res.json({ message: "Deleted" });
//   } catch (err) {
//     return next(err);
//   }
// });

// const router = require('express').Router()
// const {isAdmin, isSelfOrAdmin} = require('./routProtection')
// const {User} = require('../db/models')

// module.exports = router

// router.get('/', isAdmin, async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

// router.get('/:id', isSelfOrAdmin, async (req, res, next) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         id: req.params.id
//       }
//     })
//     res.json(user)
//   } catch (error) {
//     next(error)
//   }
// })

// router.post('/', async (req, res, next) => {
//   try {
//     const newUser = await User.create({
//       email: req.body.email,
//       password: req.body.password,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       address: req.body.address,
//       phone: req.body.phone,
//       admin: false
//     })
//     res.status(201).json(newUser)
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/:id', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(+req.params.id)
//     if (!user) return res.status(404).json('No such user at our store!')
//     const updatedUser = await User.update(req.body, {
//       where: {id: req.params.id},
//       returning: true,
//       plain: true
//     })
//     res.status(200).json(updatedUser)
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/:id', isSelfOrAdmin, async (req, res, next) => {
//   try {
//     await User.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//     res.status(204).end()
//   } catch (error) {
//     next(error)
//   }
// })
