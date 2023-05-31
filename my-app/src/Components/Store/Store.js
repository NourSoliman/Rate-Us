import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStore,  updateCommentStatus } from '../../Redux/storesRedux/storeAction';
import like from '../Images/like.png';
import dislike from '../Images/dislike.png';
import Male from '../Images/Male.png'
import Female from '../Images/Female.png'
import StoreDetails from './StoreDetails'
import CommentForm from './CommentForm';
const Store = () => {
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.store.comments) || [];
  const loggedInUser = useSelector((state) => state.user.userName);
  const storeComments = comments.filter((comment) => comment.store === storeId);


  useEffect(() => {
    dispatch(fetchStore(storeId));
  }, [dispatch, storeId]);

  const handleSolvedCase = async (commentId) => {
    const confirmed = window.confirm(
      'Are you sure you want to mark this comment as a Solved Case? This action cannot be undone.'
    );

    if (confirmed) {
      try {
        await dispatch(updateCommentStatus(storeId, commentId, 'Solved-Case'));
        dispatch(fetchStore(storeId));
        console.log('Clicked');
        console.log(storeId);
        console.log('commentIdnOUR', commentId);
      } catch (error) {
        console.log(error);
      }
    }
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
              style={{ display: 'flex', alignItems: 'center' }}>
              {comment.status === 'NotRecommended' ? (
                <img src={dislike} alt="NotRecommended" style={{ width: '20px', marginRight: '10px' }} />
              ) : (
                <img src={like} alt="Positive" style={{ width: '20px', marginRight: '10px' }} />
              )}
              {comment.commenter.gender === `male` ? (
                <img src={Male} alt="male" style={{ width: `50px` }} />
              ) : <img src={Female} alt="female" style={{ width: `50px` }} />}
              <div>
                <strong>Status:</strong> {comment.status} <br />
                <strong>User:</strong> {comment.commenter && comment.commenter.userName}<br />
                <strong>Comment:</strong> {
                  comment.status === `Solved-Case` ? (
                    <del>{comment.commentText}</del>
                  ) : (
                    comment.commentText
                  )
                }
                <br />
                {comment.commenter.userName === loggedInUser && comment.status === 'NotRecommended' && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSolvedCase(comment._id)}>
                    Solved?
                  </button>
                )}
              </div>
              <br />
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
