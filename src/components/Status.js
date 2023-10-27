import React, { useCallback, useEffect } from 'react'
import Menu from './Menu'
import Form from './Form'
import { Grid } from '@material-ui/core'
import Post from './Post/confession'
import axios from 'axios'

export default function Status() {
  const getPost = useCallback(async() =>{
    try {
      const option = {
        method: "get",
        url: "/api/v1/posts",
      }
      const response = await axios(option);
      const posts = response.data.posts;
      console.log(posts);
    } catch (error) {
        console.log(error);
    }
    },[])
  useEffect(() =>{
    getPost()
  }, [getPost]); 

  return (
    <div>
        <Menu />
        <Form />
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={10}>
                <Post />
            </Grid>
            <Grid item xs={12} sm={10}>
                <Post />
            </Grid>
        </Grid>
    </div>

  )
}
