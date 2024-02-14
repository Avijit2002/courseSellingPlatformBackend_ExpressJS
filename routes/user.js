const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index")
const {asyncFunction} = require("../utils/asyncHandler")

// User Routes
router.post('/signup',asyncFunction(async (req, res) => {
    // Implement user signup logic
    const username = req.body.username
  const password = req.body.password

  const ifExist = await User.find({ username: username })
  console.log(ifExist)
  if (ifExist.length) {
    res.status(403).send('User Already Exists!!!')
    return
  }
  User.create({
    username,
    password
  })
    .then(() => {
      res.send('user created successfully!!!')
    })
    .catch(err => {
      res.send('Try again later')
    })
}));

router.post('/signin',async (req,res)=>{
  const {username,password} = req.body;
  try {
    const user = await User.findOne({
      username,
      password
    })
    console.log(user)
    if(user){
      const token = jwt.sign(username,jwtPass)
      res.json({
        msg: "Signin success!!!",
        token: token
      })
    }else{
      res.json({
        msg: "user does not exist!!!"
      })
    }
  } catch (error) {
    res.send("something Down")
    console.log(error)
  }
})

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const course = await Course.find({});
  res.status(200).json({
    course
  })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    // if rest api endpoint is this '/courses/:courseId' then hit '/courses/1234'
    // if rest api endpoint is this '/courses/:courseId?' then hit '/courses?courseId:1234'
    
    const courseId = req.params.courseId
    const username = req.headers.username
    //const course = await Course.findOne({_id:courseId})
   
    User.updateOne({username:username},
        {
            $push:{
                purchasedCourses: courseId
            }
        }).then(()=>{
            res.json({
                msg: "Purchase Complete"
            })
        }).catch(err=>console.log(err))
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username
    //console.log(username)
    const user = await User.findOne({username:username})
    //console.log(user)
    //const courseList = user.purchasedCourses.map((x)=> Course.findById({_id:x}))

    const courseList = await Course.find({
        _id:{
            $in: user.purchasedCourses
        }
    })
    console.log(user.purchasedCourses)
    res.json({
        courses:courseList
    })

});

module.exports = router