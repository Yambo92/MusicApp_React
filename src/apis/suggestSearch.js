import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

export default axios.create({
  baseURL: "https://suggestqueries.google.com/complete/search?",
 adapter: jsonpAdapter,
 params: {
     h1: "en",
     ds: "yt",
     client: "youtube"
 }
})