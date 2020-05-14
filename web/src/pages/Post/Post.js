import React from "react";
import {
  Badge,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Input, Button
} from "reactstrap";
import Form from "reactstrap/lib/Form";
import API from "../../api/API";
import utils from '../../utils';


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      text: '',
      disableButton: false
    }
  }

  ANSWER_TYPE = 'answer';
  POST_TYPE = 'post';

  componentDidMount() {
    this.getPost();
  }

  /**
   * Do a request to get the posts.
   *
   * @public
   */
  getPost = () => {
    const { match: { params } } = this.props;
    API.getDetail(params.id
    ).then((response) => {
      this.setState({ post: response.data });
    })

  }

  /**
   * Handle color button
   *
   * @param {object} post
   * @param {boolean} liked
   * @public
   */
  updateLikePost = (post, liked) => {
    post.user_liked = !post.user_liked;
    post.likes = liked ? ++post.likes : --post.likes;

    this.setState({
      post: post
    });
  }

  /**
   * Handle color button
   *
   * @param {object} answer
   * @param {boolean} liked
   * @public
   */
  updateLikeAnswer = (answer, liked) => {
    answer.user_liked = !answer.user_liked;
    answer.likes = liked ? ++answer.likes : --answer.likes;

    this.setState({
      post: this.state.post, answer: this.state.post.answers.map(item => {
        return item.id === answer.id ? answer : item;
      })
    })
  }

  /**
   * Handle color button
   *
   * @param {string} type
   * @param {object} obj
   * @public
   */
  handleLikeButton = (type, obj) => {
    if (type === this.ANSWER_TYPE) {
      if (obj.user_liked) {
        this.dislikeAnswer(obj);
      } else {
        this.likeAnswer(obj);
      }
    } else if (type === this.POST_TYPE) {
      if (obj.user_liked) {
        this.dislikePost(obj);
      } else {
        this.likePost(obj);
      }
    }
  }

  /**
   * Make request to like
   *
   * @param {object} post
   * @public
   */
  likePost = (post) => {
    API.likePost(post.id)
    .then(() => {
      const liked = true;
      this.updateLikePost(post, liked);
    })
  }

  /**
   * Make request to delete like
   *
   * @param {string} type
   * @param {object} post
   * @public
   */
  dislikePost = (post) => {
    API.dislikePost(post.id)
    .then(() => {
      const liked = false;
      this.updateLikePost(post, liked);
    })
  }

  /**
   * Make request to like
   *
   * @param {object} answer
   * @public
   */
  likeAnswer = (answer) => {
    API.likeAnswer(this.state.post.id, answer.id)
    .then(() => {
      const liked = true;
      this.updateLikeAnswer(answer, liked);
    })
  }

  /**
   * Make request to delete like
   *
   * @param {object} answer
   * @public
   */
  dislikeAnswer = (answer) => {
    API.dislikeAnswer(this.state.post.id, answer.id)
    .then(() => {
      const liked = false;
      this.updateLikeAnswer(answer, liked);
    })
  }

  getAnswersLabel = () => {
    const len = this.state.post.answers.length;
    if (len === 1) {
      return <h4>{len} Resposta</h4>
    }
    return <h4>{len} Respostas</h4>
  }

  composeAnswers = () => {
    if (this.state.post.answers.length > 0) {
      return (
        <div>
          {this.getAnswersLabel()}
          <Card>
            <CardBody>
            {this.state.post.answers.map(item => {
            return (
            <div className="answer-item">
              <div className="d-flex">
                <div className="avatar-container">
                  <div className="icon icon-shape icon-shape-warning rounded-circle">
                    <i className="ni ni-satisfied" />
                  </div>
                </div>
                <div className="answer-container pl-3">
                  <p className="description m-0">
                    <span className="font-weight-600">@{item.user}</span>
                    <span className="text-muted ml-1">{item.created_at}</span></p>
                  <p className="m-0" style={{'color': '#525f7f'}}>{item.text}</p>
                  <div className="data-container mt-3">
                    <Badge color={utils.verifyUserLiked(item)} pill className="ml--1"
                      onClick={() => this.handleLikeButton(this.ANSWER_TYPE, item)}>
                      {item.likes} likes
                    </Badge>
                  </div>
                </div>
              </div>
            </div>)
            })}</CardBody>
          </Card>
        </div>
      )
    } else {
      return (
        <div className="align-content-center" style={{'width': '60%', 'margin': '72px auto'}}>
          <h5 className="text-center">Sem Respostas por enquanto :(</h5>
        </div>
      )
    }
  }

  onChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  disableButton = () => {
    return (this.state.text.length < 5 || this.state.text.length > 600) || this.state.disableButton;
  }

  submitAnswer = () => {
    this.setState({
      disableButton: true
    });

    const data = {
      text: this.state.text
    };

    API.postAnswer(this.state.post.id, data)
    .then((response) => {
      this.setState({
        text: '',
        post: {...this.state.post, answers: [response.data].concat(this.state.post.answers)},
        disableButton: false
      });
    });
  }

  render() {
    return (
      <main className="mt-7" ref="main">
        <section className="section">
          <Container>
            <Row className="row-grid">
              <Col sm md="8">
                {this.state.post &&
                <Card className="mb-4">
                  <CardBody>
                    <h6 className="text-primary text-uppercase font-weight-600">{this.state.post.title}</h6>
                    <div className="d-flex mt-3">
                      <div className="avatar-container">
                        <div className="icon icon-shape icon-shape-warning rounded-circle">
                          <i className="ni ni-single-02" />
                        </div>
                      </div>
                      <div className="user-container pl-3">
                        <span className="description text-muted mt-0">
                          por @{this.state.post.user}<br />{this.state.post.created_at}</span>
                      </div>
                    </div>
                    <p className="mt-3" style={{'color': '#525f7f'}}>{this.state.post.text}</p>
                    <div className="data-container ml--1">
                      <Badge color={utils.verifyUserLiked(this.state.post)} pill className="mr-1 pointer"
                        onClick={() => this.handleLikeButton(this.POST_TYPE, this.state.post)}>
                        {this.state.post.likes} likes
                      </Badge>
                    </div>
                  </CardBody>
                </Card>}
                <Card>
                  <CardBody>
                    <div className="d-flex mb-3">
                      <span className="avatar avatar-sm rounded-circle"
                        style={{'width': '24px', 'height': '24px'}}>
                        <img alt="..."
                          src="/static/media/ada-lovelace.7c26ffbb.jpg" />
                      </span>
                      <div className="m-0 ml-3">Ada Lovelace</div>
                    </div>
                    <Form>
                      <Input
                        id="answer-input"
                        className="textarea-input"
                        placeholder="Escreva uma resposta"
                        rows="3"
                        type="textarea"
                        value={this.state.text}
                        onChange={(event) => this.onChange(event)}
                      />
                      <div className="mt-3 d-flex align-items-center justify-content-end">
                        <Button
                          color="primary"
                          type="button"
                          disabled={this.disableButton()}
                          onClick={() => this.submitAnswer()}
                        >
                          Postar
                        </Button>
                      </div>
                    </Form>
                    {/*<h3 className="m-0 text-muted">Faça uma pergunta nova</h3>*/}
                  </CardBody>
                </Card>
                <hr />
                {this.state.post && this.composeAnswers()}
              </Col>
              <Col sm md="4">
                <Card>
                  <CardBody>A</CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    );
  }
}

export default Post;
