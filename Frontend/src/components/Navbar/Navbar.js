import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import {Redirect} from 'react-router';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    localStorage.clear();
  };

  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    let redirectVar = null;
    if (localStorage.getItem("email") != null) {
      console.log("Able to read user");
     redirectVar = <Redirect to="/userhome"/>
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <NavItem>
              <NavLink
                colour="danger"
                onClick={this.handleLogout}
                href="/login"
              >
                <span class="glyphicon glyphicon-log-in"></span> Logout
              </NavLink>{" "}
            </NavItem>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      // cookie.remove("cookie", { path: '/' });
      console.log("Not Able to read cookie");

      navLogin = (
        <NavItem>
          <NavLink colour="danger" href="/login">
            <span class="glyphicon glyphicon-log-in"></span> Login
          </NavLink>
        </NavItem>
      );
    }

  

    return (
      <div>
        {redirectVar}
        <Navbar color="white" light expand="md">
          <NavbarBrand href="/home">
            <img
              alt="Grubhub App"
              src="https://www.pharmacienswellpharma.com/wp-content/themes/pharmacienwellpharma/assets/img/logo_WP-bleu-sans-fond.png"
              style={{ height: "50px", marginTop: "10%" }}
            ></img>
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            {navLogin}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default TopBar;
