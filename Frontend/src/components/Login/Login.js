import React, { Component } from "react";
import GoogleLogin from 'react-google-login'
import "../../App.css";
import axios from "axios";
import { Redirect } from "react-router";
import { Row, Col, Form, Button } from "react-bootstrap";
import { hostAddress, port } from "../../config";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authFlag: false
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //submit Login handler to send a request to the node backend
  submitLogin = e => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://" + hostAddress + ":" + port + "/login/login", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        alert(response.data.msg);
        if (response.data.token != null) {
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("email", this.state.email);
          localStorage.setItem("fullname", response.data.name);
          this.setState({
            authFlag: true
          });
        } else {
          this.setState({
            authFlag: false
          });
        }
      })
      .catch(() => {
        alert("Could Not Login!:(");
      });
  };

   responseGoogle = async (response) => {
    console.log(response);
    const userObject = {
      username: response.w3,
      password: 'test'
   }
   if(response.w3) {
      await localStorage.setItem("user", JSON.stringify(userObject));
      await window.location.reload();
   } else {

}

  }
  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (localStorage.getItem("jwtToken")) {
      redirectVar = <Redirect to="/userhome" />;
    }
    // if (localStorage.getItem("user")) {
    //   redirectVar = <Redirect to="/userhome" />;
    // }
    return (
      <Row>
        {redirectVar}
        <Col
          className="col-sm-8"
          style={{
            backgroundImage:
              "url(https://i0.wp.com/www.upinpoole.co.uk/wp-content/uploads/2018/11/background-colour.png?ssl=1)",
            height: "700px"
          }}
        >
          {/* <img
            style={{ width: "100%" }}
            src="https://i0.wp.com/www.upinpoole.co.uk/wp-content/uploads/2018/11/background-colour.png?ssl=1"
          ></img> */}
        </Col>
        <Col className="col-sm-3 home">
          <br></br>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.inputChangeHandler}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.inputChangeHandler}
              />
            </Form.Group>

            <Button
              style={{ float: "right" }}
              onClick={this.submitLogin}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
            {/* <GoogleLogin /> */}
          </Form>

          <GoogleLogin
    clientId="1060379313741-aedbu3ftoqsmhjk3moq7sre2ohpd559n.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,
          <br></br>
          <div style={{ paddingTop: "10px" }}>
            <a href="/signup" style={{ textAlign: "center" }}>
              Not a Member? Sign Up!
            </a>
          </div>
        </Col>
      </Row>
    );
  }
}
//export Login Component
export default Login;
