import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spinner, Col, Row } from "react-bootstrap";
import { GET_USER_SUCCESS } from "../../Redux/actions/types";
import { fetchUserComments } from "../../Redux/storesRedux/storeAction";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { Button, Typography, Box } from "@mui/material";
import {
  AddCircle,
  AccountCircle,
  CheckCircle,
  Email,
  Lock,
  CalendarToday,
} from "@mui/icons-material";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import ReactPaginate from "react-paginate";
const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName } = useParams();
  const user = useSelector((state) => state.user.user);
  const comments = useSelector((state) => state.store.comments) || [];
  const profileDetails = useSelector((state) => state.profile.profileDetails);
  const profileComments = useSelector((state) => state.profile.profileComments);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedComments, setExpandedComments] = useState([]);
  const commentsPerPage = 6;
  console.log(userName);
  //Decode data from Token
  const token = Cookies.get(`token`);
  const decodedToken = token ? jwt_decode(token) : null;
  const role = decodedToken ? decodedToken.role : null;
  const email = decodedToken ? decodedToken.email : null;
  const age = decodedToken? decodedToken.age : null;

  useEffect(() => {
    if (!token) {
      navigate(`/login`);
      return;
    }
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      dispatch({ type: GET_USER_SUCCESS, payload: parsedUserData });
      setLoading(false);
    } else {
      if (userName) {
        dispatch(userData(userName)).then(() => {
          setLoading(false);
        });
      }
    }
    dispatch(fetchUserComments());
  }, [dispatch, userName, token, navigate]);

  console.log(comments, ` from dashBoard`);
  // const renderGenderPicture = () => {
  //   if (user && user.gender === `female`) {
  //     return (
  //       <Avatar
  //         src={Female}
  //         alt="female"
  //         className="dashboard-picture"
  //       ></Avatar>
  //     );
  //   } else if (user && user.gender === `male`) {
  //     return (
  //       <Avatar src={Male} alt="male" className="dashboard-picture"></Avatar>
  //     );
  //   }
  // };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
        <h2>Getting User Data</h2>
      </div>
    );
  }

/*Show more*/
const handleToggleComment = (commentId) => {
  setExpandedComments((prevExpandedComments) => {
    if (prevExpandedComments.includes(commentId)) {
      return prevExpandedComments.filter((id) => id !== commentId);
    } else {
      return [...prevExpandedComments, commentId];
    }
  });
}; 
  //Render comments
  const renderCommentText = (comment) => {
    if (comment.commentText.length > 100) {
      if (expandedComments.includes(comment._id)) {
        return (
          <span>
            {comment.commentText.split("\n").map((line, index) => (
              <Fragment key={index}>{line}<br /></Fragment>
            ))}
          </span>
        );
      } else {
        const truncatedText = `${comment.commentText.slice(0, 100)}...`;
        return (
          <span>
            {truncatedText.split("\n").map((line, index) => (
              <Fragment key={index}>{line}<br /></Fragment>
            ))}
          </span>
        );
      }
    } else {
      return (
        <span>
          {comment.commentText.split("\n").map((line, index) => (
            <Fragment key={index}>{line}<br /></Fragment>
          ))}
        </span>
      );
    }
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
  const pageCount = Math.ceil(comments.length / commentsPerPage);
  const startIndex = currentPage * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const visibleComments = comments.slice(startIndex , endIndex)
  
  ///React Paginate
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  
  return (
    <Row className="dashboard-Container">
      {user && profileDetails && (
        <Row className="dashboard-row">
          <Col className="main-left-column" lg={8}>
            <Box>
              <div className="dashboard-info">
                <Typography variant="h5">Dashboard</Typography>
                <div>
                  <label className="label">Verified?</label>
                  {user.verified ? (
                    <div className="details-container">
                      <span className="verified-text">Verified User</span>
                      <CheckCircle
                        fontSize="small"
                        style={{ color: `#0d6efd` }}
                      />
                    </div>
                  ) : (
                    "Not Verified User"
                  )}
                </div>
                <label className="label">Role</label>
                <div className="details-container">
                  <span className="verified-text">{role}</span>
                  <AccountCircle
                    fontSize="small"
                    style={{ color: `#0d6efd` }}
                  />
                </div>
                <label className="label">Username:</label>
                <div className="details-container">
                  <span className="verified-text">{user.userName}</span>
                  <AccountCircle
                    fontSize="small"
                    style={{ color: `#0d6efd` }}
                  />
                </div>

                <label className="label">Email</label>
                <div className="details-container">
                  <span className="verified-text">{email}</span>
                  <Email fontSize="small" style={{ color: `#0d6efd` }} />
                </div>
                <label className="label">Age</label>
                <div className="details-container">
                  <span className="verified-text">{age ? age : ``}</span>

                </div>
                <label className="label">Password</label>
                <div className="password-container">
                  <span className="password-label">Password: *****</span>
                  <NavLink
                    to={`/changePassword/${userName}`}
                    className="change-password-link"
                  >
                    <Lock fontSize="small" />
                  </NavLink>
                </div>
                <div className="card-text">
                  <span className="creation-date">Creation Date:</span>{" "}
                  <span className="creation-date">
                    {formatDate(user.creationDate)}
                  </span>{" "}
                  <CalendarToday
                    fontSize="small"
                    style={{ color: `#0d6efd` }}
                  />
                </div>
              </div>
              <div>
                {role === `admin` && (
                  <NavLink to="/addStore">
                    <Button color="inherit" startIcon={<AddCircle />}>
                      Add Store
                    </Button>
                  </NavLink>
                )}
              </div>
            </Box>
          </Col>
        </Row>
      )}
      {profileComments && (
        <div className="dashboard-Comments">
          {comments && comments.length > 0 ? (
            <div>
              {visibleComments.map((comment, index) => (
                <div key={comment._id} className="comments-li">
                  <div className="dashboard-comment-text">
                    <span className="comment-text">Comment Text:</span>{" "}
                    {/* {comment.commentText} {" "} */}
                    {renderCommentText(comment)}
                  </div>
                  {comment.commentText.length > 100 && !comment.showMore && (
                  <div>
                    <Button onClick={() => handleToggleComment(comment._id)}>
                      {expandedComments.includes(comment._id)
                        ? "Show Less"
                        : "Show More"}
                    </Button>
                  </div>
                )}
                  <div>
                    {comment.links ? (
                      <div>
                        <span className="comment-links">Links:</span>{" "}
                        <NavLink to={comment.links} target="_blank" className="dashboard-comments-link">
                        {comment.links}
                        </NavLink>
                        </div>
                    ):``}
                  </div>
                  {comment.store ? (
                    <div>
                      <span className="comments-store-name">Store Name:</span>
                    <NavLink to={`/stores/${comment.store._id}`}>
                      <span className="commentStoreName">
                        {comment.store.name}
                      </span>
                    </NavLink>
                    </div>
                  ) : (
                    <div>
                      <span className="comments-store-name">Store Name:</span>
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
            <h2 className="no-comments-h2">No Comments Yet...</h2>
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
        marginPagesDisplayed={0}
        pageRangeDisplayed={3}
        containerClassName="pagination-container"
      />
      )}
        </div>
      )}
    </Row>
  );
};

export default DashBoard;
