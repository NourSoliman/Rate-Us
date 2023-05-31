const jwt = require('jsonwebtoken');
const User = require(`../models/User`)
const auth = async(req, res , next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = await jwt.verify(token , process.env.JWT_SECRET)
    req.user = decoded
    console.log('req.user:', req.user);
    // res.json(decoded)
    next()
  }catch(error) {

     res.status(401).json({error:`Authentication Failed`})
  }
}
// const localVariable = (req , res , next) => {
//   req.app.locals = {
//     OTP :null,
//     resetSession:false
//   }
//   next()
// }
module.exports =  {
  auth,

}