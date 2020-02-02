const router = require("express").Router();
const db = require("../db");
const { User } = require("../db/models");

app.get("/:id", (req, res, next) => {
  db.query("SELECT * FROM users WHERE id = $1", [req.params.id], (err, res) => {
    if (err) {
      return next(err);
    }
    res.send(res.rows[0]);
  });
});

//WHEN WE BULD IN SECURITY THIS WILL BE ADMIN ONLY.
router.get("/", async (req, res, next) => {
  try {
    const users = await User;
  } catch (error) {
    next(error);
  }
});

//SECURITY ON THIS ROUTE WILL BE SELF OR ADMIN
router.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;

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
