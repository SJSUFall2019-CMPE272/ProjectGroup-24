import React, { Component, useState } from "react";
import { Table } from 'reactstrap';
import axios from "axios";
import { hostAddress, port } from "../../config";
import Modal from "react-modal";
import { ButtonGroup, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router";
import "./Search.css";
import '../../App.css'
//import { Dropdown } from 'semantic-ui-react'
import { Dropdown, FormControl, Col, Row } from "react-bootstrap";

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
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

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
          style={{fontSize:"13px"}}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            child =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
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
      searchText: "",
      regions: [],
      searchFlag: false,
      //  searchResult:[{"disease":"Disease","drug":["drug 1, drug 2"]},{"disease":"Disease","drug":["drug 1, drug 2"]},{"disease":"Disease", "drug":["drug 1, drug 2"]}]
      searchResult: []
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }
  //get the books data from backend
  componentWillMount() {
    axios.defaults.withCredentials = true;
    axios
      .get("http://" + hostAddress + ":" + port + "/getlocation/getlocation")
      .then(response => {
        console.log(response.data);
        this.setState({
          regions: this.state.regions.concat(response.data.details)
        });
      });
  }

  searchRegion = e => {
    this.setState({
      searchFlag: true
    });
  };

  inputChangeHandler = e => {
    console.log("Blehh");
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  selectHandle = e => {
    //alert(e);
    console.log(e);
    const data = {
      region: e.toString()
    };
    console.log("Alaukika's data", data);
    axios.defaults.withCredentials = true;
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/searchlocation/searchlocation",
        data
      )
      .then(response => {
        console.log(response.data);

        this.setState({
          searchFlag: true,
          searchText: data.region,
          searchResult: this.state.searchResult.concat(response.data.details)
        });
      });
  };

  render() {
    let display = null;
    let redirec = null;
    let displayRegion = [];
    let tablecontent = [];
    if (localStorage.getItem("email") == null) {
      redirec = <Redirect to="/home" />;
    }
    if (!this.state.searchFlag) {
      this.state.regions.map(item => {
        displayRegion.push(
          <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
        );
      });
      display = (
        <div>
          <h2 style={{
              marginTop: "15%", fontSize:"15px"}}><b>Search the Region</b></h2>
        <Row>
          <Dropdown
            onSelect={selected => {
              this.selectHandle(selected);
            }}
            style={{
              width: "400px",
              height: "50px",
              margin: "0 33% 5% 33%",
              fontSize: "20px",
              borderRadius: "25px",
              backgroundColor: "white",
              textAlign: "center"
            }}
          >
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" style={{fontSize:"13px"}}>
              Select the Region to Search
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>{displayRegion}</Dropdown.Menu>
          </Dropdown>
        </Row>
         </div>)
        {/* //   <input
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
        // </div> */}
      // );
    } else {
      let details = this.state.searchResult.map(item => {
        if (item.Drug1 != null && item.Drug3 != null && item.Drug2 != null)
          tablecontent.push(
            <tr>
              <td style={{}}>{item.Disease}</td>
              <td style={{}}>
                {item.Drug1},{item.Drug2},{item.Drug3}
              </td>
            </tr>
          );
        else if (item.Drug1 == null)
          tablecontent.push(
            <tr>
              <td style={{}}>{item.Disease}</td>
              <td style={{}}>No Drugs For this one! :(</td>
            </tr>
          );
        else if (item.Drug1 != null && item.Drug2 == null)
          tablecontent.push(
            <tr>
              <td style={{}}>{item.Disease}</td>
              <td style={{}}>{item.Drug1}</td>
            </tr>
          );
        else if (item.Drug1 != null && item.Drug3 == null && item.Drug2 != null)
          tablecontent.push(
            <tr>
              <td style={{}}>{item.Disease}</td>
              <td style={{}}>
                {item.Drug1},{item.Drug2}
              </td>
            </tr>
          );
      });

      display = (
        <div >
          <Row
          class="visibleClass"
            style={{
              textAlign: "center",
            marginLeft:"15%",
            color: "black"
            }}
          >
           
            <span
              style={{
               color:"black",
                marginTop: "20px",
                fontSize: "18px",
                marginBottom:"20px"
              }}
            >
              <b>Location :</b>{" "}
            </span>
            <span
              style={{
                justifyContent: "space-evenly",
                marginTop: "20px",
marginBottom:"20px",
                fontSize: "18px"
              }}
            >
              <b>{this.state.searchText}</b>
            </span>
          </Row>
          
          <table
            class="table visibleClass"
            align="center"
            border="3px solid black"
            borderCollapse= "collapse"
            style={{
              backgroundColor: "#fffff",
              width: "400px",
              marginBottom:"20px"
              // margin: "10px 0% 30% 35%"
              
            }}
          >
            <thead>
              <th>Disease in the Region</th>
              <th>Drugs you may need to stock</th>
            </thead>
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {tablecontent}
            </tbody>
          </table>
          </div>
      
      );
    }

    return (
      <div class="userhome">
        {redirec}
        <div>
          <br></br>
        <div class="container" style={{width:"40%", height:"auto"}}>
              
          <div class="panel" style={{backgroundColor:"rgba(255, 255, 255, 0.8)"}}>
          <div  style={{ textAlign: "center" }}>{display}</div>
          
      
        </div>
        </div>
        
        </div>
        <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>
          <br></br>
      </div>
    );
  }
}

//export Home Component
export default Search;
