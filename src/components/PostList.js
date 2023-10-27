import React from 'react'
import { Grid } from '@material-ui/core';
import Post from './Post';


export default function PostList() {
    return (
        <Grid container spacing={2} alignItems='stretch'>
            <Grid item xs={12} sm={6}>
                <Post />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Post />
            </Grid>
        </Grid>
    )
}
