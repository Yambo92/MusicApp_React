import React, {useContext, useEffect, useState } from 'react'
import { GlobalContext } from './GlobalState'

import { Button, Grid, Typography } from '@material-ui/core'

import {NavigateNext} from '@material-ui/icons'
import bgImg from '../images/music-bg.svg'
import gIcon from '../images/google.svg'
import handcraftedText from '../images/craftedImg.png'

const bgStyle = {
    background: `url(${bgImg}) no-repeat`,
    backgroundPositionX: "50%",
    width: '100vw',
    height: "46vh"
};

const LoginPage = ({ continueToHome}) => {

    return (
        <Grid
            style={{height: '80vh'}}
            container
            direction="column"
            justify="space-around"
            alignItems="center"
        >
            <div style={bgStyle} />
            <Typography
                variant="h6"
                color="primary"
                align="center"
                style={{ padding: '10px'}}
            >
                享听最炫音乐，尽在你的掌握
            </Typography>
            <img 
                style={{
                    width: "70vw",
                    maxWidth: "350px"
                }}
                src={handcraftedText}
                alt=""
            />
            <Button variant="outlined" color="primary" onClick={continueToHome}>
                继续
                <NavigateNext />
            </Button>
        </Grid>
    )
};

export default LoginPage;