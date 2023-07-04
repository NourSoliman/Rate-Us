import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStore, addComment } from '../../Redux/storesRedux/storeAction';
import { useParams } from 'react-router-dom';
import Male from '../Images/Male.png';
import Female from '../Images/Female.png';
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import { Spinner } from 'react-bootstrap';
const CommentForm = () => {
    const { storeId } = useParams()
    const dispatch = useDispatch();
    // const loggedInUser = useSelector((state) => state.user.userName);
    const loading = useSelector((state)=>state.store.loading)
    const [error, setError] = useState(false)
    const [inputError , setInputError] = useState(false)
    const [newComment, setNewComment] = useState({
        commentText: '',
        status: '',
        links: ``
    });
    //decode gender from token
    const token = Cookies.get(`token`)
    const decodedToken = token ? jwt_decode(token): null
    const gender = decodedToken ? decodedToken.gender : null
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error || inputError || !newComment.commentText || !newComment.status) {
            setInputError(true);
            setError(true);
        return;
        }
        try {
            const newCommentWithUserName = {
                commentText: newComment.commentText,
                status: newComment.status,
                links: newComment.links
            };
            await dispatch(addComment(storeId, newCommentWithUserName));
            setNewComment({
                commentText: '',
                status: '',
                links: ``
            });
            dispatch(fetchStore(storeId));
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === `links`) {
            const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/
            if (!value.match(linkRegex)) {
                setError(true)
            } else {
                setError(false)
            }
        }
        setNewComment({
            ...newComment,
            // [e.target.name]: e.target.value
            [name]: value
        });
    };
    if (loading) {
        return (
          <div className="loading-spinner">
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
            <h2>Logging...</h2>
          </div>
        );
      }
    return (
        <div className='commentFormContainer'>
            <form>
                <br />
                {gender === `male` ? (<img src={Male} alt="male" className='male'/> ) : (<img src={Female} alt="female" className='female'/>)}
                <div className="form-group">
                    <textarea
                        id="comment"
                        name="commentText"
                        className="form-control"
                        placeholder='Write a comment...'
                        value={newComment.commentText}
                        onChange={handleChange}
                    ></textarea>
                    <br />
                    <input type="text" id="link" name="links"
                        className="form-control" value={newComment.links}
                        onChange={handleChange}
                        placeholder="Add Pictures Link here"></input>
                    {error && <p>Please enter a valid Link!</p>}
                </div>
                <br />
                <div className="form-group">
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
                    <br />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default CommentForm