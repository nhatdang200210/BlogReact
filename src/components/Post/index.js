import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../css/FormNews.css";

export default function Post({
  title,
  image,
  content,
  author,
  onDelete,
  createdAt,
  newId,
}) {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const [showAllContent, setShowAllContent] = useState(false); //show chi tiết content
   // Nội dung được chia thành các dòng để hiển thị 3 dòng đầu tiên
   const contentLines = content.split('\n').slice(0, 3).join('\n');

   const handleToggleContent = () => {
    setShowAllContent(!showAllContent);
  };


  const handleEdit = () => {
    setOpen(true);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setNewContent(event.target.value);
  };

  const updatePost = async () => {
    const newData = {
      title: newTitle,
      content: newContent,
    };

    try {
      await axios.put(`http://localhost:3001/api/v1/news/${newId}`, newData);

      alert("Successfully edit Post of News");

      setTimeout(() => {
        window.location.reload();
      }, 850);
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
  };

  const handleDeleteClick = async () => {
    if (isAdmin) {
      const confirmed = window.confirm(
        "Bạn có chắc chắn muốn xoá tin tức này không?"
      );

      if (confirmed) {
        try {
          await axios.delete(`http://localhost:3001/api/v1/news/${newId}`);
          await onDelete();
          console.log("Bài viết đã được xoá thành công");
          window.location.reload();
        } catch (error) {
          console.error("Lỗi khi xoá bài viết:", error);
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader
        subheader={createdAt}
        action={
          <div>
            {isAdmin && (
              <>
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </div>
        }
      />
      <CardMedia
        component="img"
        height="300"
        width="100%"
        title={title}
        image={image}
        className="post-img"
      />
      <CardContent>
        <Typography
          variant="h6"
          color="textPrimary"
          style={{ color: "blue", fontSize: "22px" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="textPrimary"
          style={{ fontSize: "15px" }}
          className="post-content "
          
        >
          {showAllContent ? content : contentLines}
          {!showAllContent && <span>...</span>}
          {/* Hiển thị nút Xem thêm chỉ khi có nội dung cần xem */}
          {!showAllContent && content.split('\n').length > 3 && (
            <Button onClick={handleToggleContent}>
              Xem thêm
            </Button>
          )}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          color="textSecondary"
          style={{ fontSize: "10px" }}
        >
          Author: {author}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteIcon />
          <Typography component="span" color="textSecondary">
            10 likes
          </Typography>
        </IconButton>
        <IconButton>
          <CommentIcon />
          <Typography component="span" color="textSecondary">
            10 comments
          </Typography>
        </IconButton>
      </CardActions>

      <Dialog open={open} onClose={() => setOpen(false)} style={{ paddingBottom:"300px"}} >
        <DialogTitle>Edit post</DialogTitle>
        <DialogContent
          style={{
            minWidth:"600px",
            
            
          }}
        >
          {/* Hiển thị các trường chỉnh sửa */}
          <TextareaAutosize
            placeholder="Title"
            fullWidth
            value={newTitle}
            onChange={handleTitleChange}
            className="posttitle title-edit"
          />
          <TextareaAutosize
            placeholder="Content"
            fullWidth
            value={newContent}
            onChange={handleContentChange}
            className="contentnews content-edit"

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Can
          </Button>
          <Button onClick={updatePost} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  createdAt: PropTypes.string.isRequired,
  newId: PropTypes.string.isRequired,
};
