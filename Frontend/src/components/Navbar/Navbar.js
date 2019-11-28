import React , { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink,  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import {Redirect} from 'react-router';
import axios from "axios";
import { hostAddress, port } from "../../config";
import Modal from "react-modal";
import { ButtonGroup, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


require('@firebase/auth');
require('@firebase/firestore');


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

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      fullname: "Pending",
      email: "Pending",
      address: "Pending",
      zipcode: 0,
      city: "Pending",
      country: "Pending",
      mobile: 0,
      updateFlag: false,
      password: "default"
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  componentWillMount() {
  
  }

  handleLogout = () => {
    if(localStorage.getItem("jwtToken")=="Alaukika"){
      firebase.default.auth().signOut()}
    
    localStorage.clear();
  };


  inputChangeHandler = e => {
    console.log("Blehh");
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  openModal() {
    if(localStorage.getItem("jwtToken")=="Alaukika"){
      
            this.setState({
              email: localStorage.getItem("email"),
              fullname: localStorage.getItem("fullname"),
              modalIsOpen: true
            });
       
        
    }else{
    if(localStorage.getItem("email")!=null){
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
            country: response.data.details.country,
            modalIsOpen: true
            //image : "http://"+hostAddress+":"+port+"/images/all/" + response.data.image+ ""
          });
        });
      }
    }
    // this.setState({  });
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
   // let redirec = null;
    let navLogin = null;
    let redirectVar = null;

    if (localStorage.getItem("email") == null) {
     // redirec = <Redirect to="/home" />;
    }

    if (!this.state.updateFlag) {
      console.log("holaa");
      display = (
        <div style={{ margin: "0 10% 0 10%" }}>
          <div
            className="row"
            style={{ fontSize: "24px", justifyContent: "center" }}
          >
            {this.state.fullname}
          </div>
          <div className="row" style={{ fontSize: "13px" }}>
            <div className="col-md-6">
              <label>Email:</label>
            </div>
            <div className="col-md-6">
              <label>Mobile:</label>
            </div>
          </div>
          <div
            className="row"
            style={{ fontSize: "13px", justifyContent: "center" }}
          >
            <div className="col-md-6">{this.state.email}</div>
            <div className="col-md-6">{this.state.mobile}</div>
          </div>
          <div className="row" style={{ fontSize: "13px" }}>
            <div className="col-md-6">
              <label>Address:</label>
            </div>
            <div className="col-md-6">
              <label>ZipCode:</label>
            </div>
          </div>
          <div className="row" style={{ fontSize: "13px" }}>
            <div className="col-md-6">{this.state.address}</div>
            <div className="col-md-6">{this.state.zipcode}</div>
          </div>

          <div className="row" style={{ fontSize: "13px" }}>
            <div className="col-md-6">
              <label>City:</label>
            </div>
            <div className="col-md-6">
              <label>Country:</label>
            </div>
          </div>
          <div className="row" style={{ fontSize: "13px" }}>
            <div className="col-md-6">{this.state.city}</div>
            <div className="col-md-6">{this.state.country}</div>
          </div>
          <div>
            <br></br>
            <ButtonGroup style={{ float:"left" ,textAlign:"center", marginLeft:"25%"}}>
              <Button
                color="info"
                style={{
                  fontSize: "15px",
                 margin:"5px",
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
                  margin:"5px",
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
                <Label for="FullName" style={{ fontSize: "13px" }}>
                  Full Name
                </Label>
                <Input
                  type="text"
                  name="fullName"
                  id="fullname"
                  onChange={this.inputChangeHandler.bind(this)}
                  style={{ fontSize: "13px" }}
                  value={this.state.fullname}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Email" style={{ fontSize: "13px" }}>
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="Email"
                  style={{ fontSize: "13px" }}
                  value={this.state.email}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row Form>
            <Col md={12}>
              <FormGroup>
                <Label for="Address" style={{ fontSize: "13px" }}>
                  Address
                </Label>
                <Input
                  type="text"
                  name="address"
                  onChange={this.inputChangeHandler.bind(this)}
                  id="exampleAddress"
                  style={{ fontSize: "13px" }}
                  value={this.state.address}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="City" style={{ fontSize: "13px" }}>
                  City
                </Label>
                <Input
                  type="text"
                  name="city"
                  onChange={this.inputChangeHandler.bind(this)}
                  id="City"
                  style={{ fontSize: "13px" }}
                  value={this.state.city}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Zip" style={{ fontSize: "13px" }}>
                  Zip Code
                </Label>
                <Input
                  type="text"
                  name="zipcode"
                  onChange={this.inputChangeHandler.bind(this)}
                  id="Zip"
                  style={{ fontSize: "13px" }}
                  value={this.state.zipcode}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="Country" style={{ fontSize: "13px" }}>
                  Country
                </Label>
                <Input
                  type="text"
                  name="country"
                  onChange={this.inputChangeHandler.bind(this)}
                  id="Country"
                  style={{ fontSize: "13px" }}
                  value={this.state.country}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Mobile" style={{ fontSize: "13px" }}>
                  Mobile
                </Label>
                <Input
                  type="text"
                  name="mobile"
                  id="Mobile"
                  onChange={this.inputChangeHandler.bind(this)}
                  style={{ fontSize: "13px" }}
                  value={this.state.mobile}
                />
              </FormGroup>
            </Col>
          </Row>
<Row>
          <ButtonGroup  style={{  float:"left", marginLeft:"30%" }}>
            <Button
              color="info"
              style={{
                fontSize: "15px",
                // margin: "0 30% 0 0",
                width: "80px",
                marginLeft: "7px",
                // float:"right"
              }}
              onClick={this.makeChange}
            >
              Update
            </Button>
            <Button
              color="danger"
              style={{
                fontSize: "15px",
                // margin: "0 30% 0 0",
                marginLeft: "7px",
                width: "80px"
              }}
              onClick={this.closeModal}
            >
              Cancel
            </Button>
          </ButtonGroup>
          </Row>
        </Form>
      );
    }

  
    if (localStorage.getItem("email") != null) {
      console.log("Able to read user");
    //  redirectVar = <Redirect to="/userhome"/>
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <NavItem>
              <NavLink
          href="/userhome" style={{marginRight:"10px",fontSize:"16px"}}
              >
                <span class="glyphicon glyphicon-search"></span> Search
              </NavLink>{" "}
            </NavItem>
          </li>
          <li>
            <NavItem>
              <NavLink
              style={{marginRight:"10px",fontSize:"16px"}}
                colour="danger"
                onClick={this.openModal}
              >
                <span class="glyphicon glyphicon-user"></span> {localStorage.getItem('fullname')}
              </NavLink>{" "}
            </NavItem>
          </li>
           <li>
            <NavItem>
              <NavLink
              style={{marginRight:"10px",fontSize:"16px"}}
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
          <NavLink colour="danger" href="/login" style={{marginRight:"10px", fontSize:"16px"}}>
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
              style={{ height: "50px", marginTop: "10%" , paddingBottom:"10%" }}
            ></img>
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            {navLogin}
          </Nav>
        </Navbar>


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
    );
  }
}

export default TopBar;





