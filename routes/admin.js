const { Router } = require('express')
const { Admin, Course} = require('../db/index')
const adminMiddleware = require('../middleware/admin')
const jwt = require("jsonwebtoken")
const router = Router()

const jwtPass = 1234;

// Admin Routes
router.post('/signup', async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username
  const password = req.body.password

  const ifExist = await Admin.find({ username: username })
  console.log(ifExist)
  if (ifExist.length) {
    res.status(403).send('User Already Exists!!!')
    return
  }
  Admin.create({
    username: username,
    password: password
  })
    .then(() => {
      res.send('Admin created successfully!!!')
    })
    .catch(err => {
      res.send('Try again later')
    })
})

router.post('/signin',async (req,res)=>{
  const {username,password} = req.body;
  try {
    const user = await Admin.findOne({
      username
    })
    console.log(user)
    if(user == undefined){
      res.json({
        msg: "user does not exist!!!"
      })
      return
    }
    if(user.username==username && user.password==password){
      const token = jwt.sign(username,jwtPass)
      res.json({
        msg: "Signin success!!!",
        token: token
      })
    }
  } catch (error) {
    res.send("something Down")
    console.log(error)
  }
})

router.post('/courses', adminMiddleware, (req, res) => {
  const { title, description, price, imageLink } = req.body;
  Course.create({
    title,
    description,
    price,
    imageLink
  }).then((data)=>{
    console.log(data)
    res.status(200).json({
      msg:"Course creadted Successfully",
      courseId:data._id
    })
  }).catch(err=>{
    console.log(err);
    res.send("failed")
  })
})

router.get('/courses', adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const course = await Course.find({});
  res.status(200).json({
    course
  })
})

module.exports = router
