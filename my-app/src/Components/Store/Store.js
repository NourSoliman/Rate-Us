import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import {
  fetchStore,
  updateCommentStatus,
  fetchEditedComments,
  fetchDeleteComment,
} from "../../Redux/storesRedux/storeAction";
import Male from "../Images/Male.png";
import Female from "../Images/Female.png";
import CommentForm from "./CommentForm";
import { NavLink , useNavigate } from "react-router-dom";
import DeleteConfirmation from "./DeleteConfirmation";
import SolvedCaseConfirmation from "./SolvedCaseConfirmation";
import Votes from "./Votes";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import "./Store.css";
import "./media.css";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import { Edit, ThumbUpAlt, Delete } from "@mui/icons-material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import ReactPaginate from "react-paginate";
import AOS from "aos";
const Store = () => {
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comments = useSelector((state) => state.store.comments) || [];
  const loggedInUser = useSelector((state) => state.user.userName);
  const loading = useSelector((state)=>state.store.loading)
  const storeComments = comments.filter((comment) => comment.store === storeId);
  const [editedCommentText, setEditedCommentText] = useState({});
  const [editCommentId, setEditCommentId] = useState(null);
  const [isCommentEdited, setIsCommentEdited] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showSolvedConfirmation, setShowSolvedConfirmation] = useState(false);
  const [commentToSolve, setCommentToSolve] = useState(null);
  const [initialCommentsToShow, setInitialCommentsToShow] = useState(5);
  const [expandedComments, setExpandedComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const commentsPerPage = 3;

  //handlePage
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const token = Cookies.get(`token`);
  const decodedToken = token ? jwt_decode(token): null
  const role = decodedToken ? decodedToken.role : null
  console.log(role, `from React Role`);
  useEffect(() => {
    if(!token){
      navigate(`/login`)
    }
    dispatch(fetchStore(storeId));
  }, [dispatch, storeId , token , navigate ]);

  useEffect(() => {
    AOS.init({ duration: 800, offset: 200 });
  }, []);

  const handleSolvedCase = async (commentId) => {
    setShowSolvedConfirmation(true);
    setCommentToSolve(commentId);
  };
  const handleSolvedCaseConfirmation = async () => {
    try {
      await dispatch(
        updateCommentStatus(storeId, commentToSolve, `Solved-Case`)
      );
      await dispatch(fetchStore(storeId));
    } catch (error) {
      console.log(error);
    }
    setShowSolvedConfirmation(false);
  };

  //Edit comments Functions
  const handleDeleteComment = (commentId) => {
    setShowConfirmation(true);
    setCommentToDelete(commentId);
  };
  const handleCommentConfirmation = async () => {
    try {
      await dispatch(fetchDeleteComment(commentToDelete, storeId));
      await dispatch(fetchStore(storeId));
    } catch (error) {
      console.log(error);
    }
    setShowConfirmation(false);
  };
  const handleSaveEdit = async (commentId) => {
    try {
      await dispatch(
        fetchEditedComments(storeId, commentId, editedCommentText[commentId])
      );
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
          <div className="comment-text-store" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            {comment.commentText.split("\n").map((line, index) => (
              <Fragment key={index}>{line}<br /></Fragment>
            ))}
          </div>
        );
      } else {
        const truncatedText = `${comment.commentText.slice(0, 100)}...`;
        return (
          <div className="comment-text-store" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            {truncatedText.split("\n").map((line, index) => (
              <Fragment key={index}>{line}<br /></Fragment>
            ))}
          </div>
        );
      }
    } else {
      return (
        <div className="comment-text-store" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          {comment.commentText.split("\n").map((line, index) => (
            <Fragment key={index}>{line}<br /></Fragment>
          ))}
        </div>
      );
    }
  };
  

  const handleCancelEdit = (commentId) => {
    setEditCommentId(null);
    setEditedCommentText((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[commentId];
      return updatedState;
    });
  };

  const isCommentEditable = (comment) => {
    return (
      comment.commenter.userName === loggedInUser &&
      // !comment.edited &&
      comment.status !== "Solved-Case" &&
      editCommentId === comment._id
    );
  };

  //Show new comment on the top of comments
  // const reversedStoreComments = [...storeComments].reverse();

  const reversedStoreComments = [...storeComments]
    .reverse()
    .slice(0, initialCommentsToShow);
  // Modify the rendering logic
  const pageCount = Math.ceil(reversedStoreComments.length / commentsPerPage);
  const startIndex = currentPage * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const commentsToDisplay = reversedStoreComments.slice(startIndex, endIndex);
  //added Paginate instead of load more comments
  // const handleLoadMoreComments = () => {
  //   setInitialCommentsToShow((prevCount) => prevCount + commentsToLoad);
  // };
  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <Fragment>
      <h2 className="comments-header">Comments</h2>
      {commentsToDisplay && commentsToDisplay.length > 0 && (
        <Grid container spacing={2} alignItems="center">
          {commentsToDisplay.map((comment) => (
            <Grid item xs={12} key={comment._id}>
              <Card data-aos="fade-up" className="comment-container">
                <CardContent>
                  <Grid container alignItems="center">
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        component="p"
                        style={{
                          textAlign: "center",
                          color:
                            comment.status === `NotRecommended`
                              ? `#e74c3c`
                              : `green`,
                        }}
                        className="comment-Status"
                      >
                        {comment.status}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Avatar>
                        {comment.commenter.gender === "male" ? (
                          <img
                            src={Male}
                            alt="male"
                            style={{ width: "50px" }}
                          />
                        ) : (
                          <img
                            src={Female}
                            alt="female"
                            style={{ width: "50px" }}
                          />
                        )}
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">
                        <NavLink to={`/users/${comment.commenter.userName}/profile`}>
                        {comment.commenter.userName}
                        </NavLink>
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="commented-at">
                        Commented At:{" "}
                        {new Date(comment.commentedAt).toLocaleDateString(
                          "en-US",
                          { day: "numeric", month: "short" }
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                {/* <CardContent>
                  <Typography variant="body1" component="div">
                    {comment.status === 'Solved-Case' ? (
                      <del>{comment.commentText}</del>
                    ) : (
                      comment.commentText
                    )}
                    {comment.edited && <span>(Edited)</span>}
                  </Typography>
                </CardContent> */}
                {/* <CardContent>
                  <Typography variant="body1" component="div">
                    {comment.status === 'Solved-Case' ? (
                      <del>{comment.commentText}</del>
                    ) : (
                      comment.commentText.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                      ))
                    )}
                    {comment.edited && <span>(Edited)</span>}
                  </Typography>
                </CardContent> */}
                <CardContent>
                  <Typography variant="body1" component="div" className="comment-store-container">
                    {renderCommentText(comment)}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="body1" component="p">
                    {comment.links && (
                      <div className="pictures-link-store">
                        Pictures:
                        <NavLink to={comment.links} target="_blank">
                          {comment.links}
                        </NavLink>
                      </div>
                    )}
                  </Typography>
                </CardContent>
                {comment.commentText.length > 100 && !comment.showMore && (
                  <CardActions>
                    <Button onClick={() => handleToggleComment(comment._id)}>
                      {expandedComments.includes(comment._id)
                        ? "Show Less"
                        : "Show More"}
                    </Button>
                  </CardActions>
                )}
                <CardActions>
                  {isCommentEditable(comment) ? (
                    <div>
                      <TextareaAutosize
                        rows={3}
                        placeholder="Edit your comment..."
                        value={
                          editedCommentText[comment._id] || comment.commentText
                        }
                        onChange={(e) =>
                          setEditedCommentText((prevState) => ({
                            ...prevState,
                            [comment._id]: e.target.value,
                          }))
                        }
                      />
                      <Button onClick={() => handleSaveEdit(comment._id)}>
                        Submit
                      </Button>
                      <Button onClick={() => handleCancelEdit(comment._id)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    comment.status !== "Solved-Case" && (
                      <Button
                        startIcon={<Edit />}
                        onClick={() => {
                          setEditCommentId(comment._id);
                          setEditedCommentText((prevState) => ({
                            ...prevState,
                            [comment._id]: comment.commentText,
                          }));
                        }}
                      >
                        Edit
                      </Button>
                    )
                  )}
                  {comment.status === "NotRecommended" &&
                    comment.commenter.userName === loggedInUser && (
                      <Button
                        startIcon={<ThumbUpAlt />}
                        onClick={() => handleSolvedCase(comment._id)}
                      >
                        Solved?
                      </Button>
                    )}
                  {role === "admin" && (
                    <Button
                      startIcon={<Delete />}
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      Delete
                    </Button>
                  )}
                </CardActions>
                <CardActions>
                  <Grid item xs={12}>
                    <Votes comment={comment} storeId={storeId} />
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {comments.length > 3 && (
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
      <DeleteConfirmation
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        handleCommentConfirmation={handleCommentConfirmation}
      />
      <SolvedCaseConfirmation
        showSolvedConfirmation={showSolvedConfirmation}
        setShowSolvedConfirmation={setShowSolvedConfirmation}
        handleSolvedCaseConfirmation={handleSolvedCaseConfirmation}
      />
      <h1 className="comments-header">Add A Comment</h1>
      <CommentForm
        comments={comments}
        storeComments={storeComments}
        reversedStoreComments={reversedStoreComments}
      />
    </Fragment>
  );
};

export default Store;
