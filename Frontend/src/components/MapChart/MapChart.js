import React, { Component } from 'react';
import USAMap from "react-usa-map";
 import '../../App.css'
class MapChart extends Component {
  constructor(props){
    super(props);
    this.state={
      selected:"",
      colorRegion:""
    }
  }
  /* mandatory */
  mapHandler = (event) => {
   // alert(event.target.dataset.name);
    var x=event.target.dataset.name;
   
    
    this.setState({
      selected:x
    })
}
  
 
  render() {
    let displayResult=null;
    if(this.state.selected!=""){
      displayResult=(
        <div style={{fontSize:"14px"}}>
          <b> Showing results for: {this.state.selected}</b>
          <br></br>
          
          <br></br>
          <table class="table" align="center">
            <thead style={{backgroundColor:"rgb(27,172,200)", color:"white", textAlign:"center"}}>
              <th>Disease</th>
              <th>DMA</th>
            </thead>
            <tbody style={{textAlign:"center"}}>
              <td>Hi</td>
              <td>Hello</td>
            </tbody>
          </table>
        </div>
      )
    }
    return (
      <div class="row">
   <span class="col-8">
      <div className="App">
        <USAMap onClick={this.mapHandler} />
      </div>
      </span>
      <span class="col-4">
        {displayResult}
      </span>
      </div>
    );
  }
}

 

export default MapChart