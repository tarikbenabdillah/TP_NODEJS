const router = require('express').Router();
const usersRepo = require('../respositories/users')
/* GET users listing. */
router.get('/', async function (req,res,next) {
  res.send(await usersRepo.getAllUsers())
});

router.get("/:offset",async function (req,res,next) {
  res.send(await usersRepo.getUsers(req.params.offset))
})
router.put("/",async function (req,res,next) {
  res.send(await usersRepo.updateUser(req.body))
})
router.delete("/delete/:id",async function (req,res,next) {
  res.send(await usersRepo.deleteUser(req.params.id))
})
router.post("/add",async function (req,res,next) {
  res.send(await usersRepo.addUser(req.body))
})
module.exports = router;
