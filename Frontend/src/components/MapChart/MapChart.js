import React, { Component } from "react";
import USAMap from "react-usa-map";
import axios from "axios";
import { hostAddress, port } from "../../config";
import "../../App.css";
class MapChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      searchResult: []
    };
  }
  /* mandatory */
  mapHandler = event => {
    // alert(event.target.dataset.name);
    var x = event.target.dataset.name;
    console.log(x);
    const data = {
      state: x.toString()
    };
    console.log("Alaukika's data", data);
    axios.defaults.withCredentials = true;
    axios
      .post(
        "http://" + hostAddress + ":" + port + "/searchstate/searchstate",
        data
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          selected: x,
          searchResult: response.data.details
        });
      });
  };

  render() {
    let displayResult = null;
    let tablecontent = [];

    if (this.state.selected != "") {
      this.state.searchResult.map(item => {
        tablecontent.push(
          <tr>
            <td>{item.Disease} </td>
            <td>{item.Region} </td>
          </tr>
        );
      });

      displayResult = (
        <div style={{ fontSize: "14px" }}>
          <b> Showing results for: {this.state.selected}</b>
          <br></br>

          <br></br>
          <table class="table" align="center">
            <thead
              style={{
                backgroundColor: "rgb(27,172,200)",
                color: "white",
                textAlign: "center"
              }}
            >
              <th>Disease</th>
              <th>DMA</th>
            </thead>
            <tbody style={{ textAlign: "center" }}>{tablecontent}</tbody>
          </table>
        </div>
      );
    }
    return (
      <div class="row">
        <span class="col-8">
          <div className="App">
            <USAMap onClick={this.mapHandler} />
          </div>
        </span>
        <span class="col-4">{displayResult}</span>
      </div>
    );
  }
}

export default MapChart;
