import React from 'react'
import Menu from './Menu'

import PostList from './PostList'
import {  Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import useStyle from '../css/styleAdd';
import Home1 from './Home1'



export default function News() {
  const classes = useStyle();
  
  return (
      <div>
        <Menu />
        <Home1 />
        <PostList />
        
        <Fab
        color='primary'
        className={classes.fab}
        
        >
          <AddIcon />
        </Fab>
        </div>
  
  )
}
