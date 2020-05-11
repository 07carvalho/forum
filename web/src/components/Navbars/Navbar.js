import React from "react";
import { Link } from "react-router-dom";
import {
  NavbarBrand,
  Navbar,
  Nav,
  Container,
} from "reactstrap";

class ForumNavbar extends React.Component {
  render() {
    return (
      <div>
        <Navbar color="default" fixed="top">
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <img
                alt="..."
                src={require('../../assets/img/brand/argon-react-white.png')}
              />
            </NavbarBrand>
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              <ul className="align-items-center d-none d-md-flex navbar-nav">
                <li className="nav-item">
                  <a className="pr-0 nav-link" href="/">
                    <div className="align-items-center media">
                      <span className="avatar avatar-sm rounded-circle">
                        <img alt="..." src={require("../../assets/img/profile/ada-lovelace.jpg")} />
                      </span>
                      <div className="ml-2 d-none d-lg-block media">
                        <span className="mb-0 text-white text-sm font-weight-bold">Ada Lovelace</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default ForumNavbar;
