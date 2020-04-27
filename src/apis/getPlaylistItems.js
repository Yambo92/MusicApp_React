import axios from 'axios'
import { selectRandomKey } from './youtubeSearch';

export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: "snippet",
        maxResults: "15",
        key: selectRandomKey()
    }
})
