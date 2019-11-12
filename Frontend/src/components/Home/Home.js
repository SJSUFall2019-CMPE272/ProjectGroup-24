import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Slider from '../Slider/Slider'
import Footer from '../Footer/Footer';
import InfoSection from '../InfoSection/InfoSection'
import MapChart from '../MapChart/MapChart'

class Home extends Component {
    constructor(){
        super();
        
    }  
    //get the books data from backend  
    componentDidMount(){
    }

    render(){
        
        return(
         <div>
             <Slider/>
             <br></br>
             <br></br>
             <InfoSection/>
             <MapChart />
             <Footer/>
         </div>
            
        )
    }
}
//export Home Component
export default Home;