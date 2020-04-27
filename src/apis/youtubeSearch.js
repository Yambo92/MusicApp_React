import axios from 'axios'

export const selectRandomKey = () => {
    const keys = process.env.REACT_APP_YouTube_Keys.split(" ");
    const random = Math.floor(Math.random()* Math.floor(keys.length));
    return keys[random];
};

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
      part: "snippet",
      videoCategoryId: "10",
      type: "video",
      key: selectRandomKey()
  }
});