const express = require(`express`)
const Store = require(`../models/Stores`)
const Comment = require(`../models/Comments`)


//function to update exist Store

async function updateStore(storeId, newName, newDescription) {
    try {
      const updatedStore = await Store.findByIdAndUpdate(
        storeId,
        {
          name: newName,
          description: newDescription,
        },
        { new: true }
      );
      return updatedStore;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update store');
    }
  }

//add newStore to DB
async function addStore(  name , description , picture ){
    try{
      console.log(name, description)
      
      const newStore = await Store.create({
        name,
        description,
        picture:picture.toString()
    })
    return newStore
    }catch (error){
        console.log(error);
        throw new Error(`Failed to add Store`)
    }
}

//route to update store
const updateRoute = async (req, res) =>{
    const {storeId} = req.params;
    const {newName , newDescription  } = req.body
    try{
        const updatedStore = await updateStore(storeId , newName , newDescription)
        res.json({msg:`Store Updated` , store:updatedStore})
    }catch(error){
        console.log(error)
        return res.status(500).send({error:`failed to Update Store`})
    }
}
const addedRoute = async(req, res) => {
  const { name, description, picture } = req.body.formData;

    try{
        const newStore = await addStore(name , description , picture)
        return res.status(200).send({msg:`new Store Added`, store:newStore})
    }catch(error) {
        console.log(error);
        return res.status(500).send({ error: 'Failed to add store' });
    }
}



// Route to handle individual store pages
const getStores = async(req, res) =>{
    try{
        const storeId = req.params.storeId
        // const store = await Store.findById(storeId)
        const store = await Store.findById(storeId)
        if(!storeId){
            return res.status(404).send({error:`State not found`})
        }
        res.json({store})
    }catch(error) {
        return res.status(500).send({error:`server error`})
    }
}
//Get all stores
const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();

    res.json({ stores });
  } catch (error) {
    return res.status(500).send({ error: 'Server error' });
  }
};

const addComments = async(req,res) =>{
    try{
        const { storeId } = req.params;
        const {  commentText,  status } = req.body;
        const newComment = new Comment({
            commenter:req.user.userId,
            commentText: commentText,
            store: storeId,
            status:status,
            solvedCase:false,
          });
          const savedComments = await newComment.save()
          const commentWithPopulatedUser = await Comment.findById(savedComments._id).populate('commenter');

          const commentWithUserName = {
            _id: commentWithPopulatedUser._id,
            gender:commentWithPopulatedUser.gender,
            user:  commentWithPopulatedUser.commenter.userName,
            commentText: commentWithPopulatedUser.commentText,
            status: commentWithPopulatedUser.status,
          };
          console.log('commentWithPopulatedUser.commenter lol?:', commentWithPopulatedUser.commenter.gender);

          if (status === 'Recommended') {
            await Store.findByIdAndUpdate(storeId, { $inc: { Recommended: 1 } });
          } else if (status === 'NotRecommended') {
            await Store.findByIdAndUpdate(storeId, { $inc: { NotRecommended: 1 } });
          }
          if (status === 'Solved Case') {
            await Store.findByIdAndUpdate(storeId, { $inc: { solvedCases: 1 }, $dec: { NotRecommended: 1 } });
          }
          const store = await Store.findById(storeId).populate('comments');
          // const comments = store.comments;
          const comments = store.comments.map((comment) => ({
            _id: comment._id,
            user: comment.commenter.userName,
            commentText: comment.commentText,
            status: comment.status,
          }));
          res.json({ comments });

        }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}
const getComments = async(req,res) => {
    try {
        // Fetch the comments for the store
        const comments = await fetchCommentsFromDatabase(req.params.storeId);
            res.json(comments);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
const fetchCommentsFromDatabase = async (storeId) => {
    try {
      // Fetch comments for the specified storeId
      const comments = await Comment.find({ store: storeId }).populate('commenter');
      // Return the fetched comments
      return comments;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch comments from the database');
    }
  }
  const commentIdApi = async (req, res) => {
    const storeId = req.params.storeId;
    const commentId = req.params.commentId;
    const newStatus = req.body.status;
    console.log(commentId);
    try {
      if (!commentId) {
        console.log(`there's no commentId`);
        return res.status(400).json({ error: 'Comment ID is missing' });
      }
      
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Update the status of the comment
      comment.status = newStatus;
      await comment.save();
  
      // Update the store's comment count if necessary
      const store = await Store.findById(storeId);
      if (store) {
        if (newStatus === 'Recommended') {
          store.Recommended++;
        } else if (newStatus === 'NotRecommended') {
          store.NotRecommended++;
          store.NotRecommended = Math.max(store.NotRecommended + 1, 0);
        } else if (newStatus === 'Solved-Case') {
          store.solvedCases++;
          store.NotRecommended = Math.max(store.NotRecommended - 1, 0);
        }
        await store.save();
      }
  
      // Fetch the updated comments for the store
      const updatedComments = await fetchCommentsFromDatabase(storeId);
      
      res.json({ comments: updatedComments });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
module.exports = {
    updateRoute,
    addedRoute,
    getStores,
    addComments,
    getComments,
    commentIdApi,
    getAllStores,
}