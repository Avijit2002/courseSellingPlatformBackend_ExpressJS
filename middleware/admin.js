// Middleware for handling auth
const { Admin } = require('../db/index')
const jwt = require('jsonwebtoken')
const {jwtToken} = require('../config')

function adminMiddleware (req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token_arr = req.headers.authorization;
  const token = token_arr.split(" ")[1]; // remove Bearer
  try {
    const decoded = jwt.verify(token,jwtToken)
    if(decoded.username)
      next()
  } catch (error) {
    console.log(error)
    res.status(403).send('Invalid credentials!!!')
  }
}

module.exports = adminMiddleware
