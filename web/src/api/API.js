import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:8000/api/v1/",
//   responseType: "json"
// });

export  default axios.create({
  headers: {
    user: 'localhost'
  }
})

// /**
//  * Do a request to get the posts.
//  *
//  * @public
//  */
// getPosts = () => {
//   let order = `${this.state.ascSort ? '' : '-'}${this.state.order}`;
//   let params = {order};
//   axios.get('/api/v1/posts/', {params: params})
//   .then(res => {
//     this.setState({ posts: res.data });
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }