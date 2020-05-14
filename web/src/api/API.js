import index from './index';

export default {
  getPosts: (ascSort, orderField) => {
    const order = `${ascSort ? '' : '-'}${orderField}`;
    const params = {order};
    return new Promise((resolve, reject) => {
      index.get('api/v1/posts/', {params: params})
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(Error(error))
      })
    })
  },
  createPost: (data) => {
    return new Promise((resolve, reject) => {
       index.post('/api/v1/posts/', data)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(Error(error))
      })
    })
  },
  likePost: (id) => {
    return new Promise((resolve, reject) => {
       index.post(`/api/v1/posts/${id}/likes/`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(Error(error))
      })
    })
  },
  dislikePost: (id) => {
    return new Promise((resolve, reject) => {
       index.delete(`/api/v1/posts/${id}/likes/`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(Error(error))
      })
    })
  }
}