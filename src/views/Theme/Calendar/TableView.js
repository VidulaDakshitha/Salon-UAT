import React, { Component } from "react";
import {

  Card,
  CardBody,

  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Button,
  ModalBody,
  ModalHeader,
  Modal,
  ModalFooter,
  FormGroup,
  Input,
  Label,

  FormText,
  CardHeader
} from "reactstrap";

import { Calendar as Calendar2, momentLocalizer,Views } from 'react-big-calendar';
import Back from "../../../assets/back.png";
// import MonthlyView from "./MonthlyView";
// import profile from "../../../containers/DefaultLayout/DefaultLayout"
import $ from 'jquery';
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import {

 


  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  ButtonDropdown,


} from "reactstrap";
import moment from "moment";
import { Switch } from 'antd';
import 'antd/dist/antd.css';
//import "../../Home/style.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";

import * as BaseService from "../../../BaseService.js";
import Swal from 'sweetalert2'



import Back4 from "../../../assets/back4.png";
import Back3 from "../../../assets/back3.png";

const localizer = momentLocalizer(moment);






class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
      large2: false,
      fullName: "",
      NIC: "",
      mobileNumber: "",
      fullNameupd: "",
      NICupd: "",
      mobileNumberupd: "",
      persons: [],
      dialCode: "",
      dialCodeupd: "",
      appdata: [],
      pageNumber: 1,
      limit: 10,
      pageCount: null,
      updateId: null,
      mobileupdated:false,
      mobilefinal:"",
      dialfinal:"",
      countrycd:"",
      mobilewithoutupd:"",
      //value:[]






 
      large: false,
      largeUpdate: false,
      arrayVal: [true],
      id: "",
      title: "",
      cards: "",
      description: "",
      daily: true,
      date: new Date(),
      existing: true,
      activeTab: new Array(4).fill("1"),

      setdisable: true,
      appdate: "",
      data: [],
      data2: [],
      value: "",
      starttime: "",
      appointmentDet: [],
      duration: "",
      employee: "",
      service: "",
      fullnameInput: "",
      lastDate: "",
      cktime: false,
      clientID: "",
      appointmentDetails: [],
      appointmentDetails2: [],
      datedisable: false,
      issubmitted: true,
      board2: "",
      appId: "",
      appemp: "",
      selectemp: "",
      selectempname: "",
      empInfo:[],
      events:[],
      reportstart:"",
      reportend:"",
      reportbtn:false,
      eventClickModel:false,
      showappId:"",
      showEmpName:"",
      showAppTitle:"",
      showDate:"",
      showTimeStart:"",
      showTimeEnd:"",
      loading:true,
      availableSlots:[],
      resources:[],
      cancelAppointment:false,
      employeeCheck:"",
      sendReminder:0,
      sendSMS:0,
      jumpDate:new Date(),
      cancelReason:"",
      iscanceled:true,
      cancelReason:"",
      Addbtn:false,
      crossevent:"visible",

      //For update app
      appdateupdate:"",
starttimeupdate:"",
durationupdate:"",
employeeupdate:"",
serviceupdate:"",
pastDateChecker:"",
updateClient:"",
    };
  }

  componentDidMount = () => {
    // 
    
    this.receivedData(1, 1);
  };





  receivedData = (e, index) => {
   
    console.log("index" + index);
    this.setState(
      {
        pageNumber: index,
        
      },
      () => {



        const paramdata= {
          page: this.state.pageNumber, limit: this.state.limit
        };
        const url2= "/appointment/getbypage/";
      BaseService.GetDataWithParams(url2,paramdata)
        .then((res) => {
          
         

          if (res.data.success === true) {
console.log(res.data.data)
this.setState({
    appdata:res.data.data,
            pageCount: Math.ceil(res.data.count / this.state.limit),
})





            
          } else {
         
            Swal.fire({
              allowOutsideClick: false,
              icon: 'error',
              title: 'Oops...',
              text: 'Error loading data!',
              
            })
          }
      
       
      
        })
        .catch((err) => {
         
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title: 'Oops...',
          text: 'Error loading data!',
          
        })
        });
        





        
   
      }
    );
  };






  deleteClient1=()=>{

    Swal.fire({
      allowOutsideClick: false,
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
   
      if (result.value) {
       

    
        const url = "/client/delete/";
        BaseService.DeleteData(url,this.state.updateId)
          .then((res) => {
      
    
            console.log("response"+res)
           
            if (res.data.success === true) {
              this.receivedData(1,1);
          
             
    
              alertify.success("Successfully deleted client");
      
              this.setState({
                large2:false
              })
      
            } else {
              Swal.fire({
                allowOutsideClick: false,
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
            }
          })
          .catch((err) => {
            alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);
            console.log("if error"+err);
          });











      }
    })


    
  }



  onSelectLimit=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    },()=>this.receivedData(1,1))
        
      }







      handleOnChange = (event) => {
        let orderkeyword=event.target.value.trim().toLowerCase();
        if(orderkeyword.length>0){
            this.setState({
                appdata:this.state.appdata.filter(element=>{
                    return(
                        element.appointment_date.toLowerCase().match(event.target.value)||
                        element.client.toLowerCase().match(event.target.value)
                      
                      
                       
    
    
    
                    )
                })
            })
        }else{
            this.receivedData(1,1);
        }
      };








//For add appointment Tab pane
  toggle = (tabPane, tab) => {

console.log(tab)
    if(parseInt(tab)===1)
    {
      const newArray = this.state.activeTab.slice();
      newArray[tabPane] = tab;
      this.setState({
        activeTab: newArray,
      });
    }else{


   


    if (
      (this.state.mobileNum !== ""||this.state.mobileNumber!=="") &&
      (this.state.fullnameInput !== "" || this.state.clientID !== "")
    ) {




      const newArray = this.state.activeTab.slice();
      newArray[tabPane] = tab;
      this.setState({
        activeTab: newArray,
      });





    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Oops...",
        text: "Please fill client details before proceeding!",
      });
    }


  }
  };





//For Update appointment Tab pane
  toggleUpdate = (tabPane, tab) => {

console.log(tab)
    if(parseInt(tab)===1)
    {
      const newArray = this.state.activeTab.slice();
      newArray[tabPane] = tab;
      this.setState({
        activeTab: newArray,
      });
    }else{


   


    if (
      (this.state.mobileNum !== ""||this.state.mobileNumber!=="") &&
      (this.state.fullnameInput !== "" || this.state.clientID !== "")
    ) {




      const newArray = this.state.activeTab.slice();
      newArray[tabPane] = tab;
      this.setState({
        activeTab: newArray,
      });





    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Oops...",
        text: "Please fill client details before proceeding!",
      });
    }


  }
  };

