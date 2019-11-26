import React, { Component } from "react";
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


class Search extends Component {
  constructor() {
    super();
    this.state = {
     searchText:"",
     regions:[]
    };

   
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  
  }
  //get the books data from backend
  componentWillMount() {
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://" + hostAddress + ":" + port + "/getlocation/getlocation"
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          regions:this.state.regions.concat(response.data.details)
        });
      });
    }
  

  inputChangeHandler = e => {
    console.log("Blehh");
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  render() {
    let display = null;
    let redirec = null;
    if (localStorage.getItem("email") == null) {
      redirec = <Redirect to="/home" />;
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
                name="searchText"
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

         
        </div>
      </div>
    );
  }
}

//export Home Component
export default Search;
