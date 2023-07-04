const express = require(`express`);
const router = express.Router();
const registerEmail = require(`../../Controllers/nodemailer`);
const { auth } = require(`../../middleware/auth`);
const multer = require("multer");

//Import all controllers
const authController = require(`../../Controllers/userController`);
const storeController = require(`../../Controllers/storeController`);

router.get(`/register`, (req, res) => {
  res.send(`yea its register Router`);
});
//POST Methods
router.post(`/register`, authController.register, registerEmail);
router.post(`/login`, authController.verifyUser, authController.login);
router.post(`/stores`, storeController.addedRoute);
router.post(`/stores/:storeId/comments`, auth, storeController.addComments);

// //GET Methods
router.get(`/getUser/:userName`, auth, authController.getUser);
router.get(`/stores/:storeId`, auth, storeController.getStores);
router.get("/stores/:storeId/comments", auth, storeController.getComments);
router.get(`/allStores`, storeController.getAllStores);
router.get(`/userComments`, auth, storeController.fetchAllUserComments);
router.get(`/logout`, authController.logout);
router.get(`/verify-email`, authController.verifyEmail);
router.get(`/createResetSession`, authController.createResetSession);
router.get(
  `/stores/selling/:sellingTypes`,
  auth,
  storeController.getStoresBySellingTypes
);
router.get(`/users/:userName/profile`, auth, authController.getUserProfile);
//PUT METHODS
//update User
router.put(`/updateUser`, auth, authController.updateUser);
//Change Password
router.put(`/changePassword/:userName`, authController.changePassword);
//Update Store Id
router.put(`/stores/update/:storeId`, storeController.updateRoute);
//add comment
router.put(`/stores/:storeId/comment/:commentId`, storeController.commentIdApi);
router.put(`/stores/comments/:commentId`, auth, storeController.editComment);
//upvotes and downVotes
router.put(`/stores/upvotes/:commentId`, auth, storeController.upVotes);
router.put(`/stores/downvotes/:commentId`, auth, storeController.downVotes);

//DeleteRouter
router.delete(
  `/stores/comments/:commentId`,
  auth,
  storeController.deleteComment
);

module.exports = router;
