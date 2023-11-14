import React from 'react';

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';

export default function Confession({ title, content, author, createdAt, liked}) {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardHeader 
        avatar={<Avatar>{author[0]}</Avatar>}
        title={author}
        subheader={createdAt}
        style={{
          color:'red',
          
        }}
        
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant='h6'  style={{color:'rgb(21, 88, 138)', fontSize:'20px'}}>
          {title}
        </Typography>
        <Typography variant='h5' component='p' color='textPrimary' style={{fontSize:'14px'}}>
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteIcon />
          <Typography component='span' color='textSecondary'>
            {liked}
          </Typography>
        </IconButton>
        <IconButton>
          <CommentIcon />
          <Typography component='span' color='textSecondary'>
            10 comment
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
}