import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import * as BaseService from "../../../BaseService.js";
import { HashRouter, Route, Switch } from "react-router-dom";
import { useHistory } from 'react-router';
import wallpaper1 from "../../../images/wallpaper1.png";
import image from "../../../assets/login.jpg";

import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
import Swal from 'sweetalert2'
import { css } from "@emotion/core";
import ClockLoader from "react-spinners/ClockLoader";
import DefaultFooter from "../../../containers/DefaultLayout/DefaultFooter"

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
class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      username:"",
      password:"",
      loading:false
    }
  }


componentDidMount=()=>{
  this.toatnotify();

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

if(res.data!==undefined)
        {


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
        localStorage.setItem('slot_minutes',res.data.slot_minutes);
        localStorage.setItem('unauthorized_url',res.data.unauthorized_url)

      window.location.href="/#/dashboard";



      }else if(res.data.type===3){

        alertify.success("Successfully logged in");

        localStorage.setItem('AccessToken',res.data.Access_Token);
        localStorage.setItem('RefreshToken',res.data.Refresh_Token);
        await  localStorage.setItem('type',res.data.type);
        localStorage.setItem('latitude',res.data.latitude);
        localStorage.setItem('longitude',res.data.longitude);
        localStorage.setItem('place',res.data.place);
        localStorage.setItem('logo',res.data.logo);
        localStorage.setItem('slot_minutes',res.data.slot_minutes);
        localStorage.setItem('unauthorized_url',res.data.unauthorized_url)


        window.location.href="/#/saloon/Client";

      }else{

        alertify.alert("Invalid user type login").setHeader('').set('closable', false);
      }

}
    }  else if(res.response.data!==null) {

          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Oops...',
            text: 'Login error! '+res.response.data["description"],

          })

        }else{

          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Oops...',
            text: 'Login error!',

          })

        }



  })
  .catch((err) => {

  Swal.fire({
    allowOutsideClick: false,
    icon: 'error',
    title: 'Oops...',
    text: err,

  })

  // alertify.alert("invalid").setHeader('').set('closable', false);


  });
  }


  toatnotify=()=>{

    var today = new Date()
var curHr = today.getHours()

if (curHr < 12) {
  toast('🌞 Hi! good morning login to continue!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  console.log('good morning')
} else if (curHr < 15) {


  toast.info('☀️ Hi! good afternoon login to continue!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  console.log('good afternoon')
} else {

  toast.dark('🌙 Hi! good evening login to continue!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  console.log('good evening')
}


  }


  render() {
    return (
      <div  className="animated fadeIn" style={{backgroundColor:"white"}}>


<ToastContainer
position="bottom-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>

<ToastContainer />



               {/* <div className="sweet-loading text-center" style={{zIndex:"10000"}}>
        <ClockLoader
          css={override}
          size={75}
          color={"#03081b"}
          loading={true}
        />
      </div>
          */}





          <div className="mt-5 row align-items-center" style={{marginLeft:"0",marginRight:"0"}}>
              <div className="col-lg-6" >
                <img src={image} className="img-fluid"></img>
                </div>


                    <div className="col-lg-6">
                                  <div className=" col-lg-8 ">


                                          <Form onSubmit={this.onSubmitHandler} >
                                          <h1 style={{fontWeight:"100"}} className="pb-2 text-center">Reservation Management System</h1>
                                            <h2 style={{fontWeight:"100"}} className="pb-2 text-center">Login</h2>
                                            <p className="text-muted pt-3">Sign in to your reservation managemnt system account</p>

                                            <InputGroup className="mb-4" >
                                              <InputGroupAddon addonType="prepend" style={{height:"40px"}}>
                                                <InputGroupText>
                                                  <i className="icon-user"></i>
                                                </InputGroupText>
                                              </InputGroupAddon>
                                              <Input style={{height:"40px"}} type="email" placeholder="Email" autoComplete="email" name="username" value={this.state.username} onChange={this.onChangeHandler} required/>
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                              <InputGroupAddon addonType="prepend" style={{height:"40px"}}>
                                                <InputGroupText>
                                                  <i className="icon-lock"></i>
                                                </InputGroupText>
                                              </InputGroupAddon>
                                              <Input style={{height:"40px"}} type="password" placeholder="Password" autoComplete="current-password" name="password" value={this.state.password} onChange={this.onChangeHandler} required/>
                                            </InputGroup>
                                            <Row>
                                              <Col >
                                                <Button style={{height:"40",fontSize:"larger"}} color="success" className="px-4" block>Login</Button>
                                              </Col>

                                            </Row>
                                            <div>
                                             <Col  className="text-right">
                                                <Button color="link" className="px-0" onClick={()=>{window.location.href="#/forgotpassword"}}>Forgot password?</Button>
                                              </Col>
                                              </div>
                                          </Form>



                                    </div>
                    </div>

          </div>



      </div>

    );
  }
}

export default Login;
