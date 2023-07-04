import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchStore, fetchUpVotes, fetchDownVotes } from '../../Redux/storesRedux/storeAction';
import { Grid, Button, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Votes = ({ comment, storeId }) => {
    const dispatch = useDispatch();

    const handleUpVotesComments = async (commentId) => {
        await dispatch(fetchUpVotes(commentId));
        dispatch(fetchStore(storeId));
    };

    const handleDownVotesComments = async (commentId) => {
        await dispatch(fetchDownVotes(commentId));
        dispatch(fetchStore(storeId));
    };

    return (
        <div >
        <Grid container alignItems="center" className="votes-container">
            <Typography variant="body1" component="p" color="textSecondary" sx={{ mr: 1 }} className="commented-at">
            Find this comment Helpful?
            </Typography>
            <Grid item>
                <Typography variant="body1" component="p">{comment.upVotes ? comment.upVotes.length : 0}</Typography>
            </Grid>
            <Grid item>
                <Button size="small" onClick={() => handleUpVotesComments(comment._id)}>
                    <ThumbUpIcon fontSize="small" />
                </Button>
            </Grid>
            <Grid item>
                <Typography variant="body1" component="p">{comment.downVotes ? comment.downVotes.length : 0}</Typography>
            </Grid>
            <Grid item>
                <Button size="small" onClick={() => handleDownVotesComments(comment._id)}>
                    <ThumbDownIcon fontSize="small" />
                </Button>
            </Grid>
        </Grid>
        </div>
    );
};

export default Votes;
