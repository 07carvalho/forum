import React from 'react';
import axios from 'axios';
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
} from 'reactstrap';
import API from '../../api/API';
import Filters from '../../components/Filters';
import CustomModal from "../../components/CustomModal";
import HomeBanner from "./HomeBanner";

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: 'created_at',
      ascSort: false,
      filter: false,
      posts: [],
      postModal: {
        id: 'postModal',
        open: false,
        title: 'Nova Questão',
        inputs: {
          title: {
            label: 'Título',
            placeholder: 'Dê um título para sua questão',
            value: '',
            type: 'text',
            required: true,
            minLength: 5,
            maxLength: 60,
          },
          text: {
            label: 'Descrição',
            placeholder: 'Descreva melhor sua dúvida',
            value: '',
            type: 'textarea',
            required: true,
            minLength: 5,
            maxLength: 600,
          }
        },
        onChange: this.onChange,
        toggleMethod: this.toggleModal,
        submitMethod: this.submitPostModal
      }
    }
  }

  componentDidMount() {
    this.getPosts();
  }

  /**
   * Do a request to get the posts.
   *
   * @public
   */
  getPosts = () => {
    let order = `${this.state.ascSort ? '' : '-'}${this.state.order}`;
    let params = {order};
    API.get('/api/v1/posts/', {params: params})
    .then(res => {
      this.setState({ posts: res.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  /**
   * Create a new post and insert in the top of list.
   *
   * @param {function} callBack
   * @public
   */
  createPost = (callBack) => {
    const data = {
      title: this.state.postModal.inputs.title.value,
      text: this.state.postModal.inputs.text.value,
      user: 'ada'
    }
    axios.post('/api/v1/posts/', data)
    .then(res => {
      this.setState({
        posts: [res.data].concat(this.state.posts)
      }, () => callBack);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  /**
   * Change order field and sort and call the request function.
   *
   * @param {string} order
   * @public
   */
  handleOrder = (order) => {
    let ascSort = this.state.order === order ? !this.state.ascSort : true;
    this.setState({order, ascSort}, () => this.getPosts());
  }

  /**
   * Active (change color) a order button
   *
   * @param {string} order
   * @public
   */
  activeOrderButton = (order) => {
    return this.state.order === order ? 'primary' : 'secondary';
  }

  /**
   * Change the icon according the sorting direction (down or up).
   *
   * @param {string} order
   * @public
   */
  handleSortIcon = (order) => {
    if (this.state.order === order) {
      return this.state.ascSort ? 'fa-chevron-down' : 'fa-chevron-up';
    }
    return 'fa-chevron-down';
  }

  /**
   * Handle color button
   *
   * @param {object} post
   * @public
   */
  verifyUserLiked(post) {
    return post.user_liked ? 'primary' : 'secondary';
  }

  /**
   * Create the post cards after the request.
   *
   * @public
   */
  composePosts() {
    if (this.state.posts.length > 0) {
      return this.state.posts.map((post, i) => {
        return (
          <Card className="mb-4" key={i}>
            <CardBody>
              <p className="description text-muted mt-0">Postado por @{post.user}, em {post.created_at}</p>
              <a href={`/posts/${post.id}/${post.slug}`}>
                <h6 className="text-primary text-uppercase font-weight-600">{post.title}</h6>
              </a>
              <p className="mt-3" style={{'color': '#525f7f'}}>{post.text}</p>
              <div className="data-container">
                <Badge color={this.verifyUserLiked(post)} pill className="mr-1" style={{'cursor': 'pointer'}}
                  onClick={() => this.handleLikeButton(post)}>
                  {post.likes} likes
                </Badge>
                <Badge color="secondary" pill className="mr-1">
                  {post.answers.length} respostas
                </Badge>
              </div>
            </CardBody>
          </Card>
        )
      })
    } else {
      return (
        <div className="align-content-center" style={{'width': '40%', 'margin': '172px auto'}}>
          <h5>Sem Perguntas por enquanto</h5>
          <img alt="Sem Perguntas" className="img-fluid" src={require('../../assets/img/theme/icon-no-post.jpeg')} />
        </div>
      )
    }
  }

  /**
   * Open and close the modal according to the name
   *
   * @param {string} state
   * @public
   */
  toggleModal = state => {
    this.setState({
      [state]: {...this.state[state], open: !this.state[state].open}
    }, () => this.clearModal(state));
  }

  /**
   * Change the icon according the sorting direction (down or up).
   *
   * @param {object} e
   * @param {string} state
   * @param {string} key
   * @public
   */
  onChange = (e, state, key) => {
    this.setState(prevState => ({
      [state]: {
        ...prevState[state],
        inputs: {
          ...prevState[state].inputs,
          [key]: {
            ...prevState[state].inputs[key],
            value: e
          }
        }
      }
    }))
  }

  /**
   * Clear modal inputs
   *
   * @param {string} state
   * @public
   */
  clearModal = (state) => {
    const keys = Object.keys(this.state[state].inputs);
    keys.map(key => {
      this.setState(prevState => ({
        [state]: {
          ...prevState[state],
          inputs: {
            ...prevState[state].inputs,
            [key]: {
              ...prevState[state].inputs[key],
              value: ''
            }
          }
        }
      }))
    })
  }

  /**
   * Call function that create a new post.
   *
   * @public
   */
  submitPostModal = () => {
    this.createPost(this.toggleModal('postModal'));
  }

  /**
   * Handle color button
   *
   * @param {object} post
   * @public
   */
  updateLikeButton = (post) => {
    post.user_liked = !post.user_liked;
    post.likes += 1;

    this.setState(prevState => ({
      posts: prevState.posts.map(
        obj => (obj.id === post.id ? post : obj)
      )
    }));
  }

  /**
   * Handle color button
   *
   * @param {object} post
   * @public
   */
  handleLikeButton = (post) => {
    if (post.user_liked) {
      this.dislikePost(post);
    } else {
      this.likePost(post);
    }
  }

  /**
   * Make request to like
   *
   * @param {object} post
   * @public
   */
  likePost = (post) => {
    axios.post(`/api/v1/posts/${post.id}/likes/`, {user: 'localhost'})
    .then(res => {
      this.updateLikeButton(post);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  /**
   * Make request to delete like
   *
   * @param {object} post
   * @public
   */
  dislikePost = (post) => {
    axios.delete(`/api/v1/posts/${post.id}/likes/`, {user: 'localhost'})
    .then(res => {
      this.updateLikeButton(post);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <main className="mt-7" ref="main">
        <HomeBanner />
        <section className="section section-lg pt-lg-0" style={{'marginTop': '-165px'}}>
          <Container>
            <Row className="justify-content-center">
              <Col sm lg="8">
                <Card
                  onClick={() => this.toggleModal('postModal')}>
                  <CardBody>
                    <div className="mb-3" style={{'display': 'flex'}}>
                      <span className="avatar avatar-sm rounded-circle"
                        style={{'width': '24px', 'height': '24px'}}>
                        <img alt="..."
                          src="/static/media/ada-lovelace.7c26ffbb.jpg" />
                      </span>
                      <div className="m-0 ml-3">Ada Lovelace</div>
                    </div>
                    <h3 className="m-0 text-muted">Faça uma pergunta nova</h3>
                  </CardBody>
                </Card>
                <hr />
                <Filters
                  handleOrder={this.handleOrder}
                  activeOrderButton={this.activeOrderButton}
                  handleSortIcon={this.handleSortIcon}
                />
                { this.composePosts() }
              </Col>
              <Col lg="4">
                <Card>
                  <CardBody className="py-5">
                    <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                      <i className="ni ni-planet" />
                    </div>
                    <h6 className="text-warning text-uppercase">
                      Prepare Launch
                    </h6>
                    <p className="description mt-3">
                      Argon is a great free UI package based on Bootstrap
                      4 that includes the most important components and
                      features.
                    </p>
                    <div>
                      <Badge color="warning" pill className="mr-1">
                        marketing
                      </Badge>
                      <Badge color="warning" pill className="mr-1">
                        product
                      </Badge>
                      <Badge color="warning" pill className="mr-1">
                        launch
                      </Badge>
                    </div>
                    <Button
                      className="mt-4"
                      color="warning"
                      href="#pablo"
                    >
                      Learn more
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <CustomModal
          modal={this.state.postModal}
        />
      </main>
    );
  }
}

export default Home;
