import React, {Component} from 'react';
import '../../App.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { hostAddress, port } from "../../config";

class Slider extends Component {
    constructor(){
        super(); 
        this.state={
            slider1:"http://"+hostAddress+":"+port+"/images/slider1.jpeg",
        }
    }  
 
    render(){
        return(
            
            <AwesomeSlider class="home">
            <div data-src={require('./slider1.jpeg')} />
            <div data-src={require('./slider2.jpeg')} />
            <div data-src={require('./slider3.jpeg')}  />
          </AwesomeSlider>
          
        )
    }
}

export default Slider;