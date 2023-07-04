const express = require(`express`);
const Store = require(`../models/Stores`);
const Comment = require(`../models/Comments`);
const User = require(`../models/User`);
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
    throw new Error("Failed to update store");
  }
}

//add newStore to DB
async function addStore(name, description, picture, selling) {
  try {
    console.log(name, description);

    const newStore = await Store.create({
      name,
      description,
      picture: picture.toString(),
      selling,
    });
    return newStore;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to add Store`);
  }
}

//route to update store
const updateRoute = async (req, res) => {
  const { storeId } = req.params;
  const { newName, newDescription } = req.body;
  try {
    const updatedStore = await updateStore(storeId, newName, newDescription);
    res.json({ msg: `Store Updated`, store: updatedStore });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: `failed to Update Store` });
  }
};
const addedRoute = async (req, res) => {
  const { name, description, picture, selling } = req.body.formData;

  try {
    const newStore = await addStore(name, description, picture, selling);
    return res.status(200).send({ msg: `new Store Added`, store: newStore });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Failed to add store" });
  }
};

// Route to handle individual store pages
const getStores = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    // const store = await Store.findById(storeId)
    const store = await Store.findById(storeId);
    if (!storeId) {
      return res.status(404).send({ error: `State not found` });
    }
    res.json({ store });
  } catch (error) {
    return res.status(500).send({ error: `server error` });
  }
};
//Get all stores
const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();

    res.json({ stores });
  } catch (error) {
    return res.status(500).send({ error: "Server error" });
  }
};
//Filtering Stores depend on the selling types
const getStoresBySellingTypes = async (req, res) => {
  try {
    const { sellingTypes } = req.params;
    const sellingTypesArray = sellingTypes.split(","); // Split the sellingTypes string into an array
    const sellingArray = sellingTypesArray.map((type) => type);
    const stores = await Store.find({ "selling.type": { $in: sellingArray } }); // Use $in operator to match any selling type in the array
    res.json({ stores });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error. Please Contact Support." });
  }
};
const addComments = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { commentText, status, links } = req.body;
    // const storeObject = await Store.findById(storeId);
    const newComment = new Comment({
      commenter: req.user.userId,
      commentText: commentText,
      store: storeId,
      status: status,
      solvedCase: false,
      links: links,
      commentedAt: new Date(),
      upVotes: [],
      downVotes: [],
    });
    const savedComments = await newComment.save();
    // Update the user's comments array
    const user = await User.findOneAndUpdate(
      { _id: req.user.userId },
      { $push: { comments: savedComments._id } },
      { new: true }
    );
    const commentWithPopulatedUser = await Comment.findById(savedComments._id)
      .populate("commenter")
      .populate({
        path: "store",
        select: "name",
      })
      .populate(`upVotes`)
      .populate(`downVotes`);

    const commentWithUserName = {
      _id: commentWithPopulatedUser._id,
      gender: commentWithPopulatedUser.gender,
      user: commentWithPopulatedUser.commenter.userName,
      commentText: commentWithPopulatedUser.commentText,
      status: commentWithPopulatedUser.status,
    };
    console.log(
      "commentWithPopulatedUser.commenter lol?:",
      commentWithPopulatedUser.commenter.gender
    );

    if (status === "Recommended") {
      await Store.findByIdAndUpdate(storeId, { $inc: { Recommended: 1 } });
    } else if (status === "NotRecommended") {
      await Store.findByIdAndUpdate(storeId, { $inc: { NotRecommended: 1 } });
    }
    if (status === "Solved Case") {
      await Store.findByIdAndUpdate(storeId, {
        $inc: { solvedCases: 1 },
        $dec: { NotRecommended: 1 },
      });
    }
    const store = await Store.findById(storeId).populate("comments");
    // const comments = store.comments;
    const comments = store.comments.map((comment) => ({
      _id: comment._id,
      user: comment.commenter.userName,
      commentText: comment.commentText,
      status: comment.status,
      links: comment.links,
    }));
    res.json({ comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getComments = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { filterStatus } = req.query;
    // Fetch the comments for the store
    let comments = await fetchCommentsFromDatabase(storeId);
    if (filterStatus) {
      comments = comments.filter((comment) => comment.status === filterStatus);
    }
    res.json(comments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error Please contact Support" });
  }
};
const fetchCommentsFromDatabase = async (storeId) => {
  try {
    // Fetch comments for the specified storeId
    const comments = await Comment.find({ store: storeId }).populate(
      "commenter"
    );
    // Return the fetched comments
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch comments from the database");
  }
};
const commentIdApi = async (req, res) => {
  const storeId = req.params.storeId;
  const commentId = req.params.commentId;
  const newStatus = req.body.status;
  console.log(commentId);
  try {
    if (!commentId) {
      console.log(`there's no commentId`);
      return res.status(400).json({ error: "Comment ID is missing" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Update the status of the comment
    comment.status = newStatus;
    await comment.save();

    // Update the store's comment count if necessary
    const store = await Store.findById(storeId);
    if (store) {
      if (newStatus === "Recommended") {
        store.Recommended++;
      } else if (newStatus === "NotRecommended") {
        store.NotRecommended++;
        store.NotRecommended = Math.max(store.NotRecommended + 1, 0);
      } else if (newStatus === "Solved-Case") {
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
    res.status(500).json({ error: "Server error" });
  }
};
const fetchAllUserComments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const comments = await Comment.find({ commenter: userId }).populate(
      `store`
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error` });
  }
};
const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { commentText } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    comment.commentText = commentText;
    comment.edited = true;
    await comment.save();
    const updatedComments = await fetchCommentsFromDatabase(comment.store);
    res.json({ comments: updatedComments });
  } catch (error) {
    res.status(404).json({ error: `Server Error Please contact Support!` });
  }
};
//Delete Comment
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const userRole = req.user.role;
    if (userRole !== `admin`) {
      return res
        .status(500)
        .json({ error: `Only Admin User can Delete Comments!` });
    }
    const comment = await Comment.findById(commentId);
    console.log(`this comment comingfrom node server`, comment);
    if (!comment) {
      return res.status(404).json({ error: `Comment Not Found!` });
    }
    await comment.deleteOne();
    const store = await Store.findById(comment.store);
    if (store) {
      if (comment.status === `Recommended`) {
        store.Recommended--;
      } else if (comment.status === `NotRecommended`) {
        store.NotRecommended--;
      } else if (comment.status === `Sovled-Case`) {
        store.solvedCases--;
      }
      await store.save();
    }
    const updatedComments = await fetchCommentsFromDatabase(comment.store);
    res.json({ comments: updatedComments });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: `Server Error Please Contact Support!` });
  }
};
//upVotes
const upVotes = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.user;
    const comment = await Comment.findById(commentId);
    //check if the user has already upvoted the comment
    if (comment.upVotes.includes(userId)) {
      comment.upVotes.pull(userId);
    } else {
      //check if user has downVoted the comment previously and remove the downvote
      if (comment.downVotes.includes(userId)) {
        comment.downVotes.pull(userId);
      }
      comment.upVotes.push(userId);
    }
    await comment.save();
    res.json({ message: "Comment vote updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Server Error Please Contact Support!` });
  }
};
//downVotes
const downVotes = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.user;
    const comment = await Comment.findById(commentId);
    //check if the user has already downVoted the comment
    if (comment.downVotes.includes(userId)) {
      comment.downVotes.pull(userId);
    } else {
      if (comment.upVotes.includes(userId)) {
        comment.upVotes.pull(userId);
      }
      comment.downVotes.push(userId);
    }
    await comment.save();
    res.json({ message: "Comment vote updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Server Error Please Contact Support!` });
  }
};
const filteringComments = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { filterStatus } = req.query;
    const store = await Store.findById(storeId).populate(`comments`);
    let filteredComments = store.comments;
    if (filteredComments) {
      filteredComments = filteredComments.filter(
        (comment) => comment.status === filterStatus
      );
    }
    const comments = filteredComments.map((comment) => ({
      _id: comment._id,
      user: comment.commenter.userName,
      commentText: comment.commentText,
      status: comment.status,
      links: comment.links,
    }));
    res.json({ comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Server Error Please contact Support` });
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
  fetchAllUserComments,
  editComment,
  deleteComment,
  upVotes,
  downVotes,
  filteringComments,
  getStoresBySellingTypes,
};
