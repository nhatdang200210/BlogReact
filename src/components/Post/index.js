import React from 'react';
import PropTypes from 'prop-types';
import { 
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';

export default function Post(props) {
  const { title, image, content, author } = props;

  return (
    <Card>
        <CardHeader
            title={title}
            subheader={new Date().toLocaleDateString()} // Thay đổi ngày hiện tại thành ngày phù hợp
            action={
                <IconButton>
                    <MoreVertIcon /> 
                </IconButton>
            }
        />
        <CardMedia 
            component='img'
            height='300' 
            width='100%'  
            title={title}
            image={image}
            
        />
        <CardContent>
            <Typography variant='h6' color='textPrimary' style={{color:"blue", fontSize:"22px"}}>
                {title}
            </Typography>
            <Typography variant='h5' component="p" color='textPrimary' style={{fontSize:"15px"}}>
                {content}
            </Typography>
            <Typography variant='body2' component="p" color='textSecondary' style={{fontSize:"10px"}}>
                Author: {author}
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton>
                <FavoriteIcon />
                <Typography component='span' color='textSecondary'>10 likes</Typography>
            </IconButton>
            <IconButton>
                <CommentIcon />
                <Typography component='span' color='textSecondary'>10 comments</Typography>
            </IconButton>
        </CardActions>
    </Card>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};