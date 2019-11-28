import React, {Component} from 'react';
import '../../App.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

class Slider extends Component {
    constructor(){
        super(); 
    }  
 
    render(){
        return(
            
            <AwesomeSlider class="home">
            <div data-src="https://www.longprairiepharmacy.com/wp-content/themes/longprairie/images/slider/5.jpg" />
            <div data-src="https://s3.amazonaws.com/utpimg.com/ptcb-pharmacy-technician-certification-exam/-p-t-c-b-pharmacy.jpg" />
            <div data-src="http://www.nationalhealthexecutive.com/write/MediaUploads/iStock-1154962393.jpg" />
          </AwesomeSlider>
          
        )
    }
}

export default Slider;