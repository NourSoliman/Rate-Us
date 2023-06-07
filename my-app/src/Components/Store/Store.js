import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStore, updateCommentStatus, fetchEditedComments, fetchDeleteComment } from '../../Redux/storesRedux/storeAction';
import like from '../Images/like.png';
import dislike from '../Images/dislike.png';
import Male from '../Images/Male.png';
import Female from '../Images/Female.png';
import StoreDetails from './StoreDetails';
import CommentForm from './CommentForm';
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
const Store = () => {
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.store.comments) || [];
  const loggedInUser = useSelector((state) => state.user.userName);
  // const role = useSelector(state => state.user.role);
  const storeComments = comments.filter((comment) => comment.store === storeId);
  const [editedCommentText, setEditedCommentText] = useState({});
  const [editCommentId, setEditCommentId] = useState(null);
  const [isCommentEdited, setIsCommentEdited] = useState({});
  const token = Cookies.get(`token`)
  const decodedToken = jwt_decode(token);
  const role = decodedToken.role;
  console.log(role, `from React Role`);
  useEffect(() => {
    dispatch(fetchStore(storeId));
  }, [dispatch, storeId]);
  //Changing Status to Solved Case
  const handleSolvedCase = async (commentId) => {
    const confirmed = window.confirm(
      'Are you sure you want to mark this comment as a Solved Case? This action cannot be undone.'
    );
    if (confirmed) {
      try {
        await dispatch(updateCommentStatus(storeId, commentId, 'Solved-Case'));
        dispatch(fetchStore(storeId));
      } catch (error) {
        console.log(error);
      }
    }
  };


  //delete Function

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this comment? This action cannot be undone.'
    )
    if (confirmed) {
      try {
        await dispatch(fetchDeleteComment(commentId, storeId))
        await dispatch(fetchStore(storeId));
      } catch (error) {
        console.log(error);
      }
    }
  }
  //Edit comments Functions
  const handleSaveEdit = async (commentId) => {
    try {
      await dispatch(fetchEditedComments(storeId, commentId, editedCommentText[commentId]));
      await dispatch(fetchStore(storeId));
      setIsCommentEdited((prevState) => ({
        ...prevState,
        [commentId]: true,
      }));
      setEditCommentId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const isCommentEditable = (comment) => {
    return (
      comment.commenter.userName === loggedInUser &&
      !comment.edited && // Check if the comment is not edited
      comment.status !== 'Solved-Case' &&
      editCommentId === comment._id
    );
  };


  return (
    <div>
      <StoreDetails />
      <h2>Comments</h2>
      {storeComments && storeComments.length > 0 ? (
        <ul className="list-group">
          {storeComments.map((comment) => (
            <li
              key={comment._id}
              className={`list-group-item ${comment.status === 'NotRecommended' ? 'list-group-item-danger' : 'list-group-item-success'}`}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {comment.status === 'NotRecommended' ? (
                <img src={dislike} alt="NotRecommended" style={{ width: '20px', marginRight: '10px' }} />
              ) : (
                <img src={like} alt="Positive" style={{ width: '20px', marginRight: '10px' }} />
              )}
              {comment.commenter.gender === 'male' ? (
                <img src={Male} alt="male" style={{ width: '50px' }} />
              ) : (
                <img src={Female} alt="female" style={{ width: '50px' }} />
              )}
              <div>
                <strong>Status:</strong> {comment.status} <br />
                <strong>User:</strong> {comment.commenter && comment.commenter.userName}
                <br />
                <strong>Comment:</strong>{' '}
                {comment.status === 'Solved-Case' ? (
                  <del>{comment.commentText}</del>
                ) : (
                  comment.commentText
                )}
                {comment.edited && <span>(Edited)</span>}
              </div>
              {isCommentEditable(comment) ? (
                <div>
                  <input
                    type="text"
                    value={editedCommentText[comment._id] || ''}
                    onChange={(e) =>
                      setEditedCommentText((prevState) => ({
                        ...prevState,
                        [comment._id]: e.target.value,
                      }))
                    }
                  />
                  <button onClick={() => handleSaveEdit(comment._id)}>Submit</button>
                </div>
              ) : (
                !isCommentEdited[comment._id] &&
                comment.commenter.userName === loggedInUser &&
                comment.status !== 'Solved-Case' &&
                !comment.edited && (
                  <div>
                    <button className="btn btn-primary" onClick={() => setEditCommentId(comment._id)}>
                      Edit
                    </button>
                  </div>
                )
              )}
              {comment.status === 'NotRecommended' && comment.commenter.userName === loggedInUser && (
                <button className="btn btn-primary" onClick={() => handleSolvedCase(comment._id)}>
                  Solved?
                </button>
              )}
              {role === `admin` && (<button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
      <CommentForm />
    </div>
  );
};

export default Store;
