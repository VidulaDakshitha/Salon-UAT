import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";



import IdleTimer from 'react-idle-timer';

import "./App.scss";


import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";

//const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const loading = () => (
  <div>
    <p>Please wait.... Page loading</p>
  {/* <DotLoader css={override} size={150} color={"#03081b"} loading="true" /> */}
   </div>
);
// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Main=React.lazy(() => import("./views/Pages/Main/Main"));

const Login = React.lazy(() => import("./views/Pages/Login"));

const Appointment = React.lazy(() => import("./views/Pages/UnauthorizedAppointment/UnauthorizedAppointment.js"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));
const ForgotPassword=React.lazy(() => import("./views/Pages/ForgotPassword/ForgotPassword"));
const ResetPassword=React.lazy(() => import("./views/Pages/ResetPassword/ResetPassword"));
const Loader=React.lazy(() => import("./views/Pages/Loader/Loader"));
// const PrivateRouteUser = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     //fakeAuth.isAuthenticated === true
//     localStorage.getItem("AccessToken")!==""
//       ? <Component {...props} />
//       : <Redirect to={{
//           pathname: '/#/login',
         
//         }} />
       
//   )} />
// )

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
        timeout:600000,
        showModal: false,
        userLoggedIn: false,
        isTimedOut: false
    }

    this.idleTimer = null
    this.onAction = this._onAction.bind(this)
    this.onActive = this._onActive.bind(this)
    this.onIdle = this._onIdle.bind(this)
}




_onAction(e) {
  console.log('user did something', e)
  this.setState({isTimedOut: false})
}

_onActive(e) {
  console.log('user is active', e)
  this.setState({isTimedOut: false})
}

_onIdle(e) {
  console.log('user is idle', e)
  const isTimedOut = this.state.isTimedOut
  if (isTimedOut) {
    alertify.alert("Your session timed out...Login to continue").setHeader('').set('closable', false);
    window.location.href="/#/login"

  } else {
    this.setState({showModal: true})
    this.idleTimer.reset();
    this.setState({isTimedOut: true})
  }
  
}




  render() {
    return (
    <>
    
    
    {/* <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            onAction={this.onAction}
            debounce={250}
            timeout={this.state.timeout} /> */}



    <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/forgotpassword"
              name="forgot password"
              render={(props) => <ForgotPassword {...props} />}
            />

              <Route
              exact
              path="/resetpassword"
              name="reset password"
              render={(props) => <ResetPassword {...props} />}
            />
           <Route
              path="/main"
              name="main"
              render={(props) => <Main {...props} />}
            />

              <Route
              path="/appointment"
              name="appointment"
              render={(props) => <Appointment {...props} />}
            />

            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
         
                 <Route
              path="/loader"
              name="Loader"
              render={(props) => <Loader {...props} />}
            />

            <Route
              path="/"
              name="Home"
              render={(props) => <DefaultLayout {...props} />}
            />

           


            
         
          </Switch>
       </React.Suspense>
          </HashRouter>
          </>
    );
  }
}


export default App;
