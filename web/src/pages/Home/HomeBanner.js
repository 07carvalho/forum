import React from "react";
import {Col, Container, Row} from "reactstrap";

class HomeBanner extends React.Component {
  render() {
    return (
      <div className="position-relative"
           style={{'background': `url(${require('../../assets/img/theme/forum.jpeg')}) top center no-repeat`, 'backgroundPosition': 'top'}}>
        <section className="section section-lg" style={{'paddingBottom': '230px'}}>
          <Container className="py-lg-md d-flex">
            <div className="col px-0">
              <Row>
                <Col lg="6">
                  <h1 className="display-3 text-default">
                    Olá, este é o Forum!
                  </h1>
                  <p className="lead text-default mt-0">
                    Onde perguntas não ficam sem respostas.
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