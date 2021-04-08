import React, { Component,PropTypes } from "react";
import GoogleMapReact from 'google-map-react';
//import Places from './Places.js';
import {PlacesStyle} from './PlacesStyle.js';
import { GoogleComponent } from 'react-google-location' ;
import * as BaseService from "../../../BaseService.js";
import Swal from "sweetalert2";

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import {
Modal,
ModalBody,
ModalHeader,
FormGroup,
Input,
  Button,
  Label,
  ModalFooter,
  Card,
  CardBody,
  Col
} from "reactstrap";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const useStyles =theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: "white",
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)',
  },

  inline: {
    display: 'inline',
    color:"green"
  },
  cardstyle:{
    maxWidth: 345,
    alignItems: 'center'
  },
  root1: {
    width: '100%',
 
    backgroundColor: theme.palette.background.paper,
  },
});



class Location extends Component {
    constructor(props) {
        super(props);
        this.state={
          addLocation:false,
          displaylatitude:"",
          displaylongitude:"",
          longitiude:"",
          latitude:"",
          name:"",
          place:""
        }
    
    }


    // componentDidMount=()=>{

    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(this.showPosition);
    //   } else { 
    //     alert("not supported")
    //   }
    // }


    // showPosition=(position)=> {
    // console.log(position)
    // this.setState({
    //   displaylatitude:position.coords.latitude,
    //   displaylongitude:position.coords.longitude
    // })
    // }


    OnChangeHandler=(e)=>{
      this.setState({
        [e.target.name]: e.target.value,
      });
    }


    onSubmitHandler=(e)=>{
      e.preventDefault();

      const data={

        Name:this.state.name,
        place:this.state.place,
        longitiude:this.state.longitiude,
        latitude:this.state.latitude

      }

      const url = "/appointment/save/";
      BaseService.PostService(url, data)
        .then((res) => {
          if (res.data.success === true) {
         
            this.setState({
              addLocation: false,
            });

            Swal.fire(
              "Good job!",
              "Location successfuly inserted",
              "success"
            );
            window.location.reload();
          } else {
      
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "cannot perform operation!",
            });
          }
        })
        .catch((err) => {
        
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "cannot perform operation!",
          });
        });
    }


    static defaultProps = {
      center: {lat: 6.9271, lng: 79.8612},
      zoom: 11
    };


    LocationModelFunction=()=>{
      this.setState({
        addLocation: !this.state.addLocation,
      });
    }
  

render(){
  const {classes} = this.props;
    return(

      <div>
{/* 
<div className="text-right">
  <Button color="dark" style={{position:"relative",zIndex:"1"}} onClick={this.LocationModelFunction}>Add Location</Button>
</div> */}



<div style={{zIndex:"1",position:"relative"}}>
<Col md="9" lg="3" xl="4">
  <Card  className="mx-4">
<CardBody>

<ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar>A</Avatar>
        </ListItemAvatar>
        <ListItemText
           primary={localStorage.getItem("place")}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
          
              </Typography>
              
            </React.Fragment>
          }
         
        />
     
      </ListItem>


</CardBody>
  </Card>
  </Col>
</div> 

        <div >
        <GoogleMapReact
apiKey="AIzaSyAjT5CUd_6F5bb5gWErov6Ns2evmXHuKKM"
          style={{width: "80%", height: "500"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          size= { "50px", "50px"}
       
          >
   <div style={PlacesStyle} lat={localStorage.getItem("latitude")} lng={localStorage.getItem("longitude")}>
              A  
           </div>

          </GoogleMapReact>
      </div>





      <Modal
                    isOpen={this.state.addLocation}
                    toggle={this.LocationModelFunction}
                    className={"modal-lg " + this.props.className}
                  >
               
         
            <ModalHeader toggle={this.LocationModelFunction}>Add Location</ModalHeader>
            <ModalBody >
            <form onSubmit={this.onSubmitHandler}>
<FormGroup>            <Label htmlFor="serviceName">Name</Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={this.state.name}
                          placeholder="Enter service name"
                          onChange={this.OnChangeHandler}
                        />
                        </FormGroup>

                        <FormGroup>            <Label htmlFor="serviceName">Location</Label>
                        <Input
                          type="text"
                          id="place"
                          name="place"
                          value={this.state.place}
                          placeholder="Enter service name"
                          onChange={this.OnChangeHandler}
                        />
                        </FormGroup>


                        <GoogleComponent
         
         apiKey="AIzaSyAjT5CUd_6F5bb5gWErov6Ns2evmXHuKKM"
         language={'en'}
         country={'country:lk'}
         coordinates={true}
        
         onChange={(e) => {this.setState({latitude:e.coordinates.lat,longitiude:e.coordinates.lng}) }} />
</form>
        
           </ModalBody>
           <ModalFooter>
           <Button className="btn btn-success">Save Location</Button>
           </ModalFooter>
                  </Modal>
   
      </div>
    );
}

}

export default  withStyles(useStyles)(Location);