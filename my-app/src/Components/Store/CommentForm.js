import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStore, addComment } from '../../Redux/storesRedux/storeAction';
import { useParams } from 'react-router-dom';

const CommentForm = () => {
    const {storeId} = useParams()
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.user.userName);
    const [newComment, setNewComment] = useState({
        commentText: '',
        status: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newCommentWithUserName = {
                commentText: newComment.commentText,
                status: newComment.status
            };
            await dispatch(addComment(storeId, newCommentWithUserName));
            setNewComment({
                commentText: '',
                status: ''
            });
            dispatch(fetchStore(storeId));
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setNewComment({
            ...newComment,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div>
            <form>
                <h2>Add Comment</h2>
                <label>User: {loggedInUser}</label><br />
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        name="commentText"
                        className="form-control"
                        value={newComment.commentText}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        className="form-control"
                        value={newComment.status}
                        onChange={handleChange}
                    >
                        <option value="">Select Status</option>
                        <option value="NotRecommended">Not-Recommended</option>
                        <option value="Recommended">Recommended</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default CommentForm