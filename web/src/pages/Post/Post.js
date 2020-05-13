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
import axios from "axios";
import Form from "reactstrap/lib/Form";

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

  getAnswersLabel = () => {
    const len = this.state.post.answers.length;
    if (len === 1) {
      return <h4>{len} Resposta</h4>
    }
    return <h4>{len} Respostas</h4>
  }

  render() {
    return (
      <main className="mt-7" ref="main">
        <section className="section">
          <Container>
            <Row className="row-grid">
              {/*{this.state.post && <div>*/}

              {/*</div>*/}
              <Col sm lg="8">
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
                      <Badge color="secondary" pill>
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
                      />
                      <div className="mt-3 d-flex align-items-center justify-content-end">
                        <Button
                          color="primary"
                          type="button"
                          // disabled={this.disableButton(this.props.modal.inputs)}
                          // onClick={() => this.props.modal.submitMethod()}
                        >
                          Postar
                        </Button>
                      </div>
                    </Form>
                    {/*<h3 className="m-0 text-muted">Faça uma pergunta nova</h3>*/}
                  </CardBody>
                </Card>
                <hr />
                {this.state.post && this.getAnswersLabel()}
                {this.state.post &&
                <Card>
                  <CardBody>
                    {this.state.post.answers.map(item => {
                      return (
                        <div>
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
                                <Badge color="secondary" pill className="ml--1">
                                  {item.likes} likes
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </CardBody>
                </Card>}
              </Col>
              <Col sm lg="4">
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
