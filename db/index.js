const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://avijitram2013:YRdhe4IESbIOgxW4@cluster0.antuern.mongodb.net/courseSellingPlatform?useNewUrlParser=true&useUnifiedTopology=true')
.then(console.log("Connected to DB"))
.catch(err=>{
    console.log(err)
})

// Define schemas
const AdminSchema = new mongoose.Schema({
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
    purchasedCourses:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
    price: Number,
    imageLink:String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}