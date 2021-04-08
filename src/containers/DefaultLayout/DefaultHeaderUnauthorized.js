import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};



class DefaultHeaderUnauthorized extends Component {

  lockscreen=()=>{
    return <div id="preloder"></div>;
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        {/* <div id="lock"></div>
        <p style={{display:"none"}}>{setTimeout(()=>{
            document.getElementById('lock').style.display="none";
        },0)}</p> */}


        {/* <AppSidebarToggler className="d-lg-none" display="md" mobile /> */}
        <AppNavbarBrand
         // full={{ src: logo, width: 100, height: 75, alt: 'CoreUI Logo' }}
         full={{ src: "https://images.ereserv.me/"+localStorage.getItem("logo"), width:80, height: 50, alt: logo }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
          
        />
      
        {/* <AppSidebarToggler className="d-md-down-none" display="lg" /> */}
<Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
        
           <h4><span className="badge bg-secondary">{ localStorage.getItem("name")}</span></h4>
          </NavItem>
         
        
        </Nav>
        {/* {localStorage.getItem("type")===2?
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/saloon/Staff" className="nav-link">Staff</Link>
          </NavItem>
        
        </Nav>
        :<></>} */}
        <Nav className="ml-auto" navbar>
   
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/avatar1.png'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
           
              {/* <DropdownItem onClick={()=>document.getElementById('lock').style.display="block"}><i className="fa fa-shield"></i> Lock Screen</DropdownItem> */}
              <DropdownItem onClick={e => {localStorage.clear();window.location.href="/#/main"}}><i className="fa fa-lock"></i> Home</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

      </React.Fragment>
    );
  }
}

DefaultHeaderUnauthorized.propTypes = propTypes;
DefaultHeaderUnauthorized.defaultProps = defaultProps;

export default DefaultHeaderUnauthorized;
