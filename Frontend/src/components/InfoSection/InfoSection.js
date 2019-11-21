import React, {Component} from 'react';

import {Container, Button} from 'reactstrap';

class InfoSection extends Component {
    constructor(){
        super();
        
    }  
    //get the books data from backend  
    componentDidMount(){
    }

    render(){   
        return(
      
            <Container>
              <div class="row text-center justify-content-center">
                <div class="">
                  <h3 class="heading element-animate"><b>Try out our DD Map!</b></h3>
                  <p class="sub-heading element-animate mb-5">The DD Map is short for the Disease-to-Drug Map, which helps you find which disease is more prevelant in the selected region and get the drugs that are most effective to them!</p>
                  
                  <Button href="/map" color="info" style={{ width:"8%",fontSize:"90%"}}>Try Now!</Button>
                  <br></br>
                </div>
                <br></br>
              </div>
           
          </Container>
        
            
        )
    }
}

export default InfoSection;

