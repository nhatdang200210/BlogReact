import React, { useEffect, useState } from "react";
// import moment from "moment";
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
  TextareaAutosize,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import axios from "axios";
import AvatarPost from "../AvatarPost";
import "../../css/Form.css";
import "../../css/EditForm.css";
import CommentItem from "./CommentItem";

export default function Confession({
  title,
  content,
  author,
  createdAt,
  liked,
  postId,
  attachment,
  postComments,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editedAuthor, setEditedAuthor] = useState(author);
  const [likeCount, setLikeCount] = useState(liked);
  const [comments, setComments] = useState([]);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [commentAuthor, setCommentAuthor] = useState(
    localStorage.getItem("name")
  );
  
  //thiết lập state comment ban đầu
  const [displayedComments] = useState(3);

  //state theo dõi trạng thái mở rộng comment
  const [areCommentsExpanded, setAreCommentsExpanded] = useState(false);
  
  // Role Check
  const isAdmin = localStorage.getItem("role") === "admin";

  console.log('localStorage.getItem("name")', localStorage.getItem("name"));
  console.log("commentAuthor", commentAuthor);



  const handleDeleteComment = (commentId, authorComment) => {
    console.log("commentId", commentId);
    console.log("authorComment", authorComment);
    const authorLogin = localStorage.getItem("name");
    const userRole = localStorage.getItem("role"); // Retrieve user role from localStorage
    console.log("authorLogin", authorLogin);
  
    const isOwner = authorLogin === authorComment;
    const isAdmin = userRole === "admin"; // Check if user role is "admin"
  
    if (isOwner || isAdmin) {
      axios
        .delete(`http://localhost:3001/api/v1/comment/${commentId}`)
        .then((response) => {
          alert("Đã xóa thành công bình luận");
          window.location.reload();
        })
        .catch((error) => {
          // Xử lý lỗi khi gọi API (nếu cần)
          console.log(error);
        });
    } else {
      alert("Vui lòng không xóa bài đăng của người khác");
    }
  };

  const handleCommentSubmit = () => {
    const commentData = {
      content: commentContent,
      author: commentAuthor,
    };

    axios
      .post(`http://localhost:3001/api/v1/comment/${postId}`, commentData)
      .then((response) => {
        setIsCommenting(false);
        alert("Successfully created comment!");
      setTimeout(() => {
        window.location.reload();
      }, 800);
        // Xử lý phản hồi thành công từ API (nếu cần)
      })
      
      .catch((error) => {
        // Xử lý lỗi khi gọi API (nếu cần)
        console.log(error);
      });
  };

  const handleCommentClick = () => {
    setIsCommenting(true);
  };

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
        likeCount: updatedLikeCount,
      })
      .then((response) => {
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating like count:", error);
      });
  };

  const handleDeleteClick = () => {
    if (isAdmin ) {
      const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
      if (confirmDelete) {
        axios
          .delete(`http://localhost:3001/api/v1/posts/${postId}`)
          .then((response) => {
            setTimeout(() => window.location.reload(), 850);
          })
          .catch((error) => {
            console.error("Error deleting post:", error);
          });
      }
    }
  };

  const handleSaveChanges = () => {
    const editedPost = {
      title: editedTitle,
      content: editedContent,
      author: editedAuthor,
    };
    axios
      .put(`http://localhost:3001/api/v1/posts/${postId}`, editedPost)
      .then((response) => {
        setIsEditing(false);

        alert("Successfully edit status");

        setTimeout(() => window.location.reload(), 850);
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  useEffect(() => {
    // Gọi API để lấy danh sách comment khi component được tải lên
    axios
      .get(`http://localhost:3001/api/v1/comment/${postId}`)
      .then((response) => {
        // Lưu danh sách comment vào state
        setComments(response.data.data.comments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [postId]); // [] chỉ chạy một lần khi component được tải lên

  // const commentsToShow = comments.slice(0, displayedComments);

//logic để hiển thị bình luận dựa trên việc chúng đã được mở rộng hay chưa.
  const commentsToShow = areCommentsExpanded ? comments : comments.slice(0, displayedComments);
  console.log("commentsToShow", commentsToShow);

  return (
    <Card style={{ marginBottom: "20px" }}>
      <CardHeader
        avatar={<AvatarPost attachment={attachment} author={author} />}
        title={
          <Typography
            style={{
              color: "red",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {author}
          </Typography>
        }
        subheader={createdAt}
        // style={{
        //   color: "red"
        // }}
        action={
          <>
            {(isAdmin) && (
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
          className="post-content"
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
          <CommentIcon onClick={handleCommentClick}/>
          <Typography component="span" color="textSecondary" onClick={handleCommentClick}>
            {postComments} comments
          </Typography>
        </IconButton>
        
      </CardActions>
      <CardContent>
        <Typography
          variant="h6"
          style={{ color: "rgb(21, 88, 138)", fontSize: "14px" }}
        >
          Bình luận:
        </Typography>
        {commentsToShow.length > 0 ? (
          commentsToShow.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onDeleteComment={() => (handleDeleteComment(comment._id, comment.author))}
            />
          ))
        ) : (

          <Typography>Chưa có comment.</Typography>
          
        )}
      
        {/* Show "Xem Thêm" button */}
        {comments.length > displayedComments && (
          <Button onClick={() => setAreCommentsExpanded  (!areCommentsExpanded)}>
            {areCommentsExpanded ? "Thu gọn" : "Xem thêm"}
          </Button>
        )}
        
      </CardContent>

{/* thêm comment */}
      {isCommenting && (
        <Dialog open={isCommenting} onClose={() => setIsCommenting(false)}>
          <DialogTitle>Add comment</DialogTitle>
          <DialogContent>
            <TextField
              label="Content"
              multiline
              rows={5}
              variant="outlined"
              fullWidth
              value={commentContent}
              onChange={(event) => setCommentContent(event.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              value={commentAuthor}
              onChange={(event) => setCommentAuthor(event.target.value)}
              disabled="disabled"
              style={{ marginBottom: "10px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsCommenting(false)} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={handleCommentSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}

{/* edit form */}
      <Dialog open={isEditing} onClose={handleEditClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            minwidth: "900px",
          }}
        >
          <TextareaAutosize
            label="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
            className="title"
          />
          <TextareaAutosize
            label="Content"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{
              marginBottom: "10px",
              width: "500px",
              paddingBottom: "20px",
            }}
            className="content"
          />
          <TextareaAutosize
            label="Author"
            value={editedAuthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
            style={{ marginBottom: "10px" }}
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
