import React, { Component } from 'react';
import woman from "../../../images/woman.svg";

import Login from "../Login/Login";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,

  } from "reactstrap";



  import * as BaseService from "../../../BaseService.js";



import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
import Swal from 'sweetalert2'
import { css } from "@emotion/core";
import ClockLoader from "react-spinners/ClockLoader";


import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: absolute;
  margin-top: -13px;
	margin-left: -13px;
  left: 50%;
  top: 50%;
`;
class Header extends Component{

    constructor(props){
        super(props);
        this.state={
            large: false,
             username:"",
            password:"",
        }
    }


    onChangeHandler=(e)=>{

    this.setState({
      [e.target.name]:e.target.value
    })

  }

  onSubmitHandler=(e)=>{
    this.setState({
      loading:true
    })
    e.preventDefault();
    const login={
      email:this.state.username,
      password:this.state.password
    }
   
    const url = "/user/varify/";
BaseService.PostServiceWithoutHeader(url, login)
  .then(async(res) => {
    
    this.setState({
      loading:false
    })

    if (res.data.success === true) {
     
      
      
    
    
     

      if (parseInt(res.data.type)===2)


      { alertify.success("Successfully logged in");

        localStorage.setItem('AccessToken',res.data.Access_Token);
        localStorage.setItem('RefreshToken',res.data.Refresh_Token);
       await localStorage.setItem('type',res.data.type);
        localStorage.setItem('latitude',res.data.latitude);
        localStorage.setItem('longitude',res.data.longitude);
        localStorage.setItem('place',res.data.place);
        localStorage.setItem('logo',res.data.logo)

      window.location.href="/#/dashboard";

       
        
      }else if(res.data.type===3){

        alertify.success("Successfully logged in");

        localStorage.setItem('AccessToken',res.data.Access_Token);
        localStorage.setItem('RefreshToken',res.data.Refresh_Token);
        await  localStorage.setItem('type',res.data.type);
        localStorage.setItem('latitude',res.data.latitude);
        localStorage.setItem('longitude',res.data.longitude);
        localStorage.setItem('place',res.data.place);
        localStorage.setItem('logo',res.data.logo)


        window.location.href="/#/saloon/Client";
        
      }else{

        alertify.alert("Invalid user type login").setHeader('').set('closable', false);
      }


    } else {
      
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Credentials!',
        
      })
    }

 

  })
  .catch((err) => {
   
  Swal.fire({
    allowOutsideClick: false,
    icon: 'error',
    title: 'Oops...',
    text: 'Invalid Credentials!',
    
  })

  // alertify.alert("invalid").setHeader('').set('closable', false); 
  

  });
  }

    toggleLarge=()=> {
        this.setState({
          large: !this.state.large,
        });
      }

    render(){
        return( <header className="header trans_400">
        <div className="divelement header_content d-flex flex-row align-items-center justify-content-center trans_400">

          
            <div className="divelement logo">
                <a href="#">
                    <div>Reserve<span>'Me'</span></div>
                    <div>at your ease</div>
                </a>
                <div className="divelement hamburger"><div></div><div></div><div></div></div>
            </div>

            
            <nav className="main_nav">
                <ul className="d-flex flex-row align-items-start justify-content-start">
                        <li className="active"><a href="index.html">Home<div><div></div><div></div><div></div></div></a></li>
                    <li><a href="https://spemai.com/">About Us<div><div></div><div></div><div></div></div></a></li>
                    {/* <li><a href="/#/main#services">Services<div><div></div><div></div><div></div></div></a></li> */}
                    {/* <li><a href="articles.html">Articles<div><div></div><div></div><div></div></div></a></li> */}
                    <li><a href="https://spemai.com/contact.html">Contact<div><div></div><div></div><div></div></div></a></li>
                </ul>
            </nav>

           
            <div style={{zIndex:"2"}} className="divelement appstyle trans_400" onClick={()=>window.location.href="/#/login"}  >
                <div  className="divelement app_button_container d-flex flex-row align-items-center justify-content-start">
                    <div className="divelement app_button trans_400 d-flex flex-row align-items-center justify-content-start">
                        <div className="divelement app_button_icon"><img src={woman} alt="https://www.flaticon.com/authors/freepik"></img></div>
                        <div className="divelement">Click to login</div>
                    </div>
                    <div   className=" app_button_close"> Close</div>
                   
                   
                </div>
            </div>


            <Modal
          isOpen={this.state.large}
          toggle={this.toggleLarge}
          className={"modal-lg " + this.props.className}
        >
        
           
            <ModalBody>
<Login/>

            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="success" onClick={this.toggleLarge}>
                Save
              </Button>{" "}
              <Button color="secondary" onClick={this.toggleLarge}>
                Cancel
              </Button>
            </ModalFooter>
</Modal>
   

            <div className=" app_content d-flex flex-column align-items-start justify-content-center">
          
                <div className=" app_form_container text-right">
                    <form onSubmit={this.onSubmitHandler} id="app_form" className="app_form">
                        {/* <input type="text" className="app_input" placeholder="Full Name" required="required"></input> */}
                        <input type="email" className="app_input" name="username" value={this.state.username} onChange={this.onChangeHandler} placeholder="Email Address" required="required"></input>
                        <input type="password" className="app_input" autoComplete="current-password" name="password" value={this.state.password} onChange={this.onChangeHandler} placeholder="password" required="required"></input>
                        {/* <input type="text" className="app_input" placeholder="Desired Date" required="required"></input> */}
                     
                        <button className="app_form_button">submit</button>
                           
                    </form>
              
                </div>
            </div>	
        </div>
    </header>);
    }

}
export default Header;