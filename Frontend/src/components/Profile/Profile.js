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
import 'bootstrap/dist/css/bootstrap.min.css';

const config = {
  headers:{
      'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
      'Content-Type': 'application/json'
    }
}

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
      fullname:"Cristiano Ronaldo",
      email:"admin@admin.com",
      address:"383 Stockton Avenue",
      zipcode:"95126",
      city:"San Jose",
      country:"USA",
      mobile:"8866215479",
      updateFlag:false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.inputChangeHandler = this.inputChangeHandler.bind(this);
    // this.sendMessage = this.sendMessage.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
 axios.defaults.withCredentials = true;
// const data={email: "admin@admin.com"}
//         //make a post request with the user data
        axios.post('http://'+hostAddress+':'+port+'/profile/profile',data,config)
                .then((response) => {
                    
                   
                this.setState({
                email : response.data.email,
                fullname: response.data.fullname,
                mobile : response.data.mobile,
                address : response.data.address,
                city : response.data.city,
                zipcode : response.data.zipcode,
                country : response.data.country
                //image : "http://"+hostAddress+":"+port+"/images/all/" + response.data.image+ "" 
                });
                
            });
  }

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

  updateProfile = e => {
   this.setState({
     updateFlag:true
   })
  }

  render() {

let display=null;
if(!this.state.updateFlag){
console.log("holaa")
display=(
  <div style ={{margin:"0 10% 0 10%"}}>
    <div className="row"  style ={{fontSize:"30px",justifyContent:"center"}}>{this.state.fullname}</div>
    <div className="row" style ={{fontSize:"15px"}}>
      <div className="col-md-6"><label>Email:</label></div>
      <div className="col-md-6"><label>Mobile:</label></div>
    </div>
<div className= "row" style ={{fontSize:"20px",justifyContent:"center"}}>
  <div className= "col-md-6">{this.state.email}</div>
  <div className= "col-md-6">{this.state.mobile}</div>
</div>
<div className="row" style ={{fontSize:"15px"}}>
      <div className="col-md-6"><label>Address:</label></div>
      <div className="col-md-6"><label>ZipCode:</label></div>
</div>
<div className="row" style={{fontSize:"20px"}}>
  <div className="col-md-6">{this.state.address}</div>
  <div className="col-md-6">{this.state.zipcode}</div>
</div>

<div className="row" style ={{fontSize:"15px"}}>
      <div className="col-md-6"><label>City:</label></div>
      <div className="col-md-6"><label>Country:</label></div>
</div>
<div className="row" style={{fontSize:"20px"}}>
  <div className="col-md-6">{this.state.city}</div>
  <div className="col-md-6">{this.state.country}</div>
</div>
<div>
<ButtonGroup style={{justifyContent:"center"}}>
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
)
}else{
  display=(
   
      <Form>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="Email" style={{fontSize:"15px"}}>Email</Label>
            <Input type="email" name="email" id="Email" style={{fontSize:"20px"}} placeholder={this.state.email} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="Mobile" style={{fontSize:"15px"}}>Mobile</Label>
            <Input type="text" name="password" id="Mobile" style={{fontSize:"20px"}} placeholder={this.state.mobile} />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
          <Label for="Address" style={{fontSize:"15px"}}>Address</Label>
           <Input type="text" name="address" id="exampleAddress" style={{fontSize:"20px"}} placeholder={this.state.address}/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
          <Label for="Zip" style={{fontSize:"15px"}}>Zip Code</Label>
            <Input type="text" name="zip" id="Zip" style={{fontSize:"20px"}} placeholder={this.state.zipcode}/>
          </FormGroup>
        </Col>
      </Row>
      
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="City" style={{fontSize:"15px"}}>City</Label>
            <Input type="text" name="city" id="City" style={{fontSize:"20px"}} placeholder={this.state.city}/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="Country" style={{fontSize:"15px"}}>Country</Label>
            <Input type="text" name="country" id="Country" style={{fontSize:"20px"}} placeholder={this.state.country}/>
          </FormGroup>
        </Col>
      </Row>
     
     
      <ButtonGroup style={{justifyContent:"center"}}>
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
  </Form>
  )
}


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
              <h2 ref={subtitle => (this.subtitle = subtitle)}>Profile</h2>

              <Card style={{ width: '50rem' }}>
  <Card.Img variant="top " style={{width:"80px", height:"80px", margin:"0 40% 0 40%", borderRadius:"100px"}} src="https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" />
  <Card.Body>
    
 
    
    {display}
                
                
               
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
