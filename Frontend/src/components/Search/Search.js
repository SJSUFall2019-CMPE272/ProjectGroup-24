import React, { Component, useState } from "react";
import axios from "axios";
import { hostAddress, port } from "../../config";
import Modal from "react-modal";
import { ButtonGroup, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";
import './Search.css';
//import { Dropdown } from 'semantic-ui-react'
import {Dropdown, FormControl,Col,Row }from 'react-bootstrap'

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={e => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            child =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);


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
     searchResult:[{"disease":"Disease","drug":["drug 1, drug 2"]},{"disease":"Disease","drug":["drug 1, drug 2"]},{"disease":"Disease", "drug":["drug 1, drug 2"]}]
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
  
  selectHandle=e=>{
    alert(e);
    this.setState({
      searchFlag:true
    });
  }

  render() {
    let display = null;
    let redirec = null;
    let tablecontent=[];
    if (localStorage.getItem("email") == null) {
      redirec = <Redirect to="/home" />;
    }
if(!this.state.searchFlag){
  
  display=(  <Row >
    <Dropdown onSelect={(selected)=>{this.selectHandle(selected)}} style={{
      width:"400px",
      height:"50px",
      margin: "15% 33% 30% 33%",
      fontSize: "20px",
      borderRadius: "25px",
      backgroundColor:"white",
      textAlign:"center",
    }}>
    <Dropdown.Toggle  as={CustomToggle} id="dropdown-custom-components">
      Enter Region to Search
    </Dropdown.Toggle>

    <Dropdown.Menu as={CustomMenu}>
      <Dropdown.Item eventKey="1">Red</Dropdown.Item>
      <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
      <Dropdown.Item eventKey="3">Red-Orange</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  
  </Row>
  // <div>
  //   <input
  //     type="text"
  //     name="searchText"
  //     id="Search"
  //     size="30"
  //     align="middle"
  //     style={{
  //       height: "50px",
  //       margin: "15% 20% 30% 32%",
  //       fontSize: "35px",
  //       borderRadius: "25px"
  //     }}
  //   ></input>
  //   <button class="btn btn-primary" style={{marginleft:"-360px", margin:"-18px 0 0 -260px", margintop:"-18px", padding:"8px 32px", fontSize:"15px"}} onClick={this.searchRegion.bind(this)}>PressMe</button>
  // </div>
)
}else{
  let details=this.state.searchResult.map(item=>{
    tablecontent.push(<tr><td  style={{}}>{item.disease}</td><td  style={{}}>{item.drug}</td></tr>
    )

    })

display=(
<div class="container" style={{backgroundSize:"100% 100%"}}>
  <div style={{textAlign:"left", marginTop:"180px", marginLeft:"390px"}}>
    <span style={{justifyContent:"space-evenly", marginTop:"0px",fontSize:"18px", color:"black"}}><b>Location :</b>  </span>
    <span>{this.state.searchText}</span>  
    </div>
    <table class="table" align="center" border="5px solid black" style={{backgroundColor:"white", width:"400px", margin:"10px 0% 30% 35%" }}>    
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
      <div class="userhome">
        {redirec}
        <div
        >
           <div style={{textAlign:"center"}}>
             
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