addNewForm=()=>{

  this.setState({
    arrayVal:[...this.state.arrayVal,false],
    Addbtn:false
  })
}



 //for form data reset
  resetform = (e) => {
    this.setState(
      {
        appdate: "",
        datedisable: false,
        starttime: "",
        service: "",
        duration: "",
        employee: "",
        arrayVal: [true],
        appointmentDet: [],
        Addbtn:false
      },
 
    );
document.getElementById("starttime").value="";
document.getElementById("duration").value="";
document.getElementById("employee").value="";
document.getElementById("service").value="";

    this.state.appointmentDet.splice();
 
  };

  //for add appointment tab pane
  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          {
            <form>
              <Card style={{ border: "transparent" }}>
                <CardBody>
                  {/* <FormGroup> */}
                  <Label htmlFor="fullName">Full Name</Label>
                  <Typeahead
                    filterBy={(option, props) => {
                      if (props.selected.length > 0) {
                        // Display all the options if there's a selection.
                     
                        return true;
                      }
                      // Otherwise filter on some criteria.
                      return (
                        option.name
                          .toLowerCase()
                          .indexOf(props.text.toLowerCase()) !== -1
                      );
                    }}
                    id="basic-typeahead-example"
                    labelKey="name"
                    options={this.state.data}
                    placeholder="Choose a name or type new client ..."
                    onInputChange={this.handleInputChange}
                    onChange={this.handleChange}
                  />

                  <FormGroup>
                    <Label htmlFor="NIC">NIC</Label>
                    <Input
                      type="text"
                      id="NIC"
                      name="NIC"
                      disabled={this.state.setdisable}
                      placeholder="Enter NIC"
                      value={this.state.NIC}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <PhoneInput
                      containerStyle={{ width: "20px" }}
                      country={"lk"}
                      disabled={this.state.setdisable}
                      name="mobileNumber"
                      value={this.state.mobileNum}
                      onChange={(country, value, event) => {
                        this.setState({
                          dialCode: value["dialCode"],
                          Country: value["name"],
                          mobileNumber: country.slice(value.dialCode.length),
                        });
                      }}
                    />
                  </FormGroup>

                  <FormGroup check>
        <Label check>
          <Input name="sms" value="sms" type="checkbox" onChange={this.SmsCheck}/>{' '}
          Check this box if you want to send sms
        </Label>
      </FormGroup><br></br>


      <FormGroup check>
        <Label check>
          <Input type="checkbox" value="reminder" name="reminder" onChange={this.SmsreminderCheck}/>{' '}
          Check this box if you want to send reminder
        </Label>
      </FormGroup><br></br>



                  <Button
                    color="success"
                    onClick={() => {
                      this.toggle(0, "2");
                    }}
                  >
                    Save and next
                  </Button>
                </CardBody>
              </Card>
            </form>
          }
        </TabPane>
        <TabPane tabId="2">
          {
            <div>
              <form onSubmit={this.appointmentSubmit}>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Appointment Date</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="date"
                      id="appdate"
                      name="appdate"
                      placeholder="date"
                      value={this.state.appdate}
                      onChange={this.onChangeHandler}
                      disabled={this.state.datedisable}
                    />
                  </Col>
                </FormGroup>



<hr style={{paddingBottom:"10px"}}></hr>
                {this.state.arrayVal.map((val, index) => (
                  <div>
                    {(this.state.arrayVal.length -1)!== index && this.state.arrayVal.length > 1 && this.state.arrayVal[0]===true ? 
                       <span >
                       <i style={{color:"green"}} className="fa fa-check-circle fa-lg mt-4 pull-right"></i>
                     </span>
                    : 
                     <></>
                   }


{(this.state.arrayVal.length -1)=== index && this.state.arrayVal.length === 1 && this.state.arrayVal[0]===true && this.state.appointmentDet.length!==0? 
                       <span >
                       <i style={{color:"green"}} className="fa fa-check-circle fa-lg mt-4 pull-right"></i>
                     </span>
                    : 
                     <></>
                   }


          {(this.state.arrayVal.length -1)=== index && this.state.arrayVal.length >1 ? 
                      <span style={{pointerEvents:this.state.crossevent,cursor:"pointer"}} onClick={(e) => this.printconsole(index)}>
                        <i title="click to remove appointment" className="fa fa-close fa-lg mt-4 pull-right"></i>
                      </span>
                     : 
                      <></>
                    }
             {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
     
      <TimePicker value={this.state.starttime} onChange={(e) => {
                             this.timeclickcheck(e)
                            }}  disabled={this.state.arrayVal[index]}  name="starttime"
                            id="starttime"/>
    
    </MuiPickersUtilsProvider> */}
                    <Row>
                      <Col xs="4">
                        <FormGroup>
                          <Label htmlFor="ccmonth">Start Time</Label>
                          <Input
                            type="select"
                            name="starttime"
                            id="starttime"
                           
                            onChange={(e) => {
                              this.checkStatus(e, index);
                            }}
                            disabled={this.state.arrayVal[index]}
  className={this.state.arrayVal[index] && this.state.arrayVal.length > 1?'ondisable':<></>}                          >
                            <option value="">Time</option>
                            <option value="00:05">00:05</option>
                            <option value="00:10">00:10</option>
                            <option value="00:15">00:15</option>
                            <option value="00:20">00:20</option>
                            <option value="00:25">00:25</option>
                            <option value="00:30">00:30</option>
                            <option value="00:35">00:35</option>
                            <option value="00:40">00:40</option>
                            <option value="00:45">00:45</option>
                            <option value="00:50">00:50</option>
                            <option value="00:55">00:55</option>
                            <option value="01:00">01:00</option>
                            <option value="01:05">01:05</option>
                            <option value="01:10">01:10</option>
                            <option value="01:15">01:15</option>
                            <option value="01:20">01:20</option>
                            <option value="01:25">01:25</option>
                            <option value="01:30">01:30</option>
                            <option value="01:35">01:35</option>
                            <option value="01:40">01:40</option>
                            <option value="01:45">01:45</option>
                            <option value="01:50">01:50</option>
                            <option value="01:55">01:55</option>
                            <option value="02:00">02:00</option>
                            <option value="02:05">02:05</option>
                            <option value="02:10">02:10</option>
                            <option value="02:15">02:15</option>
                            <option value="02:20">02:20</option>
                            <option value="02:25">02:25</option>
                            <option value="02:30">02:30</option>
                            <option value="02:35">02:35</option>
                            <option value="02:40">02:40</option>
                            <option value="02:45">02:45</option>
                            <option value="02:50">02:50</option>
                            <option value="02:55">02:55</option>
                            <option value="03:00">03:00</option>
                            <option value="03:05">03:05</option>
                            <option value="03:10">03:10</option>
                            <option value="03:15">03:15</option>
                            <option value="03:20">03:20</option>
                            <option value="03:25">03:25</option>
                            <option value="03:30">03:30</option>
                            <option value="03:35">03:35</option>
                            <option value="03:40">03:40</option>
                            <option value="03:45">03:45</option>
                            <option value="03:50">03:50</option>
                            <option value="03:55">03:55</option>
                            <option value="04:00">04:00</option>
                            <option value="04:05">04:05</option>
                            <option value="04:10">04:10</option>
                            <option value="04:15">04:15</option>
                            <option value="04:20">04:20</option>
                            <option value="04:25">04:25</option>
                            <option value="04:30">04:30</option>
                            <option value="04:35">04:35</option>
                            <option value="04:40">04:40</option>
                            <option value="04:45">04:45</option>
                            <option value="04:50">04:50</option>
                            <option value="04:55">04:55</option>
                            <option value="05:00">05:00</option>
                            <option value="05:05">05:05</option>
                            <option value="05:10">05:10</option>
                            <option value="05:15">05:15</option>
                            <option value="05:20">05:20</option>
                            <option value="05:25">05:25</option>
                            <option value="05:30">05:30</option>
                            <option value="05:35">05:35</option>
                            <option value="05:40">05:40</option>
                            <option value="05:45">05:45</option>
                            <option value="05:50">05:50</option>
                            <option value="05:55">05:55</option>
                            <option value="06:00">06:00</option>
                            <option value="06:05">06:05</option>
                            <option value="06:10">06:10</option>
                            <option value="06:15">06:15</option>
                            <option value="06:20">06:20</option>
                            <option value="06:25">06:25</option>
                            <option value="06:30">06:30</option>
                            <option value="06:35">06:35</option>
                            <option value="06:40">06:40</option>
                            <option value="06:45">06:45</option>
                            <option value="06:50">06:50</option>
                            <option value="06:55">06:55</option>
                            <option value="07:00">07:00</option>
                            <option value="07:05">07:05</option>
                            <option value="07:10">07:10</option>
                            <option value="07:15">07:15</option>
                            <option value="07:20">07:20</option>
                            <option value="07:25">07:25</option>
                            <option value="07:30">07:30</option>
                            <option value="07:35">07:35</option>
                            <option value="07:40">07:40</option>
                            <option value="07:45">07:45</option>
                            <option value="07:50">07:50</option>
                            <option value="07:55">07:55</option>
                            <option value="08:00">08:00</option>
                            <option value="08:05">08:05</option>
                            <option value="08:10">08:10</option>
                            <option value="08:15">08:15</option>
                            <option value="08:20">08:20</option>
                            <option value="08:25">08:25</option>
                            <option value="08:30">08:30</option>
                            <option value="08:35">08:35</option>
                            <option value="08:40">08:40</option>
                            <option value="08:45">08:45</option>
                            <option value="08:50">08:50</option>
                            <option value="08:55">08:55</option>
                            <option value="09:00">09:00</option>
                            <option value="09:05">09:05</option>
                            <option value="09:10">09:10</option>
                            <option value="09:15">09:15</option>
                            <option value="09:20">09:20</option>
                            <option value="09:25">09:25</option>
                            <option value="09:30">09:30</option>
                            <option value="09:35">09:35</option>
                            <option value="09:40">09:40</option>
                            <option value="09:45">09:45</option>
                            <option value="09:50">09:50</option>
                            <option value="09:55">09:55</option>
                            <option value="10:00">10:00</option>
                            <option value="10:05">10:05</option>
                            <option value="10:10">10:10</option>
                            <option value="10:15">10:15</option>
                            <option value="10:20">10:20</option>
                            <option value="10:25">10:25</option>
                            <option value="10:30">10:30</option>
                            <option value="10:35">10:35</option>
                            <option value="10:40">10:40</option>
                            <option value="10:45">10:45</option>
                            <option value="10:50">10:50</option>
                            <option value="10:55">10:55</option>
                            <option value="11:00">11:00</option>
                            <option value="11:05">11:05</option>
                            <option value="11:10">11:10</option>
                            <option value="11:15">11:15</option>
                            <option value="11:20">11:20</option>
                            <option value="11:25">11:25</option>
                            <option value="11:30">11:30</option>
                            <option value="11:35">11:35</option>
                            <option value="11:40">11:40</option>
                            <option value="11:45">11:45</option>
                            <option value="11:50">11:50</option>
                            <option value="11:55">11:55</option>
                            <option value="12:00">12:00</option>
                            <option value="12:05">12:05</option>
                            <option value="12:10">12:10</option>
                            <option value="12:15">12:15</option>
                            <option value="12:20">12:20</option>
                            <option value="12:25">12:25</option>
                            <option value="12:30">12:30</option>
                            <option value="12:35">12:35</option>
                            <option value="12:40">12:40</option>
                            <option value="12:45">12:45</option>
                            <option value="12:50">12:50</option>
                            <option value="12:55">12:55</option>
                            <option value="13:00">13:00</option>
                            <option value="13:05">13:05</option>
                            <option value="13:10">13:10</option>
                            <option value="13:15">13:15</option>
                            <option value="13:20">13:20</option>
                            <option value="13:25">13:25</option>
                            <option value="13:30">13:30</option>
                            <option value="13:35">13:35</option>
                            <option value="13:40">13:40</option>
                            <option value="13:45">13:45</option>
                            <option value="13:50">13:50</option>
                            <option value="13:55">13:55</option>
                            <option value="14:00">14:00</option>
                            <option value="14:05">14:05</option>
                            <option value="14:10">14:10</option>
                            <option value="14:15">14:15</option>
                            <option value="14:20">14:20</option>
                            <option value="14:25">14:25</option>
                            <option value="14:30">14:30</option>
                            <option value="14:35">14:35</option>
                            <option value="14:40">14:40</option>
                            <option value="14:45">14:45</option>
                            <option value="14:50">14:50</option>
                            <option value="14:55">14:55</option>
                            <option value="15:00">15:00</option>
                            <option value="15:05">15:05</option>
                            <option value="15:10">15:10</option>
                            <option value="15:15">15:15</option>
                            <option value="15:20">15:20</option>
                            <option value="15:25">15:25</option>
                            <option value="15:30">15:30</option>
                            <option value="15:35">15:35</option>
                            <option value="15:40">15:40</option>
                            <option value="15:45">15:45</option>
                            <option value="15:50">15:50</option>
                            <option value="15:55">15:55</option>
                            <option value="16:00">16:00</option>
                            <option value="16:05">16:05</option>
                            <option value="16:10">16:10</option>
                            <option value="16:15">16:15</option>
                            <option value="16:20">16:20</option>
                            <option value="16:25">16:25</option>
                            <option value="16:30">16:30</option>
                            <option value="16:35">16:35</option>
                            <option value="16:40">16:40</option>
                            <option value="16:45">16:45</option>
                            <option value="16:50">16:50</option>
                            <option value="16:55">16:55</option>
                            <option value="17:00">17:00</option>
                            <option value="17:05">17:05</option>
                            <option value="17:10">17:10</option>
                            <option value="17:15">17:15</option>
                            <option value="17:20">17:20</option>
                            <option value="17:25">17:25</option>
                            <option value="17:30">17:30</option>
                            <option value="17:35">17:35</option>
                            <option value="17:40">17:40</option>
                            <option value="17:45">17:45</option>
                            <option value="17:50">17:50</option>
                            <option value="17:55">17:55</option>
                            <option value="18:00">18:00</option>
                            <option value="18:05">18:05</option>
                            <option value="18:10">18:10</option>
                            <option value="18:15">18:15</option>
                            <option value="18:20">18:20</option>
                            <option value="18:25">18:25</option>
                            <option value="18:30">18:30</option>
                            <option value="18:35">18:35</option>
                            <option value="18:40">18:40</option>
                            <option value="18:45">18:45</option>
                            <option value="18:50">18:50</option>
                            <option value="18:55">18:55</option>
                            <option value="19:00">19:00</option>
                            <option value="19:05">19:05</option>
                            <option value="19:10">19:10</option>
                            <option value="19:15">19:15</option>
                            <option value="19:20">19:20</option>
                            <option value="19:25">19:25</option>
                            <option value="19:30">19:30</option>
                            <option value="19:35">19:35</option>
                            <option value="19:40">19:40</option>
                            <option value="19:45">19:45</option>
                            <option value="19:50">19:50</option>
                            <option value="19:55">19:55</option>
                            <option value="20:00">20:00</option>
                            <option value="20:05">20:05</option>
                            <option value="20:10">20:10</option>
                            <option value="20:15">20:15</option>
                            <option value="20:20">20:20</option>
                            <option value="20:25">20:25</option>
                            <option value="20:30">20:30</option>
                            <option value="20:35">20:35</option>
                            <option value="20:40">20:40</option>
                            <option value="20:45">20:45</option>
                            <option value="20:50">20:50</option>
                            <option value="20:55">20:55</option>
                            <option value="21:00">21:00</option>
                            <option value="21:05">21:05</option>
                            <option value="21:10">21:10</option>
                            <option value="21:15">21:15</option>
                            <option value="21:20">21:20</option>
                            <option value="21:25">21:25</option>
                            <option value="21:30">21:30</option>
                            <option value="21:35">21:35</option>
                            <option value="21:40">21:40</option>
                            <option value="21:45">21:45</option>
                            <option value="21:50">21:50</option>
                            <option value="21:55">21:55</option>
                            <option value="22:00">22:00</option>
                            <option value="22:05">22:05</option>
                            <option value="22:10">22:10</option>
                            <option value="22:15">22:15</option>
                            <option value="22:20">22:20</option>
                            <option value="22:25">22:25</option>
                            <option value="22:30">22:30</option>
                            <option value="22:35">22:35</option>
                            <option value="22:40">22:40</option>
                            <option value="22:45">22:45</option>
                            <option value="22:50">22:50</option>
                            <option value="22:55">22:55</option>
                            <option value="22:00">22:00</option>
                            <option value="22:05">22:05</option>
                            <option value="22:10">22:10</option>
                            <option value="22:15">22:15</option>
                            <option value="22:20">22:20</option>
                            <option value="22:25">22:25</option>
                            <option value="22:30">22:30</option>
                            <option value="22:35">22:35</option>
                            <option value="22:40">22:40</option>
                            <option value="22:45">22:45</option>
                            <option value="22:50">22:50</option>
                            <option value="22:55">22:55</option>
                            <option value="23:00">23:00</option>
                            <option value="23:05">23:05</option>
                            <option value="23:10">23:10</option>
                            <option value="23:15">23:15</option>
                            <option value="23:20">23:20</option>
                            <option value="23:25">23:25</option>
                            <option value="23:30">23:30</option>
                            <option value="23:35">23:35</option>
                            <option value="23:40">23:40</option>
                            <option value="23:45">23:45</option>
                            <option value="23:50">23:50</option>
                            <option value="23:55">23:55</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col xs="8">
                        <FormGroup>
                          <Label htmlFor="ccyear">Service</Label>

                          <Input
                            type="select"
                            name="service"
                            id="service"
                            onChange={(e) => {
                              this.checkStatus(e, index);
                            }}
                            disabled={this.state.arrayVal[index]}
  className={this.state.arrayVal[index] && this.state.arrayVal.length > 1?'ondisable':<></>}                          >
                            <option value="">Select service</option>
                            {this.state.data2.map((val) => (
                              <option value={val.id}>{val.name}     :- {val.time} min</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>

                    <Col xs="6">
                        <FormGroup>
                          <Label htmlFor="ccyear">Select Stylist</Label>
                          <Input
                            type="select"
                            name="employee"
                            id="employee"
                            onChange={(e) => {
                              this.checkStatus(e, index);
                              this.checkSlotWithEmployee(e.target.value)
                            }}
                            disabled={this.state.arrayVal[index]}
  className={this.state.arrayVal[index] && this.state.arrayVal.length > 1?'ondisable':<></>}                          >
                            <option value="">Select stylist</option>
                            {this.state.empInfo.map((val) => (
                              <option value={val.id}>{val.title}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col xs="6">
                        <FormGroup>
                          <Label htmlFor="ccmonth">Additional Time Allocated</Label>
                          <Input
                            type="select"
                            name="duration"
                            id="duration"
                            onChange={(e) => {
                              this.checkStatus(e, index);
                            }}
                            disabled={this.state.arrayVal[index]}
                            className={this.state.arrayVal[index] && this.state.arrayVal.length > 1?'ondisable':<></>}
                          >
                            <option value="">Duration</option>
                            <option value="0">0 min</option>
                            <option value="15">15 min</option>
                            <option value="30">30 min</option>
                            <option value="45">45 min</option>
                            <option value="60">1 hr</option>
                            <option value="75">1 hr 15 min</option>
                            <option value="90">1 hr 30 min</option>
                            <option value="105">1 hr 45 min</option>
                            <option value="120">2 hr</option>
                          </Input>
                        </FormGroup>
                      </Col>
                   
                    </Row>

                    <hr></hr>
                  </div>
                ))}


{this.state.Addbtn===true?


<div>
                
                       <span onClick={()=>this.addNewForm()}>
                       <i style={{cursor:"pointer"}} title="Click to add an event" className="fa fa-plus-circle fa-3x mt-4 pull-right" ></i>
                     </span>
                     </div>

:<></>}


                {this.state.appdate!==""?
                    <Calendar2
      localizer={localizer}
      events={this.state.availableSlots}
      defaultView={Views.DAY}
      views={['day']}
      date={this.state.appdate}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      resources={this.state.resources}
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
    />:<></>}
                <hr></hr>
                <ModalFooter>
                  <Button color="success" type="submit" id="submitbtn">
                    Save appointment
                  </Button>

                  <Button id="resetbtn" color="secondary" onClick={(e) => this.resetform()}>
                    Reset
                  </Button>
                  </ModalFooter>
                
              </form>
            </div>
          }
        </TabPane>
      </>
    );
  }


  ClickOnUpdateBtn=()=>{

 
    Swal.fire({
      allowOutsideClick: false,
      title: 'Are you sure ?',
      text: "Changes will be made and You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
   
      if (result.value) {


        this.GetServiceAndClient();

       

   

   const data = {
   id:parseInt(this.state.showappId),
  
    };

    const url = "/appointment/update/";
    BaseService.UpdateService(url, "",parseInt(this.state.showappId))
      .then((res) => {
        if (res.data.success === true) {
       
       this.setState({
         eventClickModel:false,
        
       })
      

 this.toggleLargeUpdate();


         
        } else {
    
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Oops...",
            text: "cannot perform operation!",
          });
        }
      })
      .catch((err) => {
      
 
      });


      }

    })


  }
  



  tabPaneForUpdate() {
    return (
      <>
        <TabPane tabId="1">
          {
            <form>
              <Card style={{ border: "transparent" }}>
                <CardBody>
                  {/* <FormGroup> */}
                  <div className="d-flex justify-content-between">
                  <Label htmlFor="fullName">Full Name</Label>
                  {this.state.fullnameInput==="" && this.state.clientID ===""?

                  <div>
                  <i class="motion fa fa-arrow-down pr-3" aria-hidden="true"></i>
                <strong>Confirm client details</strong>
              </div>
:<></>}
                  </div>
                  
                
                  <Typeahead
                    filterBy={(option, props) => {
                      if (props.selected.length > 0) {
                        // Display all the options if there's a selection.
                     
                        return true;
                      }
                      // Otherwise filter on some criteria.
                      return (
                        option.name
                          .toLowerCase()
                          .indexOf(props.text.toLowerCase()) !== -1
                      );
                    }}
                    defaultSelected={this.state.data.slice(this.state.data.findIndex((res)=>{
  
       
        return res.name===this.state.updateClient
        
      }))}
                    id="basic-typeahead-example"
                    labelKey="name"
                    options={this.state.data}
                    placeholder="Choose a name or type new client ..."
                    onInputChange={this.handleInputChange}
                    onChange={this.handleChange}
                  />

                  <FormGroup>
                    <Label htmlFor="NIC">NIC</Label>
                    <Input
                      type="text"
                      id="NIC"
                      name="NIC"
                      disabled={this.state.setdisable}
                      placeholder="Enter NIC"
                      value={this.state.NIC}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <PhoneInput
                      containerStyle={{ width: "20px" }}
                      country={"lk"}
                      disabled={this.state.setdisable}
                      name="mobileNumber"
                      value={this.state.mobileNum}
                      onChange={(country, value, event) => {
                        this.setState({
                          dialCode: value["dialCode"],
                          Country: value["name"],
                          mobileNumber: country.slice(value.dialCode.length),
                        });
                      }}
                    />
                  </FormGroup>

                  <FormGroup check>
        <Label check>
          <Input name="sms" value="sms" type="checkbox" onChange={this.SmsCheck}/>{' '}
          Check this box if you want to send sms
        </Label>
      </FormGroup><br></br>


      <FormGroup check>
        <Label check>
          <Input type="checkbox" value="reminder" name="reminder" onChange={this.SmsreminderCheck}/>{' '}
          Check this box if you want to send reminder
        </Label>
      </FormGroup><br></br>



                  <Button
                    color="success"
                    onClick={() => {
                      this.toggle(0, "2");
                    }}
                  >
                    Save and next
                  </Button>
                </CardBody>
              </Card>
            </form>
          }
        </TabPane>
        <TabPane tabId="2">
          {
            <div>
              <form onSubmit={this.appointmentUpdate}>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Appointment Date</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="date"
                      id="appdateupdate"
                      name="appdateupdate"
                      placeholder="date"
                      value={this.state.appdateupdate}
                      onChange={this.onChangeHandler}
                      disabled={this.state.datedisable}
                    />
                  </Col>
                </FormGroup>
{this.state.arrayVal.length === 1?
<div className="pull-right">
                  <i class="motion fa fa-arrow-down pr-3" aria-hidden="true"></i>
                <strong>Fill the updated appointments</strong>
              </div>
:<></>}

<hr style={{paddingBottom:"10px"}}></hr>


                {this.state.arrayVal.map((val, index) => (
                  <div>
                    {(this.state.arrayVal.length -1)!== index && this.state.arrayVal.length > 1 && this.state.arrayVal[0]===true ? 
                       <span >
                       <i style={{color:"green"}} className="fa fa-check-circle fa-lg mt-4 pull-right"></i>
                     </span>
                    : 
                     <></>
                   }


{(this.state.arrayVal.length -1)=== index && this.state.arrayVal.length === 1 && this.state.arrayVal[0]===true && this.state.appointmentDet.length!==0? 
                       <span >
                       <i style={{color:"green"}} className="fa fa-check-circle fa-lg mt-4 pull-right"></i>
                     </span>
                    : 
                     <></>
                   }


          {(this.state.arrayVal.length -1)=== index && this.state.arrayVal.length >1 ? 
                      <span style={{pointerEvents:this.state.crossevent,cursor:"pointer"}} onClick={(e) => this.printconsole(index)}>
                        <i title="click to remove appointment" className="fa fa-close fa-lg mt-4 pull-right"></i>
                      </span>
                     : 
                      <></>
                    }
             {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
     
      <TimePicker value={this.state.starttime} onChange={(e) => {
                             this.timeclickcheck(e)
                            }}  disabled={this.state.arrayVal[index]}  name="starttime"
                            id="starttime"/>
    
    </MuiPickersUtilsProvider> */}
                    <Row>
                      <Col xs="4">
                        <FormGroup>
                          <Label htmlFor="ccmonth">Start Time</Label>
                          <Input
                            type="select"
                            name="starttimeupdate"
                            id="starttimeupdate"
                            onChange={(e) => {
                              this.checkStatusUpdate(e, index);
                            }}
                            disabled={this.state.arrayVal[index]}
                                                        className={this.state.arrayVal[index] && this.state.arrayVal.length > 1?'ondisable':<></>}

                          >
                            <option value="">Time</option>
                            <option value="00:05">00:05</option>
                            <option value="00:10">00:10</option>
                            <option value="00:15">00:15</option>
                            <option value="00:20">00:20</option>
                            <option value="00:25">00:25</option>
                            <option value="00:30">00:30</option>
                            <option value="00:35">00:35</option>
                            <option value="00:40">00:40</option>
                            <option value="00:45">00:45</option>
                            <option value="00:50">00:50</option>
                            <option value="00:55">00:55</option>
                            <option value="01:00">01:00</option>
                            <option value="01:05">01:05</option>
                            <option value="01:10">01:10</option>
                            <option value="01:15">01:15</option>
                            <option value="01:20">01:20</option>
                            <option value="01:25">01:25</option>
                            <option value="01:30">01:30</option>
                            <option value="01:35">01:35</option>
                            <option value="01:40">01:40</option>
                            <option value="01:45">01:45</option>
                            <option value="01:50">01:50</option>
                            <option value="01:55">01:55</option>
                            <option value="02:00">02:00</option>
                            <option value="02:05">02:05</option>
                            <option value="02:10">02:10</option>
                            <option value="02:15">02:15</option>
                            <option value="02:20">02:20</option>
                            <option value="02:25">02:25</option>
                            <option value="02:30">02:30</option>
                            <option value="02:35">02:35</option>
                            <option value="02:40">02:40</option>
                            <option value="02:45">02:45</option>
                            <option value="02:50">02:50</option>
                            <option value="02:55">02:55</option>
                            <option value="03:00">03:00</option>
                            <option value="03:05">03:05</option>
                            <option value="03:10">03:10</option>
                            <option value="03:15">03:15</option>
                            <option value="03:20">03:20</option>
                            <option value="03:25">03:25</option>
                            <option value="03:30">03:30</option>
                            <option value="03:35">03:35</option>
                            <option value="03:40">03:40</option>
                            <option value="03:45">03:45</option>
                            <option value="03:50">03:50</option>
                            <option value="03:55">03:55</option>
                            <option value="04:00">04:00</option>
                            <option value="04:05">04:05</option>
                            <option value="04:10">04:10</option>
                            <option value="04:15">04:15</option>
                            <option value="04:20">04:20</option>
                            <option value="04:25">04:25</option>
                            <option value="04:30">04:30</option>
                            <option value="04:35">04:35</option>
                            <option value="04:40">04:40</option>
                            <option value="04:45">04:45</option>
                            <option value="04:50">04:50</option>
                            <option value="04:55">04:55</option>
                            <option value="05:00">05:00</option>
                            <option value="05:05">05:05</option>
                            <option value="05:10">05:10</option>
                            <option value="05:15">05:15</option>
                            <option value="05:20">05:20</option>
                            <option value="05:25">05:25</option>
                            <option value="05:30">05:30</option>
                            <option value="05:35">05:35</option>
                            <option value="05:40">05:40</option>
                            <option value="05:45">05:45</option>
                            <option value="05:50">05:50</option>
                            <option value="05:55">05:55</option>
                            <option value="06:00">06:00</option>
                            <option value="06:05">06:05</option>
                            <option value="06:10">06:10</option>
                            <option value="06:15">06:15</option>
                            <option value="06:20">06:20</option>
                            <option value="06:25">06:25</option>
                            <option value="06:30">06:30</option>
                            <option value="06:35">06:35</option>
                            <option value="06:40">06:40</option>
                            <option value="06:45">06:45</option>
                            <option value="06:50">06:50</option>
                            <option value="06:55">06:55</option>
                            <option value="07:00">07:00</option>
                            <option value="07:05">07:05</option>
                            <option value="07:10">07:10</option>
                            <option value="07:15">07:15</option>
                            <option value="07:20">07:20</option>
                            <option value="07:25">07:25</option>
                            <option value="07:30">07:30</option>
                            <option value="07:35">07:35</option>
                            <option value="07:40">07:40</option>
                            <option value="07:45">07:45</option>
                            <option value="07:50">07:50</option>
                            <option value="07:55">07:55</option>
                            <option value="08:00">08:00</option>
                            <option value="08:05">08:05</option>
                            <option value="08:10">08:10</option>
                            <option value="08:15">08:15</option>
                            <option value="08:20">08:20</option>
                            <option value="08:25">08:25</option>
                            <option value="08:30">08:30</option>
                            <option value="08:35">08:35</option>
                            <option value="08:40">08:40</option>
                            <option value="08:45">08:45</option>
                            <option value="08:50">08:50</option>
                            <option value="08:55">08:55</option>
                            <option value="09:00">09:00</option>
                            <option value="09:05">09:05</option>
                            <option value="09:10">09:10</option>
                            <option value="09:15">09:15</option>
                            <option value="09:20">09:20</option>
                            <option value="09:25">09:25</option>
                            <option value="09:30">09:30</option>
                            <option value="09:35">09:35</option>
                            <option value="09:40">09:40</option>
                            <option value="09:45">09:45</option>
                            <option value="09:50">09:50</option>
                            <option value="09:55">09:55</option>
                            <option value="10:00">10:00</option>
                            <option value="10:05">10:05</option>
                            <option value="10:10">10:10</option>
                            <option value="10:15">10:15</option>
                            <option value="10:20">10:20</option>
                            <option value="10:25">10:25</option>
                            <option value="10:30">10:30</option>
                            <option value="10:35">10:35</option>
                            <option value="10:40">10:40</option>
                            <option value="10:45">10:45</option>
                            <option value="10:50">10:50</option>
                            <option value="10:55">10:55</option>
                            <option value="11:00">11:00</option>
                            <option value="11:05">11:05</option>
                            <option value="11:10">11:10</option>
                            <option value="11:15">11:15</option>
                            <option value="11:20">11:20</option>
                            <option value="11:25">11:25</option>
                            <option value="11:30">11:30</option>
                            <option value="11:35">11:35</option>
                            <option value="11:40">11:40</option>
                            <option value="11:45">11:45</option>
                            <option value="11:50">11:50</option>
                            <option value="11:55">11:55</option>
                            <option value="12:00">12:00</option>
                            <option value="12:05">12:05</option>
                            <option value="12:10">12:10</option>
                            <option value="12:15">12:15</option>
                            <option value="12:20">12:20</option>
                            <option value="12:25">12:25</option>
                            <option value="12:30">12:30</option>
                            <option value="12:35">12:35</option>
                            <option value="12:40">12:40</option>
                            <option value="12:45">12:45</option>
                            <option value="12:50">12:50</option>
                            <option value="12:55">12:55</option>
                            <option value="13:00">13:00</option>
                            <option value="13:05">13:05</option>
                            <option value="13:10">13:10</option>
                            <option value="13:15">13:15</option>
                            <option value="13:20">13:20</option>
                            <option value="13:25">13:25</option>
                            <option value="13:30">13:30</option>
                            <option value="13:35">13:35</option>
                            <option value="13:40">13:40</option>
                            <option value="13:45">13:45</option>
                            <option value="13:50">13:50</option>
                            <option value="13:55">13:55</option>
                            <option value="14:00">14:00</option>
                            <option value="14:05">14:05</option>
                            <option value="14:10">14:10</option>
                            <option value="14:15">14:15</option>
                            <option value="14:20">14:20</option>
                            <option value="14:25">14:25</option>
                            <option value="14:30">14:30</option>
                            <option value="14:35">14:35</option>
                            <option value="14:40">14:40</option>
                            <option value="14:45">14:45</option>
                            <option value="14:50">14:50</option>
                            <option value="14:55">14:55</option>
                            <option value="15:00">15:00</option>
                            <option value="15:05">15:05</option>
                            <option value="15:10">15:10</option>
                            <option value="15:15">15:15</option>
                            <option value="15:20">15:20</option>
                            <option value="15:25">15:25</option>
                            <option value="15:30">15:30</option>
                            <option value="15:35">15:35</option>
                            <option value="15:40">15:40</option>
                            <option value="15:45">15:45</option>
                            <option value="15:50">15:50</option>
                            <option value="15:55">15:55</option>
                            <option value="16:00">16:00</option>
                            <option value="16:05">16:05</option>
                            <option value="16:10">16:10</option>
                            <option value="16:15">16:15</option>
                            <option value="16:20">16:20</option>
                            <option value="16:25">16:25</option>
                            <option value="16:30">16:30</option>
                            <option value="16:35">16:35</option>
                            <option value="16:40">16:40</option>
                            <option value="16:45">16:45</option>
                            <option value="16:50">16:50</option>
                            <option value="16:55">16:55</option>
                            <option value="17:00">17:00</option>
                            <option value="17:05">17:05</option>
                            <option value="17:10">17:10</option>
                            <option value="17:15">17:15</option>
                            <option value="17:20">17:20</option>
                            <option value="17:25">17:25</option>
                            <option value="17:30">17:30</option>
                            <option value="17:35">17:35</option>
                            <option value="17:40">17:40</option>
                            <option value="17:45">17:45</option>
                            <option value="17:50">17:50</option>
                            <option value="17:55">17:55</option>
                            <option value="18:00">18:00</option>
                            <option value="18:05">18:05</option>
                            <option value="18:10">18:10</option>
                            <option value="18:15">18:15</option>
                            <option value="18:20">18:20</option>
                            <option value="18:25">18:25</option>
                            <option value="18:30">18:30</option>
                            <option value="18:35">18:35</option>
                            <option value="18:40">18:40</option>
                            <option value="18:45">18:45</option>
                            <option value="18:50">18:50</option>
                            <option value="18:55">18:55</option>
                            <option value="19:00">19:00</option>
                            <option value="19:05">19:05</option>
                            <option value="19:10">19:10</option>
                            <option value="19:15">19:15</option>
                            <option value="19:20">19:20</option>
                            <option value="19:25">19:25</option>
                            <option value="19:30">19:30</option>
                            <option value="19:35">19:35</option>
                            <option value="19:40">19:40</option>
                            <option value="19:45">19:45</option>
                            <option value="19:50">19:50</option>
                            <option value="19:55">19:55</option>
                            <option value="20:00">20:00</option>
                            <option value="20:05">20:05</option>
                            <option value="20:10">20:10</option>
                            <option value="20:15">20:15</option>
                            <option value="20:20">20:20</option>
                            <option value="20:25">20:25</option>
                            <option value="20:30">20:30</option>
                            <option value="20:35">20:35</option>
                            <option value="20:40">20:40</option>
                            <option value="20:45">20:45</option>
                            <option value="20:50">20:50</option>
                            <option value="20:55">20:55</option>
                            <option value="21:00">21:00</option>
                            <option value="21:05">21:05</option>
                            <option value="21:10">21:10</option>
                            <option value="21:15">21:15</option>
                            <option value="21:20">21:20</option>
                            <option value="21:25">21:25</option>
                            <option value="21:30">21:30</option>
                            <option value="21:35">21:35</option>
                            <option value="21:40">21:40</option>
                            <option value="21:45">21:45</option>
                            <option value="21:50">21:50</option>
                            <option value="21:55">21:55</option>
                            <option value="22:00">22:00</option>
                            <option value="22:05">22:05</option>
                            <option value="22:10">22:10</option>
                            <option value="22:15">22:15</option>
                            <option value="22:20">22:20</option>
                            <option value="22:25">22:25</option>
                            <option value="22:30">22:30</option>
                            <option value="22:35">22:35</option>
                            <option value="22:40">22:40</option>
                            <option value="22:45">22:45</option>
                            <option value="22:50">22:50</option>
                            <option value="22:55">22:55</option>
                            <option value="22:00">22:00</option>
                            <option value="22:05">22:05</option>
                            <option value="22:10">22:10</option>
                            <option value="22:15">22:15</option>
                            <option value="22:20">22:20</option>
                            <option value="22:25">22:25</option>
                            <option value="22:30">22:30</option>
                            <option value="22:35">22:35</option>
                            <option value="22:40">22:40</option>
                            <option value="22:45">22:45</option>
                            <option value="22:50">22:50</option>
                            <option value="22:55">22:55</option>
                            <option value="23:00">23:00</option>
                            <option value="23:05">23:05</option>
                            <option value="23:10">23:10</option>
                            <option value="23:15">23:15</option>
                            <option value="23:20">23:20</option>
                            <option value="23:25">23:25</option>
                            <option value="23:30">23:30</option>
                            <option value="23:35">23:35</option>
                            <option value="23:40">23:40</option>
                            <option value="23:45">23:45</option>
                            <option value="23:50">23:50</option>
                            <option value="23:55">23:55</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col xs="8">
                        <FormGroup>
                          <Label htmlFor="ccyear">Service</Label>

                          <Input
                            type="select"
                            name="serviceupdate"
                            id="serviceupdate"
                            onChange={(e) => {
                              this.checkStatusUpdate(e, index);
                            }}
                            disabled={this.state.arrayVal[index]}
                                                        className={this.state.arrayVal[index] && this.state.arrayVal.length > 1?'ondisable':<></>}

                          >
                            <option value="">Select service</option>
                            {this.state.data2.map((val) => (
                              <option value={val.id}>{val.name}     :- {val.time} min</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>

                    <Col xs="6">
                        <FormGroup>
                          <Label htmlFor="ccyear">Select Stylist</Label>
                          <Input
                            type="select"
                            name="employeeupdate"
                            id="employeeupdate"
                            onChange={(e) => {
                              this.checkStatusUpdate(e, index);
                              this.checkSlotWithEmployee(e.target.value)
                            }}
                            disabled={this.state.arrayVal[index]}
                                                        className={this.state.arrayVal[index] && this.state.arrayVal.length > 1?'ondisable':<></>}

                          >
                            <option value="">Select stylist</option>
                            {this.state.empInfo.map((val) => (
                              <option value={val.id}>{val.title}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>

                      <Col xs="6">
                        <FormGroup>
                          <Label htmlFor="ccmonth">Additional Time Allocated</Label>
                          <Input
                            type="select"
                            name="durationupdate"
                            id="durationupdate"
                            onChange={(e) => {
                              this.checkStatusUpdate(e, index);
                            }}
                            disabled={this.state.arrayVal[index]}
                                                        className={this.state.arrayVal[index] && this.state.arrayVal.length > 1?'ondisable':<></>}

                          >
                            <option value="">Duration</option>
                            <option value="0">0 min</option>
                            <option value="15">15 min</option>
                            <option value="30">30 min</option>
                            <option value="45">45 min</option>
                            <option value="60">1 hr</option>
                            <option value="75">1 hr 15 min</option>
                            <option value="90">1 hr 30 min</option>
                            <option value="105">1 hr 45 min</option>
                            <option value="120">2 hr</option>
                          </Input>
                        </FormGroup>
                      </Col>
                   
                    </Row>

                    <hr></hr>
                  </div>
                ))}


{this.state.Addbtn===true?


<div>
                
                       <span onClick={()=>this.addNewForm()}>
                       <i style={{cursor:"pointer"}} title="Click to add an event" className="fa fa-plus-circle fa-3x mt-4 pull-right" ></i>
                     </span>
                     </div>

:<></>}


                {this.state.appdateupdate!==""?
                    <Calendar2
      localizer={localizer}
      events={this.state.availableSlots}
      defaultView={Views.DAY}
      views={['day']}
      date={this.state.appdateupdate}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      resources={this.state.resources}
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
    />:<></>}
                <hr></hr>
                <ModalFooter>
                  <Button color="success" type="submit" id="submitbtn">
                    Save appointment
                  </Button>

                  <Button id="resetbtn" color="secondary" onClick={(e) => this.resetform()}>
                    Reset
                  </Button>
                  </ModalFooter>
                
              </form>
            </div>
          }
        </TabPane>
      </>
    );
  }

  render() {
   
    const { pageNumber } = this.state;
    return (
      <div className="animated fadeIn">
      <Card>
            <CardHeader>
            <h5><i className="fa fa-user fa-lg mt-4" style={{paddingRight:"8px"}}></i>
           Appointment Table View</h5>
          </CardHeader>


        <CardBody>
        
          <div className="row">
          <div className="col-lg-7">
          <FormGroup>
          <Input placeholder={'Search by client name or appointment date '} name="searchString"  onChange={this.handleOnChange}></Input>  
           </FormGroup>
           </div>
            <div className="col-lg-2 ">
             <FormGroup>
            <Input
             type="select"
             id="limit"
             name="limit"
             value={this.state.limit.toString()}
             onChange={this.onSelectLimit}>
              
                <option value="5">5 records</option>
                <option value="10">10 records</option>
                <option value="15">15 records</option>
                <option value="20">20 records</option>
                <option value="25">25 records</option>
                <option value="50">50 records</option>
                <option value="100">100 records</option>
            </Input>
              </FormGroup>
            </div>
            {/* <Button
              onClick={this.toggleLarge}
              color="dark"
              className="pull-right"
              style={{ marginBottom: 20 }}
            >
              Add Appointment
            </Button> */}
          </div>

      
          <Table responsive className="table table-hover hover ">
            <thead>
              <tr>
                {/* <i
                  className="fa fa-reorder fa-lg mt-4"
                  style={{ paddingTop: 12 }}
                ></i> */}
                <th>
                  <i className="fa fa-calendar fa-fw"></i>
                Appointment Date
                </th>
                 <th>
                  <i className="fa fa-user-circle-o fa-fw"></i>
                  Client Name
                </th>
           
                <th>
                  <i className="fa fa-id-card fa-fw mt-4"></i>
                  Details
                </th>
{/*                
                <th >
                  <i className="fa fa-id-card fa-fw mt-4 ml-5"></i>
                  Staff Member
                </th>
                  <th>
                <i className="fa fa-exclamation-triangle fa-fw mt-4 ml-5"></i>
                  Service
                </th> */}
               
              </tr>
            </thead>

            <tbody>
              {this.state.appdata.map((appointment) => (
appointment.is_canceled?
<tr className="table-danger">
                  {/* <i
                    className="fa fa-edit fa-lg mt-4"  style={{cursor:"pointer"}}
                    onClick={() => {
                    
                    }}
                  ></i>

<i
                    className="fa fa-trash fa-lg mt-4 ml-3"  style={{cursor:"pointer"}}
                    onClick={() => {
                  
                    }}
                  ></i> */}

                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.client}</td>
<td style={{width:"700px"}}>
<div class="table-responsive" >
 <Table responsive className="table table-bordered  ">
{/* <thead>
           <th >
                  <i className="fa fa-id-card fa-fw mt-4 ml-5"></i>
                  Staff Member
                </th>
                  <th>
                <i className="fa fa-exclamation-triangle fa-fw mt-4 ml-5"></i>
                  Service
                </th>
                   <th>
                <i className="fa fa-exclamation-triangle fa-fw mt-4 ml-5"></i>
                  Service
                </th>
</thead> */}

                 {appointment.details.map((value)=>(
         <tbody>
                        <tr className="table-light">
                                <td style={{width:"200px"}}>
                                  
                                   <b>Start Time:-</b> {new moment(value.start_time).format("HH:mm")}
                                  
                              </td>

                               <td style={{width:"200px"}}>
                                  
                                   <b>Employee:-</b> {value.employee_name}
                                  
                              </td>

                               <td style={{width:"200px"}}>
                                  
                                   <b>Service:-</b> {value.service}
                                  
                              </td>
                             
                               </tr>

                               </tbody>
                           
                              ))}
                           
                               </Table>
                               </div>
      </td>

                      
                  
              
                </tr>
      
:<tr >
                  {/* <i
                    className="fa fa-edit fa-lg mt-4"  style={{cursor:"pointer"}}
                    onClick={() => {
                    
                    }}
                  ></i>

<i
                    className="fa fa-trash fa-lg mt-4 ml-3"  style={{cursor:"pointer"}}
                    onClick={() => {
                  
                    }}
                  ></i> */}

                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.client}</td>
<td >
<div class="table-responsive">
 <Table responsive className="table table-bordered  ">
{/* <thead>
           <th >
                  <i className="fa fa-id-card fa-fw mt-4 ml-5"></i>
                  Staff Member
                </th>
                  <th>
                <i className="fa fa-exclamation-triangle fa-fw mt-4 ml-5"></i>
                  Service
                </th>
                   <th>
                <i className="fa fa-exclamation-triangle fa-fw mt-4 ml-5"></i>
                  Service
                </th>
</thead> */}

                 {appointment.details.map((value)=>(
         <tbody>
                        <tr className="table-light">
                                <td  style={{width:"200px"}}>
                                  
                                   <b>Start Time:-</b> {new moment(value.start_time).format("HH:mm")}
                                  
                              </td>

                               <td style={{width:"200px"}}>
                                  
                                   <b>Employee:-</b> {value.employee_name}
                                  
                              </td>

                               <td style={{width:"200px"}}>
                                  
                                   <b>Service:-</b> {value.service}
                                  
                              </td>
                             
                               </tr>

                               </tbody>
                           
                              ))}
                           
                               </Table>
                               </div>
      </td>

                      
                  
              
                </tr>
      
               
              ))}
          
            </tbody>
          </Table>

         
          <Pagination>
    

            <PaginationItem disabled={pageNumber <= 1}>
              <PaginationLink
                onClick={(e) => this.receivedData(e, pageNumber - 1)}
                previous
              />
            </PaginationItem>

            {[...Array(this.state.pageCount)].map((page, i) => (
              <PaginationItem active={i === pageNumber - 1} key={i}>
                <PaginationLink onClick={(e) => this.receivedData(e, i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem disabled={pageNumber >= this.state.pageCount}>
              <PaginationLink
                onClick={(e) => this.receivedData(e, pageNumber + 1)}
                next
              />
            </PaginationItem>
            
          </Pagination>



                  <Modal className="modal-xl" isOpen={this.state.large} >
          <ModalHeader  toggle={this.toggleLarge}>Add New Appointment</ModalHeader>
          <ModalBody style={{backgroundImage: `url(${Back})`,backgroundSize:"auto"}}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "1"}
                  onClick={() => {
                    this.toggle(0, "1");
                  }}
                >
                  Client Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.toggle(0, "2");
                  }}
                >
                  Appointment Details
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </ModalBody>
        </Modal>




         <Modal className="modal-xl" isOpen={this.state.largeUpdate} >
          <ModalHeader  toggle={this.toggleLargeUpdate}>Update Appointment</ModalHeader>
          <ModalBody style={{backgroundImage: `url(${Back})`,backgroundSize:"auto"}}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "1"}
                  onClick={() => {
                    this.toggleUpdate(0, "1");
                  }}
                >
                  Client Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.toggleUpdate(0, "2");
                  }}
                >
                  Appointment Details
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPaneForUpdate()}
            </TabContent>
          </ModalBody>
        </Modal>

        </CardBody>
      </Card>
      </div>
    );
  }
}




export default  Client;
