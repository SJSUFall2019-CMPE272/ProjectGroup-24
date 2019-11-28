import React, { Component } from "react";
import {
  Jumbotron,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";
import { hostAddress, port } from "../../config";
import Modal from "react-modal";
import { ButtonGroup } from "react-bootstrap";

const config = {
  headers:{
      'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
      'Content-Type': 'application/json'
    }
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class About extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      email:"",
      message:""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  //get the books data from backend
  componentDidMount() {}

  inputChangeHandler = e => {
    console.log("Blehh")
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#0e0e0e";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  sendMessage = e => {
    //prevent page from refresh
    console.log("Hi tehre")
    e.preventDefault();
    const data = {
      email: this.state.email,
      message: this.state.message
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://" + hostAddress + ":" + port + "/contactus/contactus", data,config)
      .then(response => {
        console.log("Status Code : ", response.status);
        alert(response.data.msg);
        this.closeModal();
    })
  }

  render() {
    return (
      <Jumbotron>
        <div class="container">
          <div class="row text-center justify-content-center">
            <h3 class="heading element-animate">
              <b>About Us</b>
            </h3>
            <br></br>
            <h4 class="sub-heading element-animate mb-5" >
              Many valuable information regarding the public health and welfare,
              disease outbreaks and their trend are available in the form of
              unstructured data lying in different news portals, Facebook,
              Twitter. It becomes important to become aware of the current
              diseases and to filter out relevant and correct information. This
              is especially important for commercial pharmacies as their need to
              be updated with the current outbreak in their region and also be
              ready stock-wise for the drugs needed to treat them. Our objective
              with Well-Pharma is to address this problem and built a system for
              the pharmacies which will analyse the disease outbreaks in all
              regions and carry out a disease-to-drug mapping and alert the
              pharmacist so as to keep the stock ready. WellPharma will be a Web
              Application - built as an automated system for querying filtering
              and visualising the disease outbreak and to stock their respective
              drugs.
            </h4>
            <Button
              color="info"
              style={{ width: "7%", fontSize: "13px", height:"37px" }}
              onClick={this.openModal}
            
            >
              Contact Us!
            </Button>

            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={subtitle => (this.subtitle = subtitle)}>Contact Us</h2>

              <Form>
                <FormGroup>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    style={{ width: "300px", marginTop: "16px" }}
                    placeholder="Email ID"
                    onChange={this.inputChangeHandler}
                  />
                </FormGroup>
                <FormGroup row>
                  <Input
                    type="textarea"
                    name="message"
                    id="message"
                    style={{ width: "300px", margin: "16px" }}
                    placeholder="Enter Message"
                    onChange={this.inputChangeHandler}
                  />
                </FormGroup>
                <ButtonGroup style={{ float: "right", marginRight: "5px" }}>
                  <Button
                    color="info"
                    style={{
                      fontSize: "90%",
                      margin: "0 5% 0 0",
                      width: "80px"
                    }}
                    onClick={this.sendMessage}
                  >
                    Send
                  </Button>
                  <Button
                    color="danger"
                    style={{ fontSize: "90%", margin: "0 5% 0 0" }}
                    onClick={this.closeModal}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </Form>
            </Modal>
          </div>
        </div>
      </Jumbotron>
    );
  }
}

//export Home Component
export default About;
