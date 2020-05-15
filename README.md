# Forum!

Welcome to Forum - the best Questions and Answers site ever!

#### Functionalities:
* List all Posts
* Create a Post
* Order posts by created date or likes
* List Top Answered Posts
* Like/dislike a Post
* Show a specific Post
* Post an Answer
* Like/dislike an Answer
* List Related Posts

#### Stack used:
* Python 3.6
* Django 2.2.12
* Django Rest Framework 3.11
* PostgreSQL
* ReactJS 16.13.1
* Docker
* Love and a lot of Coffee

## Prepare to run
In the root project run:
```
make build-backend
```
Then, run:
```
make build-frontend
```

## Change user
As didactic purposes, it is possible to 'login' with other user just changing the value in `web/src/api/index.js`.

## API Routes
#### List Posts
List all posts created.
| Field | Description  |
|--|--|
| URL | [/api/v1/posts/](http://localhost:8000/api/v1/posts/) |
| Method | `GET` |
| URL Params | **Required** <br> None <br><br> **Optional** <br> `order=[string]`<br>`filter=[string]` |
| Data Params | None |
| Samples Call | `curl --request GET 'http://localhost:8000/api/v1/posts/'` |

#### Get a Post
Get a specific post.
| Field | Description  |
|--|--|
| URL | [/api/v1/posts/:id/](http://localhost:8000/api/v1/posts/1/) |
| Method | `GET` |
| URL Params | **Required** <br> `id=[int]` <br><br> **Optional** <br> None |
| Data Params | None |
| Samples Call | `curl --request GET 'http://localhost:8000/api/v1/posts/1/'` |

#### Create a Post
Create a new post
| Field | Description  |
|--|--|
| URL | [/api/v1/posts/](http://localhost:8000/api/v1/posts/1/) |
| Method | `POST` |
| URL Params | **Required** <br> None <br><br> **Optional** <br> None |
| Data Params | `{"title": [string], "text": [string]}` <br><br> **Example** <br> `{"title": "What is the meaning of life?", "text": "I am thinking about this a lot!"}` |
| Samples Call | `curl -d '{"title": "What is the meaning of life?", "text": "I am thinking about this a lot!"}' --request POST 'http://localhost:8000/api/v1/posts/'` |

#### Like a Post
Like a Post
| Field | Description  |
|--|--|
| URL | [/api/v1/posts/:id/likes/](http://localhost:8000/api/v1/posts/1/likes/) |
| Method | `POST` |
| URL Params | **Required** <br> `id=[int]` <br><br> **Optional** <br> None |
| Data Params | None |
| Samples Call | `curl --request POST 'http://localhost:8000/api/v1/posts/1/likes/'` |


#### Dislike a Post
Remove a like in a Post
| Field | Description  |
|--|--|
| URL | [/api/v1/posts/:id/likes/](http://localhost:8000/api/v1/posts/1/likes/) |
| Method | `DELETE` |
| URL Params | **Required** <br> `id=[int]`<br><br> **Optional** <br> None |
| Data Params | None |
| Samples Call | `curl --request DELETE 'http://localhost:8000/api/v1/posts/1/likes/'` |

#### Post an Answer
Create an answer to a post
| Field | Description  |
|--|--|
| URL | [/api/v1/posts/:id/answers/](http://localhost:8000/api/v1/posts/1/answers/) |
| Method | `POST` |
| URL Params | **Required** <br> `id=[int]`<br><br> **Optional** <br> None |
| Data Params | `{"text": [string]}` <br><br> **Example** <br> `{"text": "You know nothing Jon Snow"}` |
| Samples Call | `curl -d '{"text": "You know nothing Jon Snow"}' --request POST 'http://localhost:8000/api/v1/posts/1/answers/'` |


#### Like a Post
Like an Answer in a Post
| Field | Description  |
|--|--|
| URL | [/api/v1/posts/:postId/answers/:answerId/likes/](http://localhost:8000/api/v1/posts/1/answers/1/likes/) |
| Method | `POST` |
| URL Params | **Required** <br> `postId=[int]`<br>`answerId=[int]` <br><br> **Optional** <br> None |
| Data Params | None |
| Samples Call | `curl --request POST 'http://localhost:8000/api/v1/posts/1/answers/1/likes/'` |


#### Dislike a Post
Remove a like in a Answer of a Post
| Field | Description  |
|--|--|
| URL | [/api/v1/posts/:postId/answers/:answerId/likes/](http://localhost:8000/api/v1/posts/1/answers/1/likes/) |
| Method | `DELETE` |
| URL Params | **Required** <br> `postId=[int]`<br>`answerId=[int]` <br><br> **Optional** <br> None |
| Data Params | None |
| Samples Call | `curl --request DELETE 'http://localhost:8000/api/v1/posts/1/answers/1/likes/'` |


## Testing

To run the tests:
```
python3.6 -m unittest discover
```

