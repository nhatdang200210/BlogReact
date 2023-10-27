import React from 'react'
import ig from '../../imageNLCS/footer.jpeg'
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
import CommentIcon from '@material-ui/icons/Comment'

export default function Post() {
  return (
    <Card>
        <CardHeader
            title='This is title'
            subheader='Apr 20, 2023'
            action={
                <IconButton>
                    <MoreVertIcon /> 
                </IconButton>
                
            }
        />
        <CardMedia 
        component='img'
        height='200'
        title="Title"
        image={ig} />
        <CardContent>
            <Typography variant='h5' color='textPrimary'>
                This is Title Post
            </Typography>

            <Typography variant='body2' component="p" color='textSecondary'>
                This is Content Post
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton>
                <FavoriteIcon />
                <Typography component='span' color='textSecondary'>10 like</Typography>
            </IconButton>
            <IconButton>
            <CommentIcon />
            <Typography component='span' color='textSecondary'>10 comment</Typography>
        </IconButton>
        </CardActions>
    </Card>
  )
}
