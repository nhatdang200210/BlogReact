import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Post from './Post';

export default function PostList() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/news');
                setNews(response.data.data.news);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }

        fetchNews();
    }, []); 

    
  const handleDeletePost = async (postId) => {
    try {
      // Gửi yêu cầu DELETE đến API endpoint để xóa bài post
      await axios.delete(`http://localhost:3001/api/v1/posts/${postId}`);

      // Cập nhật state để loại bỏ bài post đã xóa
      const updatedNews = news.filter(item => item._id !== postId);
      setNews(updatedNews);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

    console.log("news", news);

    return (
        <Grid container spacing={2} alignItems='stretch'>
            {news.map((item) => (
                <Grid item xs={12} sm={6} key={item.id}>
                    <Post
                        title={item.title}
                        image={item.image}
                        content={item.content}
                        author={item.author}
                        onDelete={() => handleDeletePost(item.id)}
                    />
                </Grid>
            ))}
        </Grid>
    );
}