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

  statesCustomConfig = () => {
    return {
      "NJ": {
        fill: "rgb(27,172,200)",
      },
      "NY": {
        fill: "rgb(27,172,200)"
      },
      "WA": {
        fill: "rgb(27,172,200)"
      },
      "ID": {
        fill: "rgb(27,172,200)"
      },
      "OR": {
        fill: "rgb(27,172,200)"
      },

      "MT": {
        fill: "rgb(27,172,200)"
      },
      "WY": {
        fill: "rgb(27,172,200)"
      },
      "ND": {
        fill: "rgb(27,172,200)"
      },

      "SD": {
        fill: "rgb(27,172,200)"
      }, 
      "NE": {
        fill: "rgb(27,172,200)"
      },
      "MN": {
        fill: "rgb(27,172,200)"
      },
      "IA": {
        fill: "rgb(27,172,200)"
      },
      "MI": {
        fill: "rgb(27,172,200)"
      },
      "WI": {
        fill: "rgb(27,172,200)"
      },

       "IL": {
        fill: "rgb(27,172,200)"
      },
      "IN": {
        fill: "rgb(27,172,200)"
      },
      "PA": {
        fill: "rgb(27,172,200)"
      },
      "OH": {
        fill: "rgb(27,172,200)"
      },
      "ME": {
        fill: "rgb(27,172,200)"
      },
      "NH": {
        fill: "rgb(27,172,200)"
      },
      "VT": {
        fill: "rgb(27,172,200)"
      },
      "MA": {
        fill: "rgb(27,172,200)"
      },
       "CT": {
        fill: "rgb(27,172,200)"
      },
      "RI": {
        fill: "rgb(27,172,200)"
      },
      "WV": {
        fill: "rgb(27,172,200)"
      },
      "CA": {
        fill: "rgb(27,172,200)"
      },

      "MD": {
        fill: "rgb(27,172,200)"
      },
      "DE": {
        fill: "rgb(27,172,200)"
      },

       "DC": {
        fill: "rgb(27,172,200)"
      }, 
      "VA": {
        fill: "rgb(27,172,200)"
      },
      "KY": {
        fill: "rgb(27,172,200)"
      },
      "TN": {
        fill: "rgb(27,172,200)"
      },
      "KS": {
        fill: "rgb(27,172,200)"
      },

      "UT": {
        fill: "rgb(27,172,200)"
      },
      "NV": {
        fill: "rgb(27,172,200)"
      },

      "NM": {
        fill: "rgb(27,172,200)"
      }, "TX": {
        fill: "rgb(27,172,200)"
      },

       "CO": {
        fill: "rgb(27,172,200)"
      },
      "AZ": {
        fill: "rgb(27,172,200)"
      },
      "AK": {
        fill: "rgb(27,172,200)"
      },

       "HI": {
        fill: "rgb(27,172,200)"
      },
      "AR": {
        fill: "rgb(27,172,200)"
      },
      "MO": {
        fill: "rgb(27,172,200)"
      },
      "OK": {
        fill: "rgb(27,172,200)"
      },

      "LA": {
        fill: "rgb(27,172,200)"
      },
      "MS": {
        fill: "rgb(27,172,200)"
      },
      "AL": {
        fill: "rgb(27,172,200)"
      }, "GA": {
        fill: "rgb(27,172,200)"
      }, "SC": {
        fill: "rgb(27,172,200)"
      }, "NC": {
        fill: "rgb(27,172,200)"
      }, "FL": {
        fill: "rgb(27,172,200)"
      }

    };
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
              <th>Region</th>
            </thead>
            <tbody style={{ textAlign: "center" }}>{tablecontent}</tbody>
          </table>
        </div>
      );
    }
    return (
      <div>
<div style={{ textAlign:"center"}}>
  <h1>Select State on Map</h1>
  <h3>Click on the map to view which are the most prevelant diseases in that region. The top 5 regions with highest disease search will be displayed.</h3>
</div>
      
      <div class="row">
        <span class="col-8">
          <div className="App">
            <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler} />
          </div>
        </span>
        <span class="col-4">{displayResult}</span>
      </div>
      </div>
    );
  }
}

export default MapChart;
