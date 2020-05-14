import axios from "axios";

export default axios.create({
  headers: {
    user: 'localhost'
  },
  responseType: 'json'
})