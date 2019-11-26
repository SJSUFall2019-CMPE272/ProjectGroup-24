import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
//import Navbar from './LandingPage/Navbar';
import TopBar from './Navbar/Navbar';
import MapChart from './MapChart/MapChart';
import SignUp from './SignUp/SignUp';
import AboutUs from  './AboutUs/AboutUs';
import ContactUs from './ContactUs/ContactUs';
//import UserHome from './UserHome/UserHome';
import Search from './Search/Search'

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                {/* //<Route path="/" component={Navbar}/> */}
                <Route path="/" component={TopBar}/>
                <Route path="/aboutus" component={AboutUs}/>
                <Route path="/login" component={Login}/>
                
                <Route path="/signup" component={SignUp}/>
                <Route path="/contactus" component={ContactUs}/>
                <Route path="/home" component={Home}/>
                <Route path="/userhome" component={Search}/>
                <Route path="/map" component={MapChart}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;