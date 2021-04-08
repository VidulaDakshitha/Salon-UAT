import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
import * as BaseService from "../../../BaseService.js";
import Swal from 'sweetalert2'

class ForgotPassword extends Component {

  constructor(props){
    super(props);
    this.state={
      username:""

    }
  }



  onChangeHandler=(e)=>{

    this.setState({
      [e.target.name]:e.target.value
    })

    
   
  }



  onSubmitHandler=(e)=>{
e.preventDefault();

const reset={
  email:this.state.username
}

const url = "/user/reset/";
BaseService.PostServiceWithoutHeader(url, reset)
  .then((res) => {
    if (res.data.success === true) {
      Swal.fire(
        'Good job!',
        'Reset password Email Sent  ',
        'success'
      )
      //window.location.href="/#/login";
    } else {
      alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);;
    }
  })
  .catch((err) => {
    alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);;
  });


  }
  
  render() {
    return (

      <div className="animated fadeIn">
         <div style={{paddingLeft:"20px",cursor:"pointer"}} onClick={()=>window.location.href="/#/login"} className="d-flex justify-content-start">
       
      <i className="fa fa-arrow-circle-left fa-3x mt-4" onClick={()=>window.location.href="/#/login"}></i>
 </div>
      <div className="app flex-row align-items-center">          
    
        <Container>
     

    
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.onSubmitHandler}>
                    <h1 style={{fontWeight:"100"}} className="pb-2 text-center">Reservation Management System</h1>
                                            <h2 style={{fontWeight:"100"}} className="pb-2 text-center">Forgot password</h2>
                                            <p className="text-muted pt-3">Enter email to reset your password</p>
                            
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend" style={{height:"40px"}}>
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input style={{height:"40px"}} type="Email" placeholder="Email" autoComplete="username" name="username" onChange={this.onChangeHandler} value={this.state.username}  />
                    </InputGroup>
                    {/* <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" />
                    </InputGroup> */}
                    {/* <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" name="password" value={this.state.password} autoComplete="new-password" valid={this.state.valid1} invalid={this.state.invalid1} onChange={this.onChangeHandler}/>
                      <FormFeedback>Password length should be more than 7</FormFeedback>
                    </InputGroup>
                    
                    
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" name="confirmPass" autoComplete="new-password" valid={this.state.valid} invalid={this.state.invalid} onChange={this.HandlepasswordConfirm}/>
                      <FormFeedback>Passwords doesn't match</FormFeedback>
                    </InputGroup> */}
                    <Button color="success" block>submit</Button>
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      </div>
    );
  }
}

export default ForgotPassword;
