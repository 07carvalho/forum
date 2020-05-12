import React from "react";
import {
  Badge,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
import axios from "axios";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    }
  }

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
    console.log(params);
    axios.get(`/api/v1/posts/${params.id}`)
    .then(res => {
      this.setState({ post: res.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <main className="mt-7" ref="main">
        <section className="section">
          <Container>
            <Row className="row-grid">
              <Col>
                {this.state.post && <Card className="shadow border-0 mb-4">
                  <CardBody>
                    <p className="description text-muted mt-0">Postado por @{this.state.post.user}, em {this.state.post.created_at}</p>
                    <h6 className="text-primary text-uppercase">{this.state.post.title}</h6>
                    <p className="mt-3" style={{'color': '#525f7f'}}>{this.state.post.text}</p>
                    <div className="data-container">
                      <Badge color="secondary" pill className="mr-1">
                        {this.state.post.answers.length} respostas
                      </Badge>
                      <Badge color="secondary" pill className="mr-1">
                        {this.state.post.likes} likes
                      </Badge>
                    </div>
                  </CardBody>
                </Card>}
                <hr />
                <h4>Respostas</h4>
                {this.state.post &&
                  this.state.post.answers.map(item => {
                    return (
                        <Card className="shadow border-0 mb-4">
                          <CardBody>
                            <p className="description text-muted mt-0">Postado por @{item.user},
                              em {item.created_at}</p>
                            <p className="mt-3" style={{'color': '#525f7f'}}>{item.text}</p>
                            <div className="data-container">
                              <Badge color="secondary" pill className="mr-1">
                                {item.likes} likes
                              </Badge>
                            </div>
                          </CardBody>
                        </Card>
                    )
                  }
                )}
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    );
  }
}

export default Post;
