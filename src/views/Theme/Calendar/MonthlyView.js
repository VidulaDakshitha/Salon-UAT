import React, { Component } from "react";
import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
import * as BaseService from "../../../BaseService.js";
import moment from "moment";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import {Views } from 'react-big-calendar';
import Swal from "sweetalert2";

import "react-big-calendar/lib/css/react-big-calendar.css";

import {Card,CardBody,Button,Modal,ModalHeader,FormGroup,Label,Input,ModalBody,Table} from "reactstrap";
import Back from "../../../assets/back.png";

const localizer = momentLocalizer(moment);


class MonthlyView extends Component {
  constructor(props) {
    super(props);
    this.onChange = (date) => this.setState.bind({ date });

    this.state = {
      dropdownOpen: new Array(19).fill(false),
      dropdownOpen2: new Array(19).fill(false),
      dropdownOpen3: new Array(19).fill(false),
      dropdownOpen4: new Array(19).fill(false),
      large: false,
      large1: false,
      arrayVal: [true],
      id: "",
      title: "",
      cards: "",
      description: "",
      daily: true,
      date: new Date(),
      existing: true,
      activeTab: new Array(4).fill("1"),
      NIC: "",
      mobileNum: "",
      mobileNumber: "",
      dialCode: "",
      setdisable: true,
      appdate: "",
      data: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: [],
      data7: [],
      weekdata1: [],
      weekdata2: [],
      weekdata3: [],
      datearray: [],
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
      dailyreport: [],
      empInfo:[],
      events:[],
      reportstart:"",
      reportend:"",
      reportbtn:false,
      eventClickModel:false,
      showEmpName:"",
      showAppTitle:"",
      showDate:"",
      showTimeStart:"",
      showTimeEnd:"",
      loading:true,
     
    };
  }









  componentDidMount =  async() => {
   


    //To get employee data
    const url2 = "/employee/get/";
   await  BaseService.GetDataWithoutParams(url2)
      .then(async(res) => {
        if (res.data.success === true) {
         
        await  res.data.data.map(async val=>{
                    const data={
                      resourceId:val.id,
                      resourceTitle:val.name
                 }
               
                 await this.setState({
                           empInfo:[data,...this.state.empInfo],
                          });
          });

     

        this.eventInfo();

        } else {
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Oops...",
            text: "Error loading data!",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: "error",
          title: "Oops...",
          text: "Error loading data!",
        });
      });


    
    //to get daily appointments
    
      //await this.eventInfo();
    
    
  };


  displayEventClick=(info)=>{

  

 const index1=this.state.empInfo.findIndex(async (res)=>{
  
  return await res.resourceId===info.resourceId
  
});

this.setState({
  showAppTitle:info.title,
  showEmpName:this.state.empInfo[index1].resourceTitle,
  showDate:info.start.getDate()+"/"+(info.start.getMonth()+1)+"/"+info.start.getFullYear(),
 showTimeStart:moment(info.start).format("HH:mm"),
  showTimeEnd:moment(info.end).format("HH:mm"),
},()=>{this.eventClickModelFunction()})


  }


  eventClickModelFunction=()=>{

    this.setState({
      eventClickModel: !this.state.eventClickModel,
    });
  
  }


  eventInfo=()=>{

    let data=""
 const dateparam = moment(moment().add(60,'d').toDate()).format("YYYY-MM-DD");
    //const dateparam = moment(this.state.date).format("YYYY-MM-DD");
    const paramdata = {
      first_date: moment(moment().subtract(10,'d').toDate()).format("YYYY-MM-DD"),
      second_date: dateparam,
    };

    const url2 = "/appointment/get/";
    BaseService.GetDataWithParams(url2, paramdata)
      .then((res2) => {

        if (res2.data.success === true) {

res2.data.data.map(async value=>{

  
  
  await value.details.map(async value2=>{



    if(value.is_canceled===true)
    {
    data= {
      id:value.id,
      title:value2.service+" (cancelled)",
      start:new Date(value2.start_time),
      end:new Date(value2.end_time),
      resourceId: value2.employee_id,
      
    }
  }else{

    data= {
      id:value.id,
      title:value2.service,
      start:new Date(value2.start_time),
      end:new Date(value2.end_time),
      resourceId: value2.employee_id,
      
    }

  }

 this.setState({
  events:[data,...this.state.events]
},console.log(this.state.events))



  })
})


        }else{


        }
      
      })
        .catch((err) => {
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Oops...",
            text: "Error loading data!",
          });
        });
  }


eventClickModelFunction=()=>{

  this.setState({
    eventClickModel: !this.state.eventClickModel,
  });

}

  //getting service and client data

  GetServiceAndClient = () => {
    const url = "/client/get/";
    BaseService.GetDataWithoutParams(url)
      .then((res) => {
        if (res.data.success === true) {
          this.setState({
            data: res.data.data,
          });
        } else {
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Oops...",
            text: "Error loading data!",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: "error",
          title: "Oops...",
          text: "Error loading data!",
        });
      });

    const url1 = "/service/get/";
    BaseService.GetDataWithoutParams(url1)
      .then((res) => {
        if (res.data.success === true) {
          this.setState({
            data2: res.data.data,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error loading data!",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: "error",
          title: "Oops...",
          text: "Error loading data!",
        });
      });
  };

  Report=()=>{

    const dateparam = moment(this.state.reportstart).format("YYYY-MM-DD");
    const dateparam2 = moment(this.state.reportend).format("YYYY-MM-DD");
    const paramdata = {
      first_date: dateparam,
      second_date: dateparam2,
    };

    const url2 = "/appointment/get/";
    BaseService.GetDataWithParams(url2, paramdata)
      .then((res2) => {

        if (res2.data.success === true) {

res2.data.data.map(async value=>{

  
  
  await value.details.map(async value2=>{

 
    const data=await {
      id:value.id,
      client:value.client,
      name:value2.employee,
      title:value2.service,
      start:value2.start_time,
      end:value2.end_time
    }

await this.setState({
  dailyreport:[data,...this.state.dailyreport]
},console.log(this.state.events))
  })
})


        }else{


        }
      
      })
        .catch((err) => {
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Oops...",
            text: "Error loading data!",
          });
        });

  }



  cancelAppointmentSubmit=(e)=>{

    e.preventDefault();


    const data = {
   
    };

    const url = "/appointment/save/";
    BaseService.PostService(url, data)
      .then((res) => {
        if (res.data.success === true) {
       
          this.setState({
            eventClickModel: false,
          });

          Swal.fire(
            "Good job!",
            "Appointment successfuly inserted",
            "success"
          );
         

         
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
      
        Swal.fire({
          allowOutsideClick: false,
          icon: "error",
          title: "Oops...",
          text: "cannot perform operation!",
        });
      });
  }



  //change handler for add appointment date

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
    const dt = Date.parse(e.target.value) + 86400000;
    const currday = new Date();
    const today = new Date();
    console.log(
      currday.getFullYear() + "-" + currday.getMonth() + "-" + currday.getDate()
    );
    console.log("This is today time" + today);
    if (!isNaN(dt) && dt < today.getTime()) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Oops...",
        text: "You cannot add appointments to past dates!",
      });
      this.setState({
        appdate: "",
        arrayVal: [true],
      });
    } else {
      this.setState({
        arrayVal: [false],
      });
    }
  };

  //for manual input for client details
  handleInputChange = (input, e) => {
    this.setState({
      setdisable: false,
      fullnameInput: input,
      NIC: "",
      mobileNum: "94",
    });
    console.log("value", input);
  };

  //for drop down selection of client details
  handleChange = (selectedOptions) => {
    let selectID = 0;
    selectedOptions.map((val) => {
      selectID = val.id;
    });
    console.log(selectID);
    this.setState({
      setdisable: true,
      clientID: selectID,
    });
    selectedOptions.map((values) => {
      const code = values.country_code.split("+");
      this.setState({
        NIC: values.nic,
        mobileNum: code[1] + values.mobile,
      });
    });
  };

  //change handler for genral inputs
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //for appointment submit
  appointmentSubmit = (e) => {
    e.preventDefault();
 
    if (this.state.appdate !== "" && this.state.appointmentDet.length !== 0) {
      if (this.state.setdisable === true) {
        let start = "";
        const cldetails = {
          client_id: this.state.clientID,
        };

        this.state.appointmentDet.map((val, index) => {
          if (index === 0) {
            start = val.start_time;
          }
        });
        const appdetails = {
          appointment_date: this.state.appdate,
          appointment_time: start,
        };

     
        const data = {
          client: cldetails,
          appointment: appdetails,
          detail: this.state.appointmentDetails,
        };

        const url = "/appointment/save/";
        BaseService.PostService(url, data)
          .then((res) => {
            if (res.data.success === true) {
           
              this.setState({
                large: false,
              });

              Swal.fire(
                "Good job!",
                "Appointment successfuly inserted",
                "success"
              );
              window.location.reload();
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
          
            Swal.fire({
              allowOutsideClick: false,
              icon: "error",
              title: "Oops...",
              text: "cannot perform operation!",
            });
          });
      } else {
        let start = "";
        const cldetails = {
          client_id: 0,
          nic: this.state.NIC,
          name: this.state.fullnameInput,
          country_code: "+" + this.state.dialCode,
          mobile: this.state.mobileNumber,
        };

        this.state.appointmentDet.map((val, index) => {
          if (index === 0) {
            start = val.start_time;
          }
        });
        const appdetails = {
          appointment_date: this.state.appdate,
          appointment_time: start,
        };
     

        const data = {
          client: cldetails,
          appointment: appdetails,
          detail: this.state.appointmentDetails,
        };

        const url = "/appointment/save/";
        BaseService.PostService(url, data)
          .then((res) => {
            if (res.data.success === true) {
            

              this.setState({
                large: false,
              });

              Swal.fire(
                "Good job!",
                "Appointment successfuly inserted",
                "success"
              );
              window.location.reload();
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
         
            Swal.fire({
              allowOutsideClick: false,
              icon: "error",
              title: "Oops...",
              text: "cannot perform operation!",
            });
          });
      }
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Oops...",
        text: "Please fill all details before saving appointment!",
      });
    }
  };



  toggleLarge = () => {
    this.setState({
      large: !this.state.large,
    });
  };

  toggleLarge1 = () => {
    this.setState({
      large1: !this.state.large1,
    });
  };

  passValues = () => {
    this.setState({
      id: this.state.data.rank,
      title: this.data.name,
    });
  };

  getlocation = (location, source) => {
    console.log(location);
    console.log(source);
  };

  toggle = (tabPane, tab) => {
    if (
      this.state.NIC !== "" &&
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
  };

  changeValue = (e) => {
    this.setState({
      arrayVal: [false, ...this.state.arrayVal],
    });
  };

  //for calendar drop down
  toggle1 = (i) => {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  };

  //for names drop down
  toggle2 = (i) => {
    const newArray = this.state.dropdownOpen2.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen2: newArray,
    });
  };

  // for daily weekly drop down
  toggle3 = (i) => {
    const newArray = this.state.dropdownOpen3.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen3: newArray,
    });
  };

  toggle4 = (i) => {
    const newArray = this.state.dropdownOpen4.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen4: newArray,
    });
  };

  //for appoitnemt details validity check
  checkStatus = (e, index) => {


    let servtime = 0;
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        var time2 = moment().format("YYYY-MM-DD");

        if (this.state.starttime !== "" && time2 === this.state.appdate) {
          if (
            Date.parse(
              this.state.appdate + " " + this.state.starttime + ":00"
            ) < new Date()
          ) {
            Swal.fire({
              allowOutsideClick: false,
              icon: "error",
              title: "Oops...",
              text: "cannot add appointment to past time!",
            });

            this.setState({
              starttime: "",
            });
          }
        }

        if (
          this.state.cktime === true &&
          this.state.appointmentDet.length !== 0
        ) {
          console.log("function visited");
          const arr = this.state.appointmentDet[
            this.state.appointmentDet.length - 1
          ];

          console.log(arr["lasttime"]);
          console.log(this.state.starttime);

          if (this.state.starttime < arr["lasttime"]) {
            alertify.alert(
              "Next appointment can be placed after first appointment. Previous appointment ends at " +
                arr["lasttime"]
            );

            this.setState({
              starttime: "",
            });
          }
        }

        if (
          this.state.appdate !== "" &&
          this.state.starttime !== "" &&
          this.state.employee !== "" &&
          this.state.duration !== "" &&
          this.state.service !== ""
        ) {
          this.state.data2.map((item) => {
            if (parseInt(item.id) === parseInt(this.state.service)) {
              servtime = item.time;
            }
          });

          console.log("duration time" + this.state.duration);

          const durationminutes =
            parseInt(this.state.duration) + parseInt(servtime);

          const endtime = moment(this.state.starttime + ":00", "HH:mm:ss")
            .add(durationminutes, "minutes")
            .format("HH:mm");
          console.log("end time" + endtime);

          const data = {
            employee: parseInt(this.state.employee),
            date: this.state.appdate,
            start_time: this.state.starttime + ":00",
            duration: parseInt(this.state.duration),
            service: parseInt(this.state.service),
          };

          const data2 = {
            employee: parseInt(this.state.employee),
            date: this.state.appdate,
            start_time: this.state.starttime + ":00",
            duration: parseInt(this.state.duration),
            service: parseInt(this.state.service),
            lasttime: endtime + ":00",
            indexarr: index,
          };

       
          const url = "/appointment/check/";
          BaseService.PostService(url, data)
            .then((res) => {
          

              if (res.data.success === true) {
                console.log(res);
                alertify.success("Slot Available");

                this.setState(
                  {
                    arrayVal: [...this.state.arrayVal, false],
                  },
                  console.log("array before" + this.state.arrayVal)
                );
                const somearray = [...this.state.arrayVal];
                somearray[index] = true;

                console.log(somearray);
                this.setState({
                  arrayVal: somearray,
                  appointmentDet: [...this.state.appointmentDet, data2],
                  appointmentDetails: [...this.state.appointmentDetails, data],
                  starttime: "",
                  employee: "",
                  duration: "",
                  service: "",
                  cktime: true,
                  datedisable: true,
                });
              } else {
                alertify.alert("Slot unavailable");
              }
            })
            .catch((err) => {
              alertify.alert("Cannot perform the operation");
            });
        }
      }
    );
  };

  //for appointment form selection
  printconsole = (index) => {
    console.log(index);

    const copy = Object.assign([], this.state.arrayVal);
    copy.splice(index, 1);
    this.setState(
      {
        arrayVal: copy,
      },
      () => console.log("del" + this.state.arrayVal)
    );

    const index1 = this.state.appointmentDet.findIndex((res) => {
      return res.indexarr === index;
    });
    console.log("this is index1" + index1);
  };

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
        arrayVal: [false],
        appointmentDet: [],
      },
      console.log("array value" + this.state.arrayVal)
    );
    this.state.appointmentDet.splice();
    console.log("this is appointment" + this.state.appointmentDet);
    console.log("array value" + this.state.arrayVal);
  };
  //made change



  handleDateClick = (arg) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };




  render() {
    

 
    return (
      <div className="animated fadeIn">
{this.state.empInfo.length===0 && this.state.events===0?<p>Please wait for data to load</p>:<></>}
        <div>
          <Button color="dark" onClick={()=>window.location.href="/#/saloon/Calendar"}>
            Back
          </Button>
        </div><br></br>
          <Card>
              <CardBody>
              <Calendar
              
      localizer={localizer}
      events={this.state.events}
      defaultView={Views.DAY}
      views={['day']}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      resources={this.state.empInfo}
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
      onSelectEvent={this.displayEventClick}
     
    />
  </CardBody>
</Card>



<Modal isOpen={this.state.eventClickModel} toggle={this.eventClickModelFunction}>
          <ModalHeader toggle={this.eventClickModelFunction}><i className="fa fa-calendar-o fa-lg mt-4" style={{paddingRight:"8px"}}></i>View Event</ModalHeader>
          <ModalBody style={{backgroundImage: `url(${Back})`,backgroundSize:"auto"}}>
           <Table responsive className="table table-striped table-dark  ">
          <tbody>
                  <tr>
                        <td><b>Appointment Type</b></td>
                        <td>{this.state.showAppTitle}</td>
                  </tr>
                  <tr>
                          <td><b>Appointment assigned employee</b></td>
                          <td>{this.state.showEmpName}</td>
                  </tr>
                  <tr>
                          <td><b>Appointment Date</b></td>
                          <td>{this.state.showDate}</td>
                  </tr>
                  <tr>
                          <td><b>Appointment Start Time</b></td>
                          <td> {this.state.showTimeStart}</td>
                  </tr>
                  <tr>
                          <td><b>Appointment End Time</b></td>
                          <td> {this.state.showTimeEnd}</td>
                  </tr>
              
          </tbody>
          </Table>
          {/* <p><b>Appointment Type:-</b> {this.state.showAppTitle} </p>
        <p ><b>Appointment assigned employee:-</b> {this.state.showEmpName}</p>
        <p ><b>Appointment Date:-</b> {this.state.showDate}</p>
        <p ><b>Appointment Start Time:-</b> {this.state.showTimeStart}</p>
        <p ><b>Appointment End Time:-</b> {this.state.showTimeEnd}</p><br></br> */}
        {/* <div className="float-right">
        <Button color="dark" onClick={()=>{this.setState({cancelAppointment:true})}}>Cancel Appointment</Button>
        </div><br></br>
        {this.state.cancelAppointment===true?
        <form onSubmit={this.cancelAppointmentSubmit}>
        <FormGroup>
                    <Label htmlFor="NIC">Cancel Reason</Label>
                    <Input
                      type="textarea"
                      id="cancelReason"
                      name="cancelReason"
                      placeholder="Enter Cancel Reason"
                      value={this.state.NIC}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                  <Button className="btn btn-danger" type="submit">Submit Cancellation</Button>
                  </form>
                  :<></>} */}
          </ModalBody>
        </Modal>



      </div>
    );
  }

}





export default MonthlyView;
