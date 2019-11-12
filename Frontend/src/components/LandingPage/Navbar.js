import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        localStorage.removeItem("jwtToken");
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(localStorage.removeItem("jwtToken")){
            console.log("Able to read Token");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/home"/>
        }
        return(
            <div>
                {redirectVar}
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="/home">Wellpharma</a>
                    </div>
                    
                    {navLogin}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;


/*

 <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="container">
                <a class="navbar-brand" href="index.html">Medi<span>+</span>  </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
      
                <div class="collapse navbar-collapse" id="navbarsExample05">
                  <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                      <a class="nav-link active" href="index.html">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="services.html" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Services</a>
                      <div class="dropdown-menu" aria-labelledby="dropdown04">
                        <a class="dropdown-item" href="#">Institute</a>
                        <a class="dropdown-item" href="#">Departments</a>
                        <a class="dropdown-item" href="services.html">Services</a>
                      </div>
      
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="doctors.html" id="dropdown05" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Doctors</a>
                      <div class="dropdown-menu" aria-labelledby="dropdown05">
                        <a class="dropdown-item" href="doctors.html">Find Doctors</a>
                        <a class="dropdown-item" href="#">Practitioner</a>
                      </div>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="news.html">News</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="about.html">About</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="contact.html">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            */