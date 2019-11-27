import React, { Component } from "react";
import axios from "axios";
import { hostAddress, port } from "../../config";
import Modal from "react-modal";
import { ButtonGroup, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";
import './Search.css';
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
     regions:[],
     searchFlag:false,
     searchResult:[{"disease":"Duseaese","drug":["drug 1, drug 2"]},{"disease":"Duseaese","drug":["drug 1, drug 2"]},{"disease":"Duseaese", "drug":["drug 1, drug 2"]}]
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
  
    searchRegion=e=>{
      this.setState({
        searchFlag:true
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
    let tablecontent=[];
    if (localStorage.getItem("email") == null) {
      redirec = <Redirect to="/home" />;
    }
if(!this.state.searchFlag){
  display=(  
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
    <button onClick={this.searchRegion.bind(this)}>PressMe</button>
  </div>
)
}else{
  let details=this.state.searchResult.map(item=>{
    tablecontent.push(<tr><td  style={{}}>{item.disease}</td><td  style={{}}>{item.drug}</td></tr>
    )

    })

display=(
<div class="container">
  <div style={{textAlign:"center"}}>
    <span style={{justifyContent:"space-evenly", marginTop:"100px",fontSize:"18px", color:"white"}}>Location : </span>
    <span>{this.state.searchText}</span>
    </div>
    <table class="table" style={{backgroundColor:"white", margin:"30px"}}>    
    <thead>
      <th>Disease</th>
      <th>Drug</th>
      </thead>                    
                        <tbody>
                          
                            {/*Display the Tbale row based on data recieved*/}
                            {tablecontent}
                        </tbody>
                    </table>

</div>)

  
}
  
    return (
      <div style={{
        backgroundImage:
          "url(https://www.freewalldownload.com/cristiano-ronaldo/portugal-free-cristiano-ronaldo-hd-football-mobile-desktop-download-wallpapers-images.jpg)",
        backgroundSize: "100% 100%"
      }}>
        {redirec}
        <div
        >
           <div>
           {display}
     
           </div>
     
          <br></br>

         
        </div>
      </div>
    );
  }
}

//export Home Component
export default Search;
