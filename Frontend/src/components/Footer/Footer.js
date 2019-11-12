import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Home extends Component {
  constructor() {
    super();
  }
  //get the books data from backend
  componentDidMount() {}

  render() {
    return (
    <div style={{backgroundColor:"#424242"}}>
      <div class="container" style={{backgroundColor:"#424242", color:"#e6e6e6"}}>
          <br></br>
        <div class="row mb-5 element-animate">
          <div class="col-md-3 mb-5">
            <h4>Services</h4>
            <ul class="footer-link list-unstyled">
              <li>
                <a href="#">Find a doctor</a>
              </li>
              <li>
                <a href="#">Urgent Care</a>
              </li>
              <li>
                <a href="#">Emergency Care</a>
              </li>
              <li>
                <a href="#">Procedures &amp; Treatments</a>
              </li>
              <li>
                <a href="#">Online Services</a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 mb-5">
            <h4>Latest News</h4>
            <ul class="footer-link list-unstyled">
              <li>
                <a href="#">News &amp; Press Releases</a>
              </li>
              <li>
                <a href="#">Health Care Professional News</a>
              </li>
              <li>
                <a href="#">Events &amp; Conferences</a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 mb-5">
            <h4>About</h4>
            <ul class="footer-link list-unstyled">
              <li>
                <a href="#">About The Hospital</a>
              </li>
              <li>
                <a href="#">Testimonials</a>
              </li>
              <li>
                <a href="#">Accreditations &amp; Awards</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Feedback</a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 mb-5">
            <h4>Location &amp; Contact</h4>
            <p class="mb-5">134 Street Name, City Name Here, United States</p>

            <h4 class="text-uppercase mb-3 h6 text-white">Email</h4>
            <p class="mb-5">
              <a href="mailto:info@yourdomain.com">info@yourdomain.com</a>
            </p>

            <h4 class="text-uppercase mb-3 h6 text-white">Phone</h4>
            <p>+1 24 435 3533</p>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
//export Home Component
export default Home;
