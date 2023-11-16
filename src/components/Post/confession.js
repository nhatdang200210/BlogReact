import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  TextareaAutosize
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import AvatarPost from "../AvatarPost";
import '../../css/Form.css';
import '../../css/EditForm.css';

export default function Confession({
  title,
  content,
  author,
  createdAt,
  liked,
  postId,
  attachment
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editedAuthor, setEditedAuthor] = useState(author);
  const [likeCount, setLikeCount] = useState(liked);

  // Role Check
  const isAdmin = localStorage.getItem("role") === "admin";
  const isOwner = localStorage.getItem("name") === author;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const handleLikeClick = () => {
    const updatedLikeCount = likeCount + 1;
    setLikeCount(updatedLikeCount);

    axios
      .put(`http://localhost:3001/api/v1/posts/${postId}`, {
        likeCount: updatedLikeCount
      })
      .then(response => {
        console.log("Like count updated:", response.data);
      })
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.error("Error updating like count:", error);
      });
  };

  const handleDeleteClick = () => {
    if (isAdmin || isOwner) {
      const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
      console.log("postId", postId);
      if (confirmDelete) {
        axios
          .delete(`http://localhost:3001/api/v1/posts/${postId}`)
          .then(response => {
            console.log("Post deleted:", response.data);
            setTimeout(() => window.location.reload(), 850);
          })
          .catch(error => {
            console.error("Error deleting post:", error);
          });
      }
    }
  };

  const handleSaveChanges = () => {
    const editedPost = {
      title: editedTitle,
      content: editedContent,
      author: editedAuthor
    };

    console.log("editID", postId);

    axios
      .put(`http://localhost:3001/api/v1/posts/${postId}`, editedPost)
      .then(response => {
        console.log("Post updated:", response.data);
        setIsEditing(false);

        alert("Successfully edit status");

        setTimeout(() => window.location.reload(), 850);
      })
      .catch(error => {
        console.error("Error updating post:", error);
      });
  };

  return (
    <Card style={{ marginBottom: "20px" }}>
      <CardHeader
        avatar={<AvatarPost attachment={attachment} author={author}/>}
        title={
        <Typography
          style={{
            color: "red",
            fontSize:  "18px",
            fontWeight: "bold"
          }}
        >
          {author}
        </Typography>}
        subheader={createdAt}
        // style={{
        //   color: "red"
        // }}
        action={
          <>
            {(isAdmin || isOwner) && (
              <>
                <IconButton onClick={handleEditClick}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </>
        }
      />
      <CardContent>
        <Typography
          variant="h6"
          style={{ color: "rgb(21, 88, 138)", fontSize: "20px" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="textPrimary"
          style={{ fontSize: "14px" }}
        >
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleLikeClick}>
          <FavoriteIcon />
          <Typography component="span" color="textSecondary">
            {liked}
          </Typography>
        </IconButton>
        <IconButton>
          <CommentIcon />
          <Typography component="span" color="textSecondary">
            10 comment
          </Typography>
        </IconButton>
      </CardActions>

      <Dialog open={isEditing} onClose={handleEditClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            minwidth:"900px",
            
          }}
        >
          <TextareaAutosize
            label="Title"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            style={{ marginBottom: "10px"}}
            className="title"
          />
          <TextareaAutosize
            label="Content"
            value={editedContent}
            onChange={e => setEditedContent(e.target.value)}
            style={{ marginBottom: "10px", width:"500px", paddingBottom:"20px" }}
            className="content"
            
          />
          <TextareaAutosize
            label="Author"
            value={editedAuthor}
            onChange={e => setEditedAuthor(e.target.value)}
            style={{ marginBottom: "10px"}}
            disabled="disabled"
            className=" author-info title"
            
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}