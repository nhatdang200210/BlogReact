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

export default function Confession({ title, content, author, attachment}) {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardHeader
        avatar={<Avatar>{author[0]}</Avatar>}
        title={author}
        subheader='Apr 19, 2023'
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant='h5' color='textPrimary'>
          {title}
        </Typography>
        <Typography variant='body2' component='p' color='textSecondary'>
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteIcon />
          <Typography component='span' color='textSecondary'>
            10 like
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