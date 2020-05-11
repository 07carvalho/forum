import React from "react";
import classnames from "classnames";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import axios from "axios";

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: null
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    axios.get(`/api/v1/posts/${params.id}`)
    .then(res => {
      // eslint-disable-next-line
      console.log(res.data);
      this.setState({ post: res.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <main className="mt-7" ref="main">
        <section className="section bg-secondary">
          <Container>
            <Row className="row-grid align-items-center">
              <Col md="6">
                <Card className="bg-default shadow border-0">
                  <CardImg
                    alt="..."
                    src=""
                    top
                  />
                  <blockquote className="card-blockquote">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-bg"
                      preserveAspectRatio="none"
                      viewBox="0 0 583 95"
                    >
                      <polygon
                        className="fill-default"
                        points="0,52 583,95 0,95"
                      />
                      <polygon
                        className="fill-default"
                        opacity=".2"
                        points="0,42 583,95 683,0 0,95"
                      />
                    </svg>
                    <h4 className="display-3 font-weight-bold text-white">
                      Design System
                    </h4>
                    <p className="lead text-italic text-white">
                      The Arctic Ocean freezes every winter and much of the
                      sea-ice then thaws every summer, and that process will
                      continue whatever happens.
                    </p>
                  </blockquote>
                </Card>
              </Col>
              <Col md="6">
                <div className="pl-md-5">
                  <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                    <i className="ni ni-settings" />
                  </div>
                  <h3>Our customers</h3>
                  <p className="lead">
                    Don't let your uses guess by attaching tooltips and
                    popoves to any element. Just make sure you enable them
                    first via JavaScript.
                  </p>
                  <p>
                    The kit comes with three pre-built pages to help you get
                    started faster. You can change the text and images and
                    you're good to go.
                  </p>
                  <p>
                    The kit comes with three pre-built pages to help you get
                    started faster. You can change the text and images and
                    you're good to go.
                  </p>
                  <a
                    className="font-weight-bold text-warning mt-5"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    A beautiful UI Kit for impactful websites
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    );
  }
}

export default Post;
