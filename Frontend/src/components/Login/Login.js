import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import "../../App.css";
import axios from "axios";
import { Redirect } from "react-router";
import { Row, Col, Form, Button } from "react-bootstrap";
import { hostAddress, port } from "../../config";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


require('@firebase/auth');
require('@firebase/firestore');

firebase.initializeApp({
  apiKey: "AIzaSyCQeJFB522BMbD7ZUNX64bK5dd5o-0Jbe4",
  authDomain: "wellpharma.firebaseapp.com"
});
let uiConfig = {
  signInFlow: "redirect",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: { signInSuccess: () => false }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authFlag: false,
      isSignedIn: false
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {

      if(!!user){
        localStorage.setItem("jwtToken", "Alaukika");
        
      }
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
    });

    // this.setState({
    //   authFlag: false
    // });
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

  responseGoogle = async response => {
    console.log(response);
    const userObject = {
<<<<<<< HEAD
      username: response.w3,
      password: "test"
    };
    if (response.w3) {
=======
      username: response.w3.ofa,
      password: 'test'
   }
   if(response.w3.ofa) {
>>>>>>> 5ccda60a5b73ab6e2a2cf89fcd63b9d0a054391e
      await localStorage.setItem("user", JSON.stringify(userObject));
      await window.location.reload();
    } else {
    }
  };
  render() {
    let goog = null;
    //redirect based on successful login
    let redirectVar = null;
    if (this.state.isSignedIn) {
      localStorage.setItem("email", firebase.auth().currentUser.email);
      localStorage.setItem("mobile", firebase.auth().currentUser.phoneNumber);
      

        localStorage.setItem("fullname", firebase.default.auth().currentUser.displayName);
        redirectVar = <Redirect to="/userhome" />;
      goog = (
        <span>
          <div>Signed In!</div>
          <button onClick={() => firebase.default.auth().signOut()}>
            Sign out
          </button>
          <h1>WELCOME {firebase.default.auth().currentUser.displayName}</h1>
          <img alt="" src={firebase.auth().currentUser.photoURL} />
                
        </span>
      );
    } else {
      goog = ( // <div>Not Signed In!</div>
        <StyledFirebaseAuth style={{float:"left",marginRight:"100%"}}
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      );
    }


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
              "url(https://i.pinimg.com/originals/02/2e/96/022e9691c5ba65d23cbf27a53f83163e.jpg)",
            height: "700px"
          }}
        >
          {/* <img
            style={{ width: "100%" }}
            src="https://i0.wp.com/www.upinpoole.co.uk/wp-content/uploads/2018/11/background-colour.png?ssl=1"
          ></img> */}
        </Col>
        <Col className="col-sm-4 home" style={{ backgroundColor: "#f9f9f9" }}>
          <br></br>
          <img
            style={{ margin: "0 0 0 25%", height: "100px" }}
            src="https://www.pharmacienswellpharma.com/wp-content/themes/pharmacienwellpharma/assets/img/logo_WP-bleu-sans-fond.png"
          ></img>
          <Form style={{ marginTop: "10%" }}>
            <Form.Group
              controlId="formBasicEmail"
              style={{ width: "50%", marginLeft: "24%" }}
            >
              <Form.Label style={{ marginLeft: "5px" }}>
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                style={{ height: "30px", fontSize: "13px" }}
                onChange={this.inputChangeHandler}
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicPassword"
              style={{ width: "50%", marginLeft: "24%" }}
            >
              <Form.Label style={{ marginLeft: "5px" }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                style={{ height: "30px", fontSize: "13px" }}
                onChange={this.inputChangeHandler}
              />
            </Form.Group>

            <Button
              style={{ float: "left", marginLeft: "61%", fontSize: "13px" }}
              onClick={this.submitLogin}
              color="info"
              type="submit"
              backgroundColor="#00abc9"
            >
              Submit
            </Button>
            {/* <GoogleLogin /> */}
          </Form>
          {/* <GoogleLogin
    clientId="1060379313741-aedbu3ftoqsmhjk3moq7sre2ohpd559n.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
  />, */}
          <br></br>
          <div style={{ paddingTop: "10px" }}>
            <a
              href="/signup"
              style={{
                textAlign: "left",
                marginLeft: "-50%",
                fontSize: "13px"
              }}
            >
              Not a Member? Sign Up!
            </a>
          </div>
          {goog} 
        </Col>
      </Row>
    );
  }
}
//export Login Component
export default Login;
