import React from "react";
import {Col, Container, Row} from "reactstrap";

class HomeBanner extends React.Component {
  render() {
    return (
      <div className="position-relative">
        <section className="section section-lg pb-250 bg-gradient-warning">
          <Container className="py-lg-md d-flex">
            <div className="col px-0">
              <Row>
                <Col lg="6">
                  <h1 className="display-3 text-white">
                    Olá, este é o Forum!
                  </h1>
                  <p className="lead text-white mt-0">
                    Um mundo de perguntas e respostas.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </div>
    )
  }
}

export default HomeBanner;