import React, { useCallback, useEffect, useState } from 'react';
import Menu from './Menu';
import Form from './Form';
import { Grid, Modal } from '@material-ui/core';
import Post from './Post/confession';
import axios from 'axios'; 
import moment from 'moment';

export default function Status() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPosts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/posts');
      const postsData = response.data.data.posts;
      setPosts(postsData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const openModal = () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setIsModalOpen(true);
    } else {
      alert('Vui lòng đăng nhập để có thể đăng bài');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }; 

  console.log("posts", posts);

  return (
    <div>
      <Menu />
      <button className="bnt" style={{ float: 'right', marginBottom: '20px' }} onClick={openModal}>Post</button>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10}>
          {posts.map((post, index) => (
            <Post
              key={index}
              title={post.title}
              author={post.author}
              content={post.content}
              attachment={post.attachment} 
              createdAt={moment(post.createdAt).format('YYYY-MM-DD')} 
              liked={post.likeCount}
            />
          ))}
        </Grid>
      </Grid>
      <Modal open={isModalOpen} onClose={closeModal}>
        <div className="modal-container">
          <Form onSave={closeModal} />
        </div>
      </Modal>
    </div>
  );
}