import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, NavLink } from "react-router-dom";
import { fetchProfileComments } from "../../Redux/actions/actions";
import { useSelector , useDispatch } from "react-redux";
import Male from '../Images/Male.png'
import Female from '../Images/Female.png'
import ReactPaginate from "react-paginate";
import './profile.css'
import Cookies from "js-cookie";
import {   Container } from "react-bootstrap";
import { Bars } from  'react-loader-spinner'

const ProfilePage = () => {
  const { userName } = useParams();
  const comments = useSelector((state) => state.user.comments);
  const age = useSelector((state) => state.user.age);
  const isLoading = useSelector((state)=> state.user.isLoading)
  const commentCount = useSelector((state) => state.user.commentCount);
  const gender = useSelector((state) => state.user.gender);
  const creationDate = useSelector((state)=>state.user.creationDate)
  const [currentPage, setCurrentPage] = useState(0);
  const commentsPerPage = 6;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = Cookies.get(`token`)

useEffect(()=>{
  if(!token){
    navigate(`/login`)
  }
    dispatch(fetchProfileComments(userName))
},[dispatch , userName , token , navigate])


  const renderGenderPicture = () => {
    if (gender === `female`) {
      return (
        <img
          src={Female}
          alt="female"
          className="profile-picture"
        ></img>
      );
    } else if (gender === `male`) {
      return (
        <img src={Male} alt="male" className="profile-picture"></img>
      );
      
    }
    
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const pageCount = Math.ceil(comments.length / commentsPerPage);
  const startIndex = currentPage * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const visibleComments = comments.slice(startIndex , endIndex)
  ///React Paginate
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  //class function
  function getStatusColor(status) {
    if (status === "NotRecommended") {
      return "status-not-recommended";
    } else if (status === "Recommended" || status === "Solved-Case") {
      return "status-recommended";
    } else {
      return "";
    }
  }
  if (isLoading) {
    return (
      <div className="loading-spinner">
        <Bars
          color="#18122B"
          height="80"
          width="80"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <h2 className="loading">Loading...</h2>
      </div>
    );
  }
  return (
    <div className="profile-container-div">
      {/* <NavBar /> */}
      <Container>
      <div className="profile-container">
        <div className="profile-left">
          {renderGenderPicture()}
        </div>
        <div className="profile-right">
          <p>{userName}</p>
          <div className="profile-info">
            <div className="profile-info-item">
              <p>Age: {age}</p>
            </div>
            <div className="profile-info-item">
              <p>Comments Count: {commentCount}</p>
            </div>
            <div className="profile-creation-date">
            creationDate: {formatDate(creationDate)}
            </div>
          </div>
        </div>
      </div>
      <div>
          <h3 className="profile-comments">Comments</h3>
      </div>
      {comments && comments.length > 0 ? (
            <div>
              {visibleComments.map((comment, index) => (
                <div key={comment._id} className="comments-li">
                  <div className="dashboard-comment-text">
                    <span>Comment Text:</span>{" "}
                    {comment.commentText} {" "}
                  </div>
                  <div>
                    {comment.links ? (
                      <div>
                        <span>Links:</span>{" "}
                        <NavLink to={comment.links} target="_blank">
                        {comment.links}
                        </NavLink>
                        </div>
                    ):``}
                  </div>
                  {comment.store ? (
                    <div>
                      <span>Store Name:</span>
                    <NavLink to={`/stores/${comment.store._id}`}>
                      <span className="commentStoreName">
                        {comment.store.name}
                      </span>
                    </NavLink>
                    </div>
                  ) : (
                    <div>
                      <span>Store Name:</span>
                      <span className="deleted">This store has been deleted</span>
                      </div>
                  )}{" "}
                  <div
                    className={`storeComment-status ${getStatusColor(
                      comment.status
                    )}`}
                  >
                    <span className="comment-status-text">Comment Status:</span>{" "}
                    {comment.status}
                  </div>{" "}
                  <div className="commented-at-dashboard">
                  Commented At:{" "}
                        {new Date(comment.commentedAt).toLocaleDateString(
                          "en-US",
                          { day: "numeric", month: "short" }
                        )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No Comments Yet...</p>
          )}
      {comments.length > 6 && (
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageChange}
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"pagination-break"}
          pageClassName={"pagination-page"}
          previousClassName={"pagination-previous"}
          nextClassName={"pagination-next"}
          disabledClassName={"pagination-disabled"}
          activeClassName={"pagination-active"}
          containerClassName={"pagination-container"}
        />
      )}
      </Container>
    </div>
  );
};

export default ProfilePage;
