import React from 'react';
import axios from 'axios';
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from 'reactstrap';
import Filters from '../../components/Filters';
import HomeBanner from "./HomeBanner";


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: 'created_at',
      ascSort: false,
      filter: false,
      posts: []
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
    axios.get('/api/v1/posts/', {params: params})
    .then(res => {
      this.setState({ posts: res.data });
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
   * Create the post cards after the request.
   *
   * @public
   */
  composePosts() {
    return this.state.posts.map((post, i) => {
      return (
        <Card className="shadow border-0 mb-4" key={i}>
          <CardBody>
            <p className="description text-muted mt-0">Postado por @{post.user}, em {post.created_at}</p>
            <a href={`/posts/${post.id}/${post.slug}`}>
              <h6 className="text-primary text-uppercase">{post.title}</h6>
            </a>
            <p className="mt-3" style={{'color': '#525f7f'}}>{post.text}</p>
            <div className="data-container">
              <Badge color="secondary" pill className="mr-1">
                {post.answers.length} respostas
              </Badge>
              <Badge color="secondary" pill className="mr-1">
                {post.likes} likes
              </Badge>
            </div>
          </CardBody>
        </Card>
      )
    })
  }

  render() {
    return (
      <main className="mt-7" ref="main">
        <HomeBanner />
        <section className="section section-lg pt-lg-0 mt--200">
          <Container>
            <Row className="justify-content-center">
              <Col sm lg="8">
                <Filters
                  handleOrder={this.handleOrder}
                  activeOrderButton={this.activeOrderButton}
                  handleSortIcon={this.handleSortIcon}
                />
                { this.composePosts() }
              </Col>
              <Col lg="4">
                <Card className="shadow border-0">
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
                      onClick={e => e.preventDefault()}
                    >
                      Learn more
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    );
  }
}

export default Home;
