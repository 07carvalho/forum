import React from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class ForumNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require('../../assets/img/brand/argon-react-white.png')}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <ul className="align-items-center d-none d-md-flex navbar-nav">
                  <li className="nav-item">
                    <a className="pr-0 nav-link">
                      <div className="align-items-center media">
                        <span className="avatar avatar-sm rounded-circle">
                          <img alt="..." src={require("../../assets/img/profile/ada-lovelace.jpg")} />
                        </span>
                        <div className="ml-2 d-none d-lg-block media">
                          <span className="mb-0 text-sm font-weight-bold">Ada Lovelace</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </Nav>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default ForumNavbar;
