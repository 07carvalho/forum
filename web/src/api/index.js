import axios from "axios";

export default axios.create({
  headers: {
    user: 'ada'
  },
  responseType: 'json'
})