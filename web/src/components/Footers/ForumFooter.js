import React from "react";
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

class ForumFooter extends React.Component {
  render() {
    return (
      <footer className="footer has-cards">
        <hr />
        <Container>
          <Row className="align-items-center justify-content-md-between">
            <Col md="6">
              <div className="copyright">
                © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.linkedin.com/in/felipecarvalho07/"
                >
                  Felipe Carvalho
                </a>
                .
              </div>
            </Col>
            <Col md="6">
              <Nav className="nav-footer justify-content-end">
                <NavItem>
                  <NavLink
                    href="https://github.com/07carvalho"
                  >
                    GitHub
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default ForumFooter;
