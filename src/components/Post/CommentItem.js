import React from 'react';
import moment from 'moment';
import { IconButton, Typography } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

export default function CommentItem({ comment, onDeleteComment, author }) {
  const handleDelete = () => {
    onDeleteComment(comment._id);
  };

  //check
  const commentOwner = CommentItem.author === author;

  return (
    <div style={{ borderBottom: "1px solid #ddd" }}>
      <div style={{ display: "flex" }}>
        <Typography variant="h6" style={{ fontSize: "13px", marginRight: "20px" }}>
          {comment.author} 
        {commentOwner && (
            <IconButton onClick={handleDelete} style={{marginBottom: "0px", color:"brown"}}>
                <Delete />
            </IconButton>
        )}
        </Typography>
      </div>
      <div style={{ display: "flex" }}>
        <Typography style={{ fontSize: "8px" }}>
          {moment(comment.createdAt).format("YYYY-MM-DD")}
        </Typography>
      </div>
      <Typography style={{ fontSize: "13px" }} className="post-content">
          {comment.content}
        </Typography>
        
    </div>
  );
}