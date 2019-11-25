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
import { ButtonGroup, Card } from "react-bootstrap";

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

class Profile extends Component {
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
   
  }

  render() {
    return (
      <Jumbotron>
        <div class="container">
          <div class="row text-center justify-content-center">
            <h3 class="heading element-animate">
              <b>Search Page</b>
            </h3>
            <br></br>
            
            <Button
              color="info"
              style={{ width: "8%", fontSize: "90%" }}
              onClick={this.openModal}
            >
            Profile
            </Button>

            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={subtitle => (this.subtitle = subtitle)}>Contact Us</h2>

              <Card style={{ width: '30rem' }}>
  <Card.Img variant="top" style={{width:"80px", height:"100px", margin:"0 35% 0 35%", borderRadius:"50px"}} src="https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    

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
                    Update
                  </Button>
                  <Button
                    color="danger"
                    style={{ fontSize: "90%", margin: "0 5% 0 0" }}
                    onClick={this.closeModal}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
                </Card.Body>
</Card>
            </Modal>
          </div>
        </div>
      </Jumbotron>
    );
  }
}

//export Home Component
export default Profile;
