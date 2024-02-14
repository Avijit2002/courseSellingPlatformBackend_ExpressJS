const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const mongoose = require("mongoose")

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use("/admin", adminRouter)
app.use("/user", userRouter)

app.use((err,req,res,next)=>{
    res.send({
        message: err.message
    })
})

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
