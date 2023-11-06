import React, { useCallback, useEffect, useState } from 'react';
import Menu from './Menu';
import Form from './Form';
import { Grid, Modal } from '@material-ui/core';
import Post from './Post/confession';
import axios from 'axios';

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
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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