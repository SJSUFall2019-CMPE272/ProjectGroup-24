import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class Home extends Component {
    constructor(){
        super();
        
    }  
    //get the books data from backend  
    componentDidMount(){
    }

    render(){   
        return(
            <div class="cover_1" style={{backgroundImage: "url(https://www.smashboxconsulting.com/hs-fs/hubfs/Smashbox_2018/Images/Business_Model-bg.png?width=1589&name=Business_Model-bg.png)"}}>
            <div class="container">
              <div class="row text-center justify-content-center">
                <div class="">
                  <h3 class="heading element-animate">Try out our DD Map!</h3>
                  <p class="sub-heading element-animate mb-5">The DD Map is short for the Disease-to-Drug Map, which helps you find which disease is more prevelant in the selected region and get the drugs that are most effective to them!</p>
                  <br></br>
                  <p class="element-animate"><a href="#" class="btn btn-primary">Try Now!</a></p>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
            
        )
    }
}
//export Home Component
export default Home;

