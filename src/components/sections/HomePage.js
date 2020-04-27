import React, { useState, useEffect } from 'react'

import { Typography } from "@material-ui/core";

import youtubeSearch from "../../apis/youtubeSearch";

const playlistsIds = {
    LatestSongs: "PLFgquLnL59akA2PflFpeQG9L01VFg90wS",
    RomanticSongs: "PL64G6j8ePNureM8YCKy5nRFyzYf8I2noy",
    EdmSongs: "PLw-VjHDlEOgs658kAHR_LAaILBXb-s6Q5",
    TopBolloywood: "PLcRN7uK9CFpPkvCc-08tWOQo6PAg4u0lA",
    TopPop: "PLDcnymzs18LU4Kexrs91TVdfnplU3I5zs",
    Reggaeton: "PLS_oEMUyvA728OZPmF9WPKjsGtfC75LiN"
  };

let slowConnectionTimeout;

const Homepage = () => {

    return (
        <>
            <br/>
            <div>Homepage</div>
        </>
    )
}

export default Homepage;