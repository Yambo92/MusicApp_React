import React, {useContext} from 'react'
import { GlobalContext } from '../GlobalState'

import {
    Card, 
    makeStyles,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    LinearProgress,
    Container
} from '@material-ui/core'

const useStyles = makeStyles({
    card: {
        width: 300,
        height: 236,
        display: 'inline-block',
        margin: '10px',
        whiteSpace: "pre-wrap"
    },
    media: {
        height: 160
    }
});

const SongCard = ({ songs, categoryTitle}) => {
    const [{}, dispatch] = useContext(GlobalContext);
    const setCurrentVideoSnippet = data => {
        dispatch({type: "setCurrentVideoSnippet", snippet: data})
    };
    const handleClick = video => {
        if(!video.snippet.resourceId) {
            setCurrentVideoSnippet({
                id: video.id,
                title: video.snippet.title,
                channelTitle: video.snippet.channelTitle,
                maxThumbnail: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
                sdThumbnail: `https://img.youtube.com/vi/${video.id}/sddefault.jpg`
            });
        } else {
            setCurrentVideoSnippet({
                id: video.snippet.resourceId.videoId,
                title: video.snippet.title,
                channelTitle: video.snippet.channelTitle,
                maxThumbnail: `https://img.youtube.com/vi/${video.snippet.resourceId.videoId}/maxresdefault.jpg`,
                sdThumbnail: `https://img.youtube.com/vi/${video.snippet.resourceId.videoId}/sddefault.jpg`
            })
        }
    }

    const classes = useStyles();

    if(songs){
        const renderCards = songs.map(song => {
            return (
                <Card className={classes.card} key={song.id}>
                    <CardActionArea onClick={() => handleClick(song)}>
                        <CardMedia
                            className={classes.media}
                            component="img"
                            src={song.snippet.thumbnails.high.url}
                            loading="lazy"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="body2" component="p">
                                    {song.snippet.title.slice(0, 70) + '...'}
                                </Typography>
                            </CardContent>
                    </CardActionArea>
                </Card>
            )
        })
        return ( 
            <>
                <Typography variant="h5" style={{ marginLeft: '15px'}}>
                    {categoryTitle}
                </Typography>
                <div className="cardSlider">{renderCards}</div>
            </>
         );
    } else {
        return (
            <Container style={{height: "25vh"}}>
                <LinearProgress color="primary" />
            </Container>
        )
    }
  
}
 
export default SongCard;