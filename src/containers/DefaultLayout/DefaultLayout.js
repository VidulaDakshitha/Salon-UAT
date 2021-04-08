import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";

import IdleTimer from 'react-idle-timer';

import "./style.scss";

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  //AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";

import navigation2 from "../../_nav2";
// routes config
import routes from "../../routes";




const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));


class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jumpDate:new Date(),
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




   loading = () => (
    <div className="animated fadeIn">
    
    </div>
  );




  signOut(e) {
    e.preventDefault();
    this.props.history.push("/login");
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
    localStorage.clear();
    window.location.href="/#/login"

  } else {
    this.setState({showModal: true})
    this.idleTimer.reset();
    this.setState({isTimedOut: true})
  }
  
}

  render() {
    return (
      <div className="app">
        <profile propdate={this.state.jumpDate.toString} />
        <AppHeader fixed>
   
          <Suspense>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        {localStorage.getItem("type")==="2"?
        <div className="app-body">
          <AppSidebar fixed display="lg">
      
            <AppSidebarHeader />
            <AppSidebarForm />
            
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
          
            <AppSidebarFooter />


          </AppSidebar>
          <main className="main">
          <p>{routes.name}</p>
         
            <Container fluid>
            <Suspense fallback={this.loading()}>
                <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            onAction={this.onAction}
            debounce={250}
            timeout={this.state.timeout} />
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component &&localStorage.getItem("AccessToken")!==null ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                        
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/loader" />
                </Switch>
                </Suspense>
            </Container>
          </main>
    
        </div>

:
<div className="app-body">
<AppSidebar fixed display="lg">

  <AppSidebarHeader />
  <AppSidebarForm />
  
    <AppSidebarNav
      navConfig={navigation2}
      {...this.props}
      router={router}
    />

  <AppSidebarFooter />



</AppSidebar>
<main className="main">
<p>{routes.name}</p>

  <Container fluid>
  <Suspense fallback={this.loading()}>
      <Switch>
        {routes.map((route, idx) => {
          return route.component &&localStorage.getItem("AccessToken")!==null ? (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              render={props => <route.component {...props}/>}
              
            />
          ) : null;
        })}
        <Redirect from="/" to="/loader" />
      </Switch>
      </Suspense>
  </Container>
</main>

</div>

}


        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
