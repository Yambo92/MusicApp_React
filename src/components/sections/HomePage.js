import React, { useState, useEffect } from 'react'

import { Typography } from "@material-ui/core";

import youtubeSearch from "../../apis/youtubeSearch";
import SongCard from './SongCard'


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

    const [songObj, setSongObj] = useState({});
    const fetchFromApi = () => {
        slowConnectionTimeout = setTimeout(() => {
            
        }, 5000);

        const getTrendingMusic = async () => {
            const res = await youtubeSearch.get('videos', {
                params: {
                    chart: 'mostPopular',
                    videoCategoryId: '10',
                    regionCode: localStorage.getItem("country_code")
                }
            });
            return res.data.items;
        };
        const getPlayListItems = async data => {
            const res = await youtubeSearch.get("playlistItems", {
                params: {
                    playlistId: data
                }
            });
            return res.data.items
        };
        getTrendingMusic()
            .then(data => {
                setSongObj(prevState => {
                    return { ...prevState, ...{trending: data}};
                })
            })
            .catch(err => console.log(err.message))
        getPlayListItems(playlistsIds.LatestSongs).then(data => {
            setSongObj(prevState => {
                return { ...prevState, ...{latestSongs: data}}
            })
        });
        getPlayListItems(playlistsIds.RomanticSongs).then(data => {
            setSongObj(prevState => {
                return {...prevState, ...{romanticSongs: data}}
            })
        });
        getPlayListItems(playlistsIds.TopBolloywood).then(data => {
            setSongObj(prevState => {
              return { ...prevState, ...{ topBolloywood: data } };
            });
          });
    }
    useEffect(() => {
       const startingTime = new Date();
       const storedTime = localStorage.getItem('trackTime');
       const savedSongs = JSON.parse(localStorage.getItem("homePageSongObj"));

       if(!window.navigator.onLine) {
           alert("you don't have internet!");
       }
       const checkTimeAndFetch = () => {
           const timeElapsed = new Date() - Date.parse(storedTime);
           const timeElapsedInHr = timeElapsed / (1000 * 60 * 60) //convert ms to hr
           // if time is more than 12 hr we will fetch from the api
           if(timeElapsedInHr > 12 || !savedSongs.lastestSongs) {
               fetchFromApi();
               localStorage.setItem("trackTime", startingTime);
           }else {
               setSongObj(savedSongs);
           }
           
        };
        if(!storedTime) {
            localStorage.setItem('trackTime', startingTime)
            fetchFromApi()
        } else {
            checkTimeAndFetch();
        }
    }, []);

    //如果songObj发生改变则进行缓存
    useEffect(() => {
        localStorage.setItem("homePageSongObj", JSON.stringify(songObj))
    }, [songObj]);

    return (
        <>
            <br/>
            <SongCard songs={songObj.trending} categoryTitle="当前趋势" />
            <SongCard songs={songObj.latestSongs} categoryTitle="最新音乐" />
            <SongCard songs={songObj.romanticSongs} categoryTitle="浪漫柔情" />
            <SongCard songs={songObj.topBolloywood} categoryTitle="Top Bollywood" />
        </>
    )
}

export default Homepage;