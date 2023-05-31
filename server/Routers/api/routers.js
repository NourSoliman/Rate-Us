const express = require(`express`)
const router = express.Router();

const registerEmail = require(`../../Controllers/nodemailer`)
const {auth } = require(`../../middleware/auth`)
const multer = require('multer');

//Import all controllers
const authController = require(`../../Controllers/userController`)
const storeController = require(`../../Controllers/storeController`)

router.get(`/register`,(req ,res)=>{
    res.send(`yea its register Router`)
})
//POST Methods
router.get(`/stores`,(req,res)=>{
  res.send(`yea its right router`)
})
router.post(`/register` , authController.register , registerEmail  )
router.post(`/login`, authController.verifyUser , authController.login)
router.post(`/stores`,  storeController.addedRoute)
router.post(`/stores/:storeId/comments` , auth, storeController.addComments)
// router.post(`/generateEmail` , nodemailer.registerEmail)
// //GET Methods 
router.get(`/getUser/:userName` , auth, authController.getUser)
router.get(`/stores/:storeId` , auth ,storeController.getStores)
router.get('/stores/:storeId/comments', auth, storeController.getComments);
router.get(`/allStores` , auth , storeController.getAllStores)

router.get(`/logout`, authController.logout)
router.get(`/verify-email`,authController.verifyEmail)
router.get(`/createResetSession`,authController.createResetSession)

// //PUT METHODS
router.put(`/updateUser`, auth ,authController.updateUser)
router.put(`/changePassword/:userName` , authController.changePassword)
router.put(`/stores/update/:storeId`,storeController.updateRoute )
router.put(`/stores/:storeId/comment/:commentId` , storeController.commentIdApi)
module.exports = router
