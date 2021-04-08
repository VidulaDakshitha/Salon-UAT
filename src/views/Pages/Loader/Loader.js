import React, { Component } from 'react';

import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import ClockLoader from "react-spinners/ClockLoader";
import "./loaderstyle.css";
import {Link,withRouter } from "react-router-dom";
const override = css`
  display: absolute;
  margin: 0 auto;
  border-color: red;
`;

class Loader extends Component{
    constructor(props){
        super(props);
        this.state={
         
          loading:true,
          empty:[],
        }
      }


      componentDidMount(){
    localStorage.setItem("item",JSON.stringify(this.state.empty));
      var subdomain =  window.location.host.split('.')[1] ? window.location.host.split('.')[0] : false;
      console.log("subs",subdomain)

if(subdomain!==false && subdomain!=="ereserv" && subdomain!=="www" && subdomain!=="admin")
{             
             setTimeout(()=>{
          this.setState({
            loading:false
          },()=>{
            this.props.history.push('/appointment');
            //window.location.href="/main";
            
            
            })
        },1500)
 

}else{
    setTimeout(()=>{
          this.setState({
            loading:false
          },()=>{
            this.props.history.push('/main');
            //window.location.href="/main";
            
            
            })
        },1500)

}
    
        
        }

        render() {
   
          return (
            
             
            <div className="sweet-loading loaderalign" >
            <ClockLoader
              css={override}
              size={100}
              color={"#123abc"}
              loading={this.state.loading}
            />
            </div>
            
          );
        }
      



}

export default Loader;