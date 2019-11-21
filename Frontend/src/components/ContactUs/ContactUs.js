import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";

import { Row, Col, Form, Button } from "react-bootstrap";

class ContactUs extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      message: ""
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        email: localStorage.getItem("email")
      });
    }
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //submit Login handler to send a request to the node backend
  sendMessage = e => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      email: this.state.email,
      message: this.state.message
    };

    // //set the with credentials to true
    // axios.defaults.withCredentials = true;
    // //make a post request with the user data
    // axios.post("http://localhost:3001/login", data).then(response => {
    //   console.log("Status Code : ", response.status);
    //   if (response.status === 200) {
    //     this.setState({
    //       authFlag: true
    //     });
    //   } else {
    //     this.setState({
    //       authFlag: false
    //     });
    //   }
    // });
  };

  render() {
    return (
      <Row>
        <Col
          className="col-sm-8"
          style={{
            backgroundImage:
              "url(https://i0.wp.com/www.upinpoole.co.uk/wp-content/uploads/2018/11/background-colour.png?ssl=1)",
            height: "700px"
          }}
        >
          <img
            style={{ width: "100%" }}
            src="https://i0.wp.com/www.upinpoole.co.uk/wp-content/uploads/2018/11/background-colour.png?ssl=1"
          ></img>
        </Col>
        <Col className="col-sm-3">
          <div style={{ margin: "10%" }}>
            <h3 class="heading element-animate">
              <b>Contact Us</b>
            </h3>
            <p class="sub-heading element-animate mb-5">
              We love Feedbacks! </p>
              <p class="sub-heading element-animate mb-5"> Tell us what you thing about Wellpharma and how
              we can improve on it!!
            </p>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Email" value={this.state.email} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Message</Form.Label>
                <Form.Control type="text" placeholder="Your Message..." />
              </Form.Group>
              
              <br></br>
              
              <Button
                onClick={this.submitLogin}
                variant="primary"
                type="submit"
              >
                Send
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

export default ContactUs;
