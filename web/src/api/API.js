import index from './index';

export default {
  getPosts: (ascSort, orderField) => {
    const order = `${ascSort ? '' : '-'}${orderField}`;
    const params = {order};
    return new Promise((resolve, reject) => {
      index.get('/api/v1/posts/', {params: params})
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(Error(error))
      })
    })
  },
  getTopAnswered: () => {
    return new Promise((resolve, reject) => {
      index.get('/api/v1/posts/?filter=top-answered')
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(Error(error))
      })
    })
  },
  getRelated: () => {
    return new Promise((resolve, reject) => {
      index.get('/api/v1/posts/?filter=related')
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(Error(error))
      })
    })
  },
  getPost: (postId) => {
    console.log(postId);
    return new Promise((resolve, reject) => {
      index.get(`/api/v1/posts/${postId}/`)
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
  },
  postAnswer: (id, data) => {
    return new Promise((resolve, reject) => {
      index.post(`/api/v1/posts/${id}/answers/`, data)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(Error(error))
      })
    })
  },
  likeAnswer: (postId, answerId) => {
    return new Promise((resolve, reject) => {
      index.post(`/api/v1/posts/${postId}/answers/${answerId}/likes/`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(Error(error))
      })
    })
  },
  dislikeAnswer: (postId, answerId) => {
    return new Promise((resolve, reject) => {
      index.delete(`/api/v1/posts/${postId}/answers/${answerId}/likes/`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(Error(error))
      })
    })
  }
}