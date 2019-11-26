import React, { Component } from "react";
import {
  Jumbotron,
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";
import { hostAddress, port } from "../../config";
import Modal from "react-modal";
import { ButtonGroup, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

const customStyles = {
  content: {
    top: "55%",
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
      fullname: "Cristiano Ronaldo",
      email: "admin@admin.com",
      address: "383 Stockton Avenue",
      zipcode: "95126",
      city: "San Jose",
      country: "USA",
      mobile: "8866215479",
      updateFlag: false,
      password: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.inputChangeHandler = this.inputChangeHandler.bind(this);
    // this.sendMessage = this.sendMessage.bind(this);
  }
  //get the books data from backend
  componentWillMount() {
    axios.defaults.withCredentials = true;
    const data = {
      email: localStorage.getItem("email")
    };
    console.log("hi", data);
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/profile/profile",
        data,
        config
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          email: response.data.details.email,
          fullname: response.data.details.fullname,
          mobile: response.data.details.mobile,
          address: response.data.details.address,
          city: response.data.details.city,
          zipcode: response.data.details.zipcode,
          country: response.data.details.country
          //image : "http://"+hostAddress+":"+port+"/images/all/" + response.data.image+ ""
        });
      });
  }

  inputChangeHandler = e => {
    console.log("Blehh");
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
    this.setState({ modalIsOpen: false, updateFlag: false });
  }

  updateProfile = e => {
    this.setState({
      updateFlag: true
    });
  };

  makeChange=e=>{
    axios.defaults.withCredentials = true;
    const data = {
      email: localStorage.getItem("email"),
      email: this.state.email,
      fullname: this.state.fullname,
      mobile: this.state.mobile,
      address: this.state.address,
      city: this.state.city,
      zipcode: this.state.zipcode,
      country: this.state.country
    };
    console.log("hi", data);
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/updateprofile/updateprofile",
        data,
        config
      )
      .then(response => {
        console.log(response.data);
        alert(response.data);
        this.closeModal();
      });
  }

  render() {
    let display = null;
    let redirec = null;
    if (localStorage.getItem("email") == null) {
      redirec = <Redirect to="/home" />;
    }

    if (!this.state.updateFlag) {
      console.log("holaa");
      display = (
        <div style={{ margin: "0 10% 0 10%" }}>
          <div
            className="row"
            style={{ fontSize: "30px", justifyContent: "center" }}
          >
            {this.state.fullname}
          </div>
          <div className="row" style={{ fontSize: "15px" }}>
            <div className="col-md-6">
              <label>Email:</label>
            </div>
            <div className="col-md-6">
              <label>Mobile:</label>
            </div>
          </div>
          <div
            className="row"
            style={{ fontSize: "20px", justifyContent: "center" }}
          >
            <div className="col-md-6">{this.state.email}</div>
            <div className="col-md-6">{this.state.mobile}</div>
          </div>
          <div className="row" style={{ fontSize: "15px" }}>
            <div className="col-md-6">
              <label>Address:</label>
            </div>
            <div className="col-md-6">
              <label>ZipCode:</label>
            </div>
          </div>
          <div className="row" style={{ fontSize: "20px" }}>
            <div className="col-md-6">{this.state.address}</div>
            <div className="col-md-6">{this.state.zipcode}</div>
          </div>

          <div className="row" style={{ fontSize: "15px" }}>
            <div className="col-md-6">
              <label>City:</label>
            </div>
            <div className="col-md-6">
              <label>Country:</label>
            </div>
          </div>
          <div className="row" style={{ fontSize: "20px" }}>
            <div className="col-md-6">{this.state.city}</div>
            <div className="col-md-6">{this.state.country}</div>
          </div>
          <div>
            <ButtonGroup style={{ justifyContent: "center" }}>
              <Button
                color="info"
                style={{
                  fontSize: "15px",
                  margin: "0 5% 0 0",
                  width: "80px"
                }}
                onClick={this.updateProfile}
              >
                Update
              </Button>
              <Button
                color="danger"
                style={{
                  fontSize: "15px",
                  margin: "0 5% 0 0",
                  width: "80px"
                }}
                onClick={this.closeModal}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </div>
        </div>
      );
    } else {
      display = (
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="FullName" style={{ fontSize: "15px" }}>
                  Full Name
                </Label>
                <Input
                  type="text"
                  name="fullName"
                  id="fullname"
                  onChange={this.inputChangeHandler.bind(this)}
                  style={{ fontSize: "20px" }}
                  value={this.state.fullname}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Email" style={{ fontSize: "15px" }}>
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="Email"
                  style={{ fontSize: "20px" }}
                  value={this.state.email}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row Form>
            <Col md={12}>
              <FormGroup>
                <Label for="Address" style={{ fontSize: "15px" }}>
                  Address
                </Label>
                <Input
                  type="text"
                  name="address"
                  onChange={this.inputChangeHandler.bind(this)}
                  id="exampleAddress"
                  style={{ fontSize: "20px" }}
                  value={this.state.address}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="City" style={{ fontSize: "15px" }}>
                  City
                </Label>
                <Input
                  type="text"
                  name="city"
                  onChange={this.inputChangeHandler.bind(this)}
                  id="City"
                  style={{ fontSize: "20px" }}
                  value={this.state.city}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Zip" style={{ fontSize: "15px" }}>
                  Zip Code
                </Label>
                <Input
                  type="text"
                  name="zipcode"
                  onChange={this.inputChangeHandler.bind(this)}
                  id="Zip"
                  style={{ fontSize: "20px" }}
                  value={this.state.zipcode}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="Country" style={{ fontSize: "15px" }}>
                  Country
                </Label>
                <Input
                  type="text"
                  name="country"
                  onChange={this.inputChangeHandler.bind(this)}
                  id="Country"
                  style={{ fontSize: "20px" }}
                  value={this.state.country}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Mobile" style={{ fontSize: "15px" }}>
                  Mobile
                </Label>
                <Input
                  type="text"
                  name="mobile"
                  id="Mobile"
                  onChange={this.inputChangeHandler.bind(this)}
                  style={{ fontSize: "20px" }}
                  value={this.state.mobile}
                />
              </FormGroup>
            </Col>
          </Row>

          <ButtonGroup style={{ justifyContent: "center" }}>
            <Button
              color="info"
              style={{
                fontSize: "15px",
                margin: "0 5% 0 0",
                width: "80px"
              }}
              onClick={this.makeChange}
            >
              Update
            </Button>
            <Button
              color="danger"
              style={{
                fontSize: "15px",
                margin: "0 5% 0 0",
                width: "80px"
              }}
              onClick={this.closeModal}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      );
    }

    return (
      <div>
        {redirec}
        <div
          style={{
            backgroundImage:
              "url(https://www.freewalldownload.com/cristiano-ronaldo/portugal-free-cristiano-ronaldo-hd-football-mobile-desktop-download-wallpapers-images.jpg)",
            backgroundSize: "100% 100%"
          }}
        >
          <h3 class="heading element-animate">
            <div>
              <input
                type="text"
                name="search"
                id="Search"
                size="30"
                align="middle"
                style={{
                  height: "50px",
                  margin: "15% 20% 30% 32%",
                  fontSize: "35px",
                  borderRadius: "25px"
                }}
              ></input>
            </div>
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
            <h2 ref={subtitle => (this.subtitle = subtitle)}>Profile</h2>

            <Card style={{ width: "50rem" }}>
              <Card.Img
                variant="top "
                style={{
                  width: "80px",
                  height: "80px",
                  margin: "0 40% 0 40%",
                  borderRadius: "100px"
                }}
                src="https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              />
              <Card.Body>{display}</Card.Body>
            </Card>
          </Modal>
        </div>
      </div>
    );
  }
}

//export Home Component
export default Profile;
