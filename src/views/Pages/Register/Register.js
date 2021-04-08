import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback } from 'reactstrap';
import queryString from 'query-string'

import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
import * as BaseService from "../../../BaseService.js";
import Swal from 'sweetalert2'
import image from "../../../assets/register.jpg";
class Register extends Component {

  constructor(props){
    super(props);
    this.state={
      token:"",
      userId:"",
      password:"",
      confirmPass:"",
      valid:false,
      invalid:false,
      valid1:false,
      invalid1:false,

    }
  }


  componentDidMount=()=>{
    
      const values = queryString.parse(this.props.location.search)

      if(values.token===undefined||values.user_id===undefined)
      {
        alertify.alert("Unable to register. Please contact system administrator or check your email inbox for registration link");
        window.location.href="/#/login";
      }else{

        this.setState({
          token:values.token,
          userId:values.user_id
        })
      }
      
    
    
  }

  onChangeHandler=(e)=>{

    this.setState({
      [e.target.name]:e.target.value
    })

    if(e.target.value.length<7)
    {
      console.log("visited")
      this.setState(
        {
          valid1: false,
          invalid1: true,
        }
      );

    }else{
      console.log("visited 2")
      this.setState(
        {
          invalid1: false,
          valid1: true,
        }
      );

    }
   
  }

  HandlepasswordConfirm=(e)=>{

    if (e.target.value === this.state.password) {
      this.setState(
        {
          valid: true,
          invalid: false,
        }
      );
    } else {
      this.setState(
        {
          invalid: true,
          valid: false,
        }
      );
    }
    // console.log(this.state.malidi);
  
  }

  onSubmitHandler=(e)=>{
e.preventDefault();

const regUsers={
  id:parseInt(this.state.userId),
  password:this.state.password,
  token:this.state.token
}

const url = "/user/update/";
BaseService.PostServiceWithoutHeader(url, regUsers)
  .then((res) => {
    // if (res.data.success === true) {
    //   Swal.fire(
    //     'Good job!',
    //     'Successfully registered. Login to continue',
    //     'success'
    //   )
    //   window.location.href="/#/login";
    // } else {
    //   alertify.alert("Cannot perform the operation");
    // }


      if(res.data!==undefined)
        {
          if(res.data.success===true)
          {
      Swal.fire(
        'Good job!',
        'Successfully registered. Login to continue',
        'success'
      )
      window.location.href="/#/login";
          }
        }
       else if(res.response.data!==null) {
        
          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Oops...',
            text: 'Error registering! '+res.response.data["description"],
            
          })
      
        }else{
      
          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Oops...',
            text: 'Error registering!',
            
          })
      
        }




  })
  .catch((err) => {
    alertify.alert("Cannot perform the operation");
  });


  }
  
  render() {
    return (

      
      <div className="animated fadeIn">
       
          <div className="row align-items-center"  style={{marginLeft:"0",marginRight:"0",paddingTop:"100px"}}>
          <div className="col-lg-6">
          <img src={image} className="img-fluid"></img>
          </div>
            <div className="col-lg-6">
             <div className="col-lg-8">
                  <Form onSubmit={this.onSubmitHandler}>
                    <h1 style={{fontWeight:"100"}} className="pb-2 text-center">Reservation Management System</h1>
                                            <h2 style={{fontWeight:"100"}} className="pb-2 text-center">Registration</h2>
                                            <p className="text-muted pt-3">Complete the registration process</p>
                    
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend" style={{height:"40px"}}>
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input style={{height:"40px"}} type="password" placeholder="Password" name="password" value={this.state.password} autoComplete="new-password" valid={this.state.valid1} invalid={this.state.invalid1} onChange={this.onChangeHandler}/>
                      <FormFeedback>Password length should be more than 7</FormFeedback>
                    </InputGroup>
                    
                    
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend" style={{height:"40px"}}>
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input style={{height:"40px"}} type="password" placeholder="Repeat password" name="confirmPass" autoComplete="new-password" valid={this.state.valid} invalid={this.state.invalid} onChange={this.HandlepasswordConfirm}/>
                      <FormFeedback>Passwords doesn't match</FormFeedback>
                    </InputGroup>
                    <Button style={{height:"40",fontSize:"larger"}} color="success" block>Create Account</Button>
                  </Form>
            </div>
            </div>
          </div>

      </div>
    );
  }
}

export default Register;
