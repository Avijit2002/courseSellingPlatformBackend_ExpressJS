const { User } = require('../db/index')
const {jwtToken} = require('../config')

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token_arr = req.headers.authorization;
    const token = token_arr.split(" ")[1]; // remove Bearer and extract token
  console.log(token)
  try {
    const decoded = jwt.verify(token,jwtToken)
    if(decoded.username){
      req.username = decoded.username // passing data to next middleware
      next()
    }
      
  } catch (error) {
    console.log(error)
    res.status(401).send('Invalid credentials!!!')
  }
}

module.exports = userMiddleware;