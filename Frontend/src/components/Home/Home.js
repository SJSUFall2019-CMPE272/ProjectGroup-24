import React, {Component} from 'react';
import Slider from '../Slider/Slider'
import Footer from '../Footer/Footer';
import InfoSection from '../InfoSection/InfoSection';
import AboutUs from '../AboutUs/AboutUs';
import './Home.css';

class Home extends Component {
    constructor(){
        super();
        
    }  
    //get the books data from backend  
    componentDidMount(){
    }

    render(){
        return(
       <div class="home">
           
             <Slider/>
             <br></br>
             <br></br>
             <br></br>
             <InfoSection/> 
          <br></br>
             <AboutUs/>
                
             <Footer/>
             </div>
            
        )
    }
}
//export Home Component
export default Home;