import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
//import * as BaseService from "../../../BaseService.js";
import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
import * as BaseService from "../../../BaseService.js";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import moment from "moment";
import { Calendar as Calendar2, momentLocalizer,Views } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DailyDisplay from "./DailyDisplay.js";
import Swal from "sweetalert2";

import Back from "../../../assets/bg6.jpg";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label,
  ButtonDropdown,
  Modal,
  ModalBody,
  ModalHeader,
  CardHeader,
  Button,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
} from "reactstrap";
import WeeklyDisplay from "./WeeklyDisplay.js";

import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const localizer = momentLocalizer(moment);
class List extends Component {
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
      data8: [],
      data9: [],
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
      dailyreport:[],
      sendReminder:0,
      sendSMS:0,

    };
  }

  componentDidMount = async () => {
   

     //To get employee data
    const url2= "/employee/get/";
   await BaseService.GetDataWithoutParams(url2)
      .then((res) => {


        if (res.data.success === true) {

          this.setState({
            data4: res.data.data,
          },
          () => {

            if(res.data.data.length!==0)
            {

            
            this.setState({
              selectemp: this.state.data4[0].id,
              selectempname: this.state.data4[0].name,
            });
          }

          });

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



//to get daily appointments
    await this.fordailydisplay();
  
  };



  
SmsreminderCheck=(e)=>{
  if(e.target.checked===true)
  {
    this.setState({
      sendReminder:1
    })
  }else{
    this.setState({
      sendReminder:0
    })
  }
  
  }

  


  ShowAvailableSlots=(date)=>{
    console.log("slot"+date);
      this.setState({
        resources:[],
        availableSlots:[]
      },()=>{
    this.state.events.map(async(val)=>{
    
      const dateparam = moment(val.start).format("YYYY-MM-DD");
      console.log("slot"+date);
      console.log(dateparam);
      if(dateparam===date){
    
        const data=await{
          id:val.id,
          title:val.desc,
          start:new Date(val.start),
          end:new Date(val.end),
          resourceId:val.resourceId
        }
        
    
    this.setState({
      availableSlots:[data,...this.state.availableSlots],
      resources:this.state.empInfo
    })
      }
    
    
    })
    
    })
    
    
    }

    


  SmsCheck=(e)=>{
    if(e.target.checked===true)
    {
      this.setState({
        sendSMS:1
      })
    }else{
      this.setState({
        sendSMS:0
      })
    }
    
    }

//for daily appointment display
  fordailydisplay = () => {

    
    
    let count = 0;
    this.state.data4.map(async(val,index) => {
      const dateparam = moment(this.state.date).format("YYYY-MM-DD");


      const paramdata= {
        first_date: dateparam,
        second_date: dateparam,
        employee_id: val.id,
      };
      const url2= "/appointment/getbyemployee/";
 BaseService.GetDataWithParams(url2,paramdata)
      .then((res2) => {


        if (res2.data.success === true) {
          this.setState(
            {
              data5: [],
              data6: [],
              data8:[],
              data9:[],
            },
            async () => {
              if (res2.data.data.length !== 0) {
                this.setState(
                  {
                    data5: res2.data.data,
                    appemp: val.name,
                  },
                  async () => {
                    await this.state.data5.map(async (value) => {
                      count = count + 1;
                      const startparam = moment(value.start_time).format(
                        "HH:mm:ss"
                      );
                      const endtimeparam = moment(value.end_time).format(
                        "HH:mm:ss"
                      );


                      if(value.is_canceled===true)
                      {
                        var data =  await{
                          id: count.toString(),
                          title: value.service,
                          label: startparam + " " + endtimeparam,
                          description: "Client is " + value.client+" (Cancelled)",
                          
                        };
                      }else{


                        var data =  await{
                          id: count.toString(),
                          title: value.service,
                          label:"Start: "+startparam + " End: " +endtimeparam,
                          description: "Client is " + value.client+" ",

                        }
                     
                    }
                      // var data1 =  {
                     
                      //   name:this.state.appemp,
                      //   title: value.service,
                      //   start: startparam,
                      //   end:endtimeparam,
                      //   client:value.client,
                      // };

                      await this.setState(
                        {
                          data6: [data, ...this.state.data6],
                          
                        },
                        () => {
                          console.log("data6");
                          console.log(this.state.data6);
                        }
                      );
                    });

                    const app = await {
                      id: index,
                      title: this.state.appemp,
                      cards: this.state.data6,
                      
                    };
                    console.log(app);

                    this.setState({
                      data7: [app, ...this.state.data7],
                    });
                  }
                );
              }else{

                console.log("visted else")

                count = count + 1;

           
                     


                        var data =  await{
                          id: count.toString(),
                          title:"No Appointments",
                         
                          
                        };
                


                    const app = await {
                      id: index,
                      title: val.name,
                      cards: [data],
                      
                    };

                    console.log(app);

                    this.setState({
                      data7: [app,...this.state.data7],
                    })
               






              }
            }
          );

        

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



    });
  };

  //get weekly appointments per employee name
  selectstaff = (val, valname) => {
    this.setState(
      {
        selectemp: val,
        selectempname: valname,
        weekdata2: [],
        weekdata3: [],
        dropdownOpen2: new Array(19).fill(false),
      },
      () => {
        
        this.forweeklydisplay();
      }
    );
  };

  //get appoointment data weekly
  forweeklydisplay = () => {
   
    let count = 0;
    console.log(this.state.date);
    const dateparam = moment(this.state.date).format("YYYY-MM-DD");
    const dateparamforweek = moment(dateparam, "YYYY-MM-DD")
      .add(1, "days")
      .format("YYYY-MM-DD");
    const dateparamforweek2 = moment(dateparam, "YYYY-MM-DD")
      .add(2, "days")
      .format("YYYY-MM-DD");
    const dateparamforweek3 = moment(dateparam, "YYYY-MM-DD")
      .add(3, "days")
      .format("YYYY-MM-DD");
    const dateparamforweek4 = moment(dateparam, "YYYY-MM-DD")
      .add(4, "days")
      .format("YYYY-MM-DD");
    const dateparamforweek5 = moment(dateparam, "YYYY-MM-DD")
      .add(5, "days")
      .format("YYYY-MM-DD");
    const dateparamforweek6 = moment(dateparam, "YYYY-MM-DD")
      .add(6, "days")
      .format("YYYY-MM-DD");

    this.setState(
      {
        datearray: [
          dateparam,
          dateparamforweek,
          dateparamforweek2,
          dateparamforweek3,
          dateparamforweek4,
          dateparamforweek5,
          dateparamforweek6,
        ],
      },
      () => {
        return Promise.all(
          this.state.datearray.map(async  (day, index) =>{
            return axios.get(

              global.Backend +
                "/appointment/getbyemployee/?first_date=" +
                this.state.datearray[index] +
                "&second_date=" +
                this.state.datearray[index] +
                "&employee_id=" +
                this.state.selectemp,
                {headers: {
                  "content-type": "application/json", // whatever you want
                  Authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
                }}
            );
          })
        ).then(async (res) => {
  
          res.map((val, index) => {
            count = count + 1;
            console.log(count);
            this.setState({
              weekdata2: [],
            });

            if(res[index].data.data.length!==0)
            {

            res[index].data.data.map((value) => {
        let count1=0;
        console.log("length"+res[index].data.data.length)
            
                console.log("visited weely if")
              

              console.log("for each count" + count);

              const startparam = moment(value.start_time).format("HH:mm:ss");
              const endtimeparam = moment(value.end_time).format("HH:mm:ss");
              if(value.is_canceled)
              {

                  var data = {
                id: startparam,
                title: value.service,
                label: startparam + " " + endtimeparam,
                description: "Client is " + value.client+' (cancelled)',
               
              };

              }else{

  var data = {
                id: startparam,
                title: value.service,
                label: startparam + " " + endtimeparam,
                description: "Client is " + value.client,
               
              };
              }

            

            

              this.setState(
                {
                  weekdata2: [...this.state.weekdata2, data],
                },
                console.log(this.state.weekdata2)
              );





            });




          }else{


            var data = {
              id: new Date(),
              title: "",
              description:"No Appointments"
              
             
            };

          

            this.setState(
              {
                weekdata2: [...this.state.weekdata2, data],
              },
              console.log(this.state.weekdata2)
            );

          }


            const app = {
              id: count.toString(),
              title: this.state.datearray[index],
              cards: this.state.weekdata2,
            };
            console.log("the app");
            console.log(app);

            this.setState({
              weekdata3: [...this.state.weekdata3, app],
              weekdata2: [],
            });
          });
        });
      }
    );
  };


  //getting service and client data

  GetServiceAndClient=()=>{

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





    const url1 = "/service/get/";
    BaseService.GetDataWithoutParams(url1)
      .then((res) => {


        if (res.data.success === true) {

          this.setState({
            data2: res.data.data,
          });

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
    let count = 0;

    if (this.state.appdate !== "" && this.state.appointmentDet.length !== 0) {
      if (this.state.setdisable === true) {
        let start = "";
        const cldetails = {
          client_id: this.state.clientID,
          send_sms:this.state.sendSMS,
          send_reminder:this.state.sendReminder
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

      

        const data={
          client: cldetails,
            appointment: appdetails,
            detail: this.state.appointmentDetails

        }

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
          send_sms:this.state.sendSMS,
          send_reminder:this.state.sendReminder
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
      



        const data={
          client: cldetails,
            appointment: appdetails,
            detail: this.state.appointmentDetails

        }

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

  //for calendar date selection
  onSelectCalendar = (gate) => {
    this.setState(
      {
        date: gate,
        data7: [],
        weekdata2: [],
        weekdata3: [],
        dropdownOpen: new Array(19).fill(false),
      },
      async () => {
        this.fordailydisplay();
        await this.forweeklydisplay();
      }
    );
  };

  toggleLarge=()=> {
    this.setState({
      large: !this.state.large,
    });
  }

  toggleLarge1=()=> {
    this.setState({
      large1: !this.state.large1,
    });
  }

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

 


  toggle=(tabPane, tab)=> {
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
  }

  changeValue = (e) => {
    this.setState({
      arrayVal: [false, ...this.state.arrayVal],
    });
  };

  //for calendar drop down
  toggle1=(i)=> {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  //for names drop down
  toggle2=(i)=> {
    const newArray = this.state.dropdownOpen2.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen2: newArray,
    });
  }

  // for daily weekly drop down
  toggle3=(i)=> {
    const newArray = this.state.dropdownOpen3.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen3: newArray,
    });
  }

  toggle4=(i)=> {
    const newArray = this.state.dropdownOpen4.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen4: newArray,
    });
  }

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


  //for add appointment tab pane
//   tabPane() {
//     return (
//       <>
//         <TabPane tabId="1">
//           {
//             <form>
//               <Card style={{ border: "transparent" }}>
//                 <CardBody>
//                   {/* <FormGroup> */}
//                   <Label htmlFor="fullName">Full Name</Label>
//                   <Typeahead
//                     filterBy={(option, props) => {
//                       if (props.selected.length > 0) {
//                         // Display all the options if there's a selection.
                     
//                         return true;
//                       }
//                       // Otherwise filter on some criteria.
//                       return (
//                         option.name
//                           .toLowerCase()
//                           .indexOf(props.text.toLowerCase()) !== -1
//                       );
//                     }}
//                     id="basic-typeahead-example"
//                     labelKey="name"
//                     options={this.state.data}
//                     placeholder="Choose a state..."
//                     onInputChange={this.handleInputChange}
//                     onChange={this.handleChange}
//                   />

//                   <FormGroup>
//                     <Label htmlFor="NIC">NIC</Label>
//                     <Input
//                       type="text"
//                       id="NIC"
//                       name="NIC"
//                       disabled={this.state.setdisable}
//                       placeholder="Enter NIC"
//                       value={this.state.NIC}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <Label htmlFor="mobileNumber">Mobile Number</Label>
//                     <PhoneInput
//                       containerStyle={{ width: "20px" }}
//                       country={"lk"}
//                       disabled={this.state.setdisable}
//                       name="mobileNumber"
//                       value={this.state.mobileNum}
//                       onChange={(country, value, event) => {
//                         this.setState({
//                           dialCode: value["dialCode"],
//                           Country: value["name"],
//                           mobileNumber: country.slice(value.dialCode.length),
//                         });
//                       }}
//                     />
//                   </FormGroup>

//                   <FormGroup check>
//         <Label check>
//           <Input name="sms" value="sms" type="checkbox" onChange={this.SmsCheck}/>{' '}
//           Check this box if you want to send sms
//         </Label>
//       </FormGroup><br></br>


//       <FormGroup check>
//         <Label check>
//           <Input type="checkbox" value="reminder" name="reminder" onChange={this.SmsreminderCheck}/>{' '}
//           Check this box if you want to send reminder
//         </Label>
//       </FormGroup><br></br>



//                   <Button
//                     color="primary"
//                     onClick={() => {
//                       this.toggle(0, "2");
//                     }}
//                   >
//                     Save and next
//                   </Button>
//                 </CardBody>
//               </Card>
//             </form>
//           }
//         </TabPane>
//         <TabPane tabId="2">
//           {
//             <div>
//               <form onSubmit={this.appointmentSubmit}>
//                 <FormGroup row>
//                   <Col md="3">
//                     <Label htmlFor="date-input">Appointment Date</Label>
//                   </Col>
//                   <Col xs="12" md="9">
//                     <Input
//                       type="date"
//                       id="appdate"
//                       name="appdate"
//                       placeholder="date"
//                       value={this.state.appdate}
//                       onChange={this.onChangeHandler}
//                       disabled={this.state.datedisable}
//                     />
//                   </Col>
//                 </FormGroup>



// <hr style={{paddingBottom:"10px"}}></hr>
//                 {this.state.arrayVal.map((val, index) => (
//                   <div>
//                     {this.state.arrayVal.length > 1 ? (
//                       <span onClick={(e) => this.printconsole(index)}>
//                         <i className="fa fa-close fa-lg mt-4 pull-right"></i>
//                       </span>
//                     ) : (
//                       <p></p>
//                     )}

//                     <Row>
//                       <Col xs="4">
//                         <FormGroup>
//                           <Label htmlFor="ccmonth">start time</Label>
//                           <Input
//                             type="select"
//                             name="starttime"
//                             id="starttime"
//                             onChange={(e) => {
//                               this.checkStatus(e, index);
//                             }}
//                             disabled={this.state.arrayVal[index]}
//                           >
//                             <option value="">Time</option>
//                             <option value="00:05">00:05</option>
//                             <option value="00:10">00:10</option>
//                             <option value="00:15">00:15</option>
//                             <option value="00:20">00:20</option>
//                             <option value="00:25">00:25</option>
//                             <option value="00:30">00:30</option>
//                             <option value="00:35">00:35</option>
//                             <option value="00:40">00:40</option>
//                             <option value="00:45">00:45</option>
//                             <option value="00:50">00:50</option>
//                             <option value="00:55">00:55</option>
//                             <option value="01:00">01:00</option>
//                             <option value="01:05">01:05</option>
//                             <option value="01:10">01:10</option>
//                             <option value="01:15">01:15</option>
//                             <option value="01:20">01:20</option>
//                             <option value="01:25">01:25</option>
//                             <option value="01:30">01:30</option>
//                             <option value="01:35">01:35</option>
//                             <option value="01:40">01:40</option>
//                             <option value="01:45">01:45</option>
//                             <option value="01:50">01:50</option>
//                             <option value="01:55">01:55</option>
//                             <option value="02:00">02:00</option>
//                             <option value="02:05">02:05</option>
//                             <option value="02:10">02:10</option>
//                             <option value="02:15">02:15</option>
//                             <option value="02:20">02:20</option>
//                             <option value="02:25">02:25</option>
//                             <option value="02:30">02:30</option>
//                             <option value="02:35">02:35</option>
//                             <option value="02:40">02:40</option>
//                             <option value="02:45">02:45</option>
//                             <option value="02:50">02:50</option>
//                             <option value="02:55">02:55</option>
//                             <option value="03:00">03:00</option>
//                             <option value="03:05">03:05</option>
//                             <option value="03:10">03:10</option>
//                             <option value="03:15">03:15</option>
//                             <option value="03:20">03:20</option>
//                             <option value="03:25">03:25</option>
//                             <option value="03:30">03:30</option>
//                             <option value="03:35">03:35</option>
//                             <option value="03:40">03:40</option>
//                             <option value="03:45">03:45</option>
//                             <option value="03:50">03:50</option>
//                             <option value="03:55">03:55</option>
//                             <option value="04:00">04:00</option>
//                             <option value="04:05">04:05</option>
//                             <option value="04:10">04:10</option>
//                             <option value="04:15">04:15</option>
//                             <option value="04:20">04:20</option>
//                             <option value="04:25">04:25</option>
//                             <option value="04:30">04:30</option>
//                             <option value="04:35">04:35</option>
//                             <option value="04:40">04:40</option>
//                             <option value="04:45">04:45</option>
//                             <option value="04:50">04:50</option>
//                             <option value="04:55">04:55</option>
//                             <option value="05:00">05:00</option>
//                             <option value="05:05">05:05</option>
//                             <option value="05:10">05:10</option>
//                             <option value="05:15">05:15</option>
//                             <option value="05:20">05:20</option>
//                             <option value="05:25">05:25</option>
//                             <option value="05:30">05:30</option>
//                             <option value="05:35">05:35</option>
//                             <option value="05:40">05:40</option>
//                             <option value="05:45">05:45</option>
//                             <option value="05:50">05:50</option>
//                             <option value="05:55">05:55</option>
//                             <option value="06:00">06:00</option>
//                             <option value="06:05">06:05</option>
//                             <option value="06:10">06:10</option>
//                             <option value="06:15">06:15</option>
//                             <option value="06:20">06:20</option>
//                             <option value="06:25">06:25</option>
//                             <option value="06:30">06:30</option>
//                             <option value="06:35">06:35</option>
//                             <option value="06:40">06:40</option>
//                             <option value="06:45">06:45</option>
//                             <option value="06:50">06:50</option>
//                             <option value="06:55">06:55</option>
//                             <option value="07:00">07:00</option>
//                             <option value="07:05">07:05</option>
//                             <option value="07:10">07:10</option>
//                             <option value="07:15">07:15</option>
//                             <option value="07:20">07:20</option>
//                             <option value="07:25">07:25</option>
//                             <option value="07:30">07:30</option>
//                             <option value="07:35">07:35</option>
//                             <option value="07:40">07:40</option>
//                             <option value="07:45">07:45</option>
//                             <option value="07:50">07:50</option>
//                             <option value="07:55">07:55</option>
//                             <option value="08:00">08:00</option>
//                             <option value="08:05">08:05</option>
//                             <option value="08:10">08:10</option>
//                             <option value="08:15">08:15</option>
//                             <option value="08:20">08:20</option>
//                             <option value="08:25">08:25</option>
//                             <option value="08:30">08:30</option>
//                             <option value="08:35">08:35</option>
//                             <option value="08:40">08:40</option>
//                             <option value="08:45">08:45</option>
//                             <option value="08:50">08:50</option>
//                             <option value="08:55">08:55</option>
//                             <option value="09:00">09:00</option>
//                             <option value="09:05">09:05</option>
//                             <option value="09:10">09:10</option>
//                             <option value="09:15">09:15</option>
//                             <option value="09:20">09:20</option>
//                             <option value="09:25">09:25</option>
//                             <option value="09:30">09:30</option>
//                             <option value="09:35">09:35</option>
//                             <option value="09:40">09:40</option>
//                             <option value="09:45">09:45</option>
//                             <option value="09:50">09:50</option>
//                             <option value="09:55">09:55</option>
//                             <option value="10:00">10:00</option>
//                             <option value="10:05">10:05</option>
//                             <option value="10:10">10:10</option>
//                             <option value="10:15">10:15</option>
//                             <option value="10:20">10:20</option>
//                             <option value="10:25">10:25</option>
//                             <option value="10:30">10:30</option>
//                             <option value="10:35">10:35</option>
//                             <option value="10:40">10:40</option>
//                             <option value="10:45">10:45</option>
//                             <option value="10:50">10:50</option>
//                             <option value="10:55">10:55</option>
//                             <option value="11:00">11:00</option>
//                             <option value="11:05">11:05</option>
//                             <option value="11:10">11:10</option>
//                             <option value="11:15">11:15</option>
//                             <option value="11:20">11:20</option>
//                             <option value="11:25">11:25</option>
//                             <option value="11:30">11:30</option>
//                             <option value="11:35">11:35</option>
//                             <option value="11:40">11:40</option>
//                             <option value="11:45">11:45</option>
//                             <option value="11:50">11:50</option>
//                             <option value="11:55">11:55</option>
//                             <option value="12:00">12:00</option>
//                             <option value="12:05">12:05</option>
//                             <option value="12:10">12:10</option>
//                             <option value="12:15">12:15</option>
//                             <option value="12:20">12:20</option>
//                             <option value="12:25">12:25</option>
//                             <option value="12:30">12:30</option>
//                             <option value="12:35">12:35</option>
//                             <option value="12:40">12:40</option>
//                             <option value="12:45">12:45</option>
//                             <option value="12:50">12:50</option>
//                             <option value="12:55">12:55</option>
//                             <option value="13:00">13:00</option>
//                             <option value="13:05">13:05</option>
//                             <option value="13:10">13:10</option>
//                             <option value="13:15">13:15</option>
//                             <option value="13:20">13:20</option>
//                             <option value="13:25">13:25</option>
//                             <option value="13:30">13:30</option>
//                             <option value="13:35">13:35</option>
//                             <option value="13:40">13:40</option>
//                             <option value="13:45">13:45</option>
//                             <option value="13:50">13:50</option>
//                             <option value="13:55">13:55</option>
//                             <option value="14:00">14:00</option>
//                             <option value="14:05">14:05</option>
//                             <option value="14:10">14:10</option>
//                             <option value="14:15">14:15</option>
//                             <option value="14:20">14:20</option>
//                             <option value="14:25">14:25</option>
//                             <option value="14:30">14:30</option>
//                             <option value="14:35">14:35</option>
//                             <option value="14:40">14:40</option>
//                             <option value="14:45">14:45</option>
//                             <option value="14:50">14:50</option>
//                             <option value="14:55">14:55</option>
//                             <option value="15:00">15:00</option>
//                             <option value="15:05">15:05</option>
//                             <option value="15:10">15:10</option>
//                             <option value="15:15">15:15</option>
//                             <option value="15:20">15:20</option>
//                             <option value="15:25">15:25</option>
//                             <option value="15:30">15:30</option>
//                             <option value="15:35">15:35</option>
//                             <option value="15:40">15:40</option>
//                             <option value="15:45">15:45</option>
//                             <option value="15:50">15:50</option>
//                             <option value="15:55">15:55</option>
//                             <option value="16:00">16:00</option>
//                             <option value="16:05">16:05</option>
//                             <option value="16:10">16:10</option>
//                             <option value="16:15">16:15</option>
//                             <option value="16:20">16:20</option>
//                             <option value="16:25">16:25</option>
//                             <option value="16:30">16:30</option>
//                             <option value="16:35">16:35</option>
//                             <option value="16:40">16:40</option>
//                             <option value="16:45">16:45</option>
//                             <option value="16:50">16:50</option>
//                             <option value="16:55">16:55</option>
//                             <option value="17:00">17:00</option>
//                             <option value="17:05">17:05</option>
//                             <option value="17:10">17:10</option>
//                             <option value="17:15">17:15</option>
//                             <option value="17:20">17:20</option>
//                             <option value="17:25">17:25</option>
//                             <option value="17:30">17:30</option>
//                             <option value="17:35">17:35</option>
//                             <option value="17:40">17:40</option>
//                             <option value="17:45">17:45</option>
//                             <option value="17:50">17:50</option>
//                             <option value="17:55">17:55</option>
//                             <option value="18:00">18:00</option>
//                             <option value="18:05">18:05</option>
//                             <option value="18:10">18:10</option>
//                             <option value="18:15">18:15</option>
//                             <option value="18:20">18:20</option>
//                             <option value="18:25">18:25</option>
//                             <option value="18:30">18:30</option>
//                             <option value="18:35">18:35</option>
//                             <option value="18:40">18:40</option>
//                             <option value="18:45">18:45</option>
//                             <option value="18:50">18:50</option>
//                             <option value="18:55">18:55</option>
//                             <option value="19:00">19:00</option>
//                             <option value="19:05">19:05</option>
//                             <option value="19:10">19:10</option>
//                             <option value="19:15">19:15</option>
//                             <option value="19:20">19:20</option>
//                             <option value="19:25">19:25</option>
//                             <option value="19:30">19:30</option>
//                             <option value="19:35">19:35</option>
//                             <option value="19:40">19:40</option>
//                             <option value="19:45">19:45</option>
//                             <option value="19:50">19:50</option>
//                             <option value="19:55">19:55</option>
//                             <option value="20:00">20:00</option>
//                             <option value="20:05">20:05</option>
//                             <option value="20:10">20:10</option>
//                             <option value="20:15">20:15</option>
//                             <option value="20:20">20:20</option>
//                             <option value="20:25">20:25</option>
//                             <option value="20:30">20:30</option>
//                             <option value="20:35">20:35</option>
//                             <option value="20:40">20:40</option>
//                             <option value="20:45">20:45</option>
//                             <option value="20:50">20:50</option>
//                             <option value="20:55">20:55</option>
//                             <option value="21:00">21:00</option>
//                             <option value="21:05">21:05</option>
//                             <option value="21:10">21:10</option>
//                             <option value="21:15">21:15</option>
//                             <option value="21:20">21:20</option>
//                             <option value="21:25">21:25</option>
//                             <option value="21:30">21:30</option>
//                             <option value="21:35">21:35</option>
//                             <option value="21:40">21:40</option>
//                             <option value="21:45">21:45</option>
//                             <option value="21:50">21:50</option>
//                             <option value="21:55">21:55</option>
//                             <option value="22:00">22:00</option>
//                             <option value="22:05">22:05</option>
//                             <option value="22:10">22:10</option>
//                             <option value="22:15">22:15</option>
//                             <option value="22:20">22:20</option>
//                             <option value="22:25">22:25</option>
//                             <option value="22:30">22:30</option>
//                             <option value="22:35">22:35</option>
//                             <option value="22:40">22:40</option>
//                             <option value="22:45">22:45</option>
//                             <option value="22:50">22:50</option>
//                             <option value="22:55">22:55</option>
//                             <option value="22:00">22:00</option>
//                             <option value="22:05">22:05</option>
//                             <option value="22:10">22:10</option>
//                             <option value="22:15">22:15</option>
//                             <option value="22:20">22:20</option>
//                             <option value="22:25">22:25</option>
//                             <option value="22:30">22:30</option>
//                             <option value="22:35">22:35</option>
//                             <option value="22:40">22:40</option>
//                             <option value="22:45">22:45</option>
//                             <option value="22:50">22:50</option>
//                             <option value="22:55">22:55</option>
//                             <option value="23:00">23:00</option>
//                             <option value="23:05">23:05</option>
//                             <option value="23:10">23:10</option>
//                             <option value="23:15">23:15</option>
//                             <option value="23:20">23:20</option>
//                             <option value="23:25">23:25</option>
//                             <option value="23:30">23:30</option>
//                             <option value="23:35">23:35</option>
//                             <option value="23:40">23:40</option>
//                             <option value="23:45">23:45</option>
//                             <option value="23:50">23:50</option>
//                             <option value="23:55">23:55</option>
//                           </Input>
//                         </FormGroup>
//                       </Col>
//                       <Col xs="8">
//                         <FormGroup>
//                           <Label htmlFor="ccyear">Service</Label>

//                           <Input
//                             type="select"
//                             name="service"
//                             id="service"
//                             onChange={(e) => {
//                               this.checkStatus(e, index);
//                             }}
//                             disabled={this.state.arrayVal[index]}
//                           >
//                             <option value="">Select service</option>
//                             {this.state.data2.map((val) => (
//                               <option value={val.id}>{val.name}</option>
//                             ))}
//                           </Input>
//                         </FormGroup>
//                       </Col>
//                     </Row>

//                     <Row>

//                     <Col xs="6">
//                         <FormGroup>
//                           <Label htmlFor="ccyear">Select Stylist</Label>
//                           <Input
//                             type="select"
//                             name="employee"
//                             id="employee"
//                             onChange={(e) => {
//                               this.checkStatus(e, index);
//                               this.checkSlotWithEmployee(e.target.value)
//                             }}
//                             disabled={this.state.arrayVal[index]}
//                           >
//                             <option value="">Select stylist</option>
//                             {this.state.data4.map((val) => (
//                               <option value={val.id}>{val.title}</option>
//                             ))}
//                           </Input>
//                         </FormGroup>
//                       </Col>

//                       <Col xs="6">
//                         <FormGroup>
//                           <Label htmlFor="ccmonth">Time Allocated</Label>
//                           <Input
//                             type="select"
//                             name="duration"
//                             id="duration"
//                             onChange={(e) => {
//                               this.checkStatus(e, index);
//                             }}
//                             disabled={this.state.arrayVal[index]}
//                           >
//                             <option value="">Duration</option>
//                             <option value="0">0 min</option>
//                             <option value="30">30 min</option>
//                             <option value="45">45 min</option>
//                             <option value="60">1 hr</option>
//                             <option value="75">1 hr 15 min</option>
//                             <option value="90">1 hr 30 min</option>
//                             <option value="105">1 hr 45 min</option>
//                             <option value="120">2 hr</option>
//                           </Input>
//                         </FormGroup>
//                       </Col>
                   
//                     </Row>

//                     <hr></hr>
//                   </div>
//                 ))}
//                 {this.state.appdate!==""?
//                     <Calendar2
//       localizer={localizer}
//       events={this.state.availableSlots}
//       defaultView={Views.DAY}
//       views={['day']}
//       date={this.state.appdate}
//       startAccessor="start"
//       endAccessor="end"
//       style={{ height: 500 }}
//       resources={this.state.resources}
//       resourceIdAccessor="resourceId"
//       resourceTitleAccessor="resourceTitle"
//     />:<></>}
//                 <hr></hr>
//                 <div>
//                   <Button color="primary" type="submit">
//                     Save appointment
//                   </Button>

//                   <Button color="secondary" onClick={(e) => this.resetform()}>
//                     Reset
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           }
//         </TabPane>
//       </>
//     );
//   }

  render() {

  

    const styles = StyleSheet.create({
      page: {
          backgroundColor: "#ffffff"
      },
      appointmentLogo: {
          display: "flex",
          marginLeft: 219
      },
      appointmentTitle: {
          fontSize: 20,
          marginTop: 25,
          fontWeight: "bold",
          marginLeft: 80,
      },
      image: {
          height: 100,
          width: 165,
          alignItems: "center",
          marginTop: 30
      },
      appointmentDetails: {
          fontSize: 11,
          marginTop: 15,
          marginLeft: 50,
      },
      receiptFooter: {
          fontSize: 15,
          marginTop: 125,
          marginLeft: 160,
          fontWeight: "bold"
      }

  });
    return (
      <div className="animated fadeIn">
 

    


        {/* The flex line on header */}
        <Row className="d-flex justify-content-around">
          {this.state.daily ? (
            ""
          ) : (
            <div>
              <ButtonDropdown
                isOpen={this.state.dropdownOpen2[0]}
                color="dark"
                toggle={() => {
                  this.toggle2(0);
                }}
              >
                <DropdownToggle caret color="dark">
                  {this.state.selectempname}
                </DropdownToggle>

                <DropdownMenu>
                  {this.state.data4.map((val) => (
                    <DropdownItem
                      onClick={(e) => {
                        this.selectstaff(val.id, val.name);
                      }}
                    >
                      {val.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          )}

          {/* Calendar dropdown */}
          <div className="text-center">
            <ButtonDropdown
              isOpen={this.state.dropdownOpen[0]}
              color="dark"
              toggle={() => {
                this.toggle1(0);
              }}
              className="mr-1"
            >
              <DropdownToggle caret color="dark">
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(this.state.date)}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header style={{width:"310px"}}>
                  {" "}
                  <Calendar
                    onChange={this.onSelectCalendar}
                    value={this.state.date}
                  />
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>

          {/* day week drop down */}
          <div>
            <Dropdown
              isOpen={this.state.dropdownOpen3[0]}
              color="dark"
              toggle={() => {
                this.toggle3(0);
              }}
            >
              <DropdownToggle caret color="dark">
                {" "}
                {this.state.daily ? "Daily" : "Weekly"}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    this.setState({ daily: true });
                  }}
                >
                  Day
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.setState({ daily: false }); this.forweeklydisplay();
                  }}
                >
                  Week
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* To add appointment */}
          {/* <div>
          <Dropdown
          color="dark"
          className="pull-right"
          isOpen={this.state.dropdownOpen4[0]}
          toggle={() => {
            this.toggle4(0);
          }}
        >
          <DropdownToggle caret color="dark">
            Appointment
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={()=>{this.toggleLarge();this.GetServiceAndClient();}}>Add Appointment</DropdownItem>

            <DropdownItem onClick={this.toggleLarge1}>
              generate report
            </DropdownItem>

          </DropdownMenu>
        </Dropdown>
          </div> */}
        </Row><br></br>

        {/* <Modal className="modal-xl" isOpen={this.state.large} toggle={this.toggleLarge}>
          <ModalHeader toggle={this.toggleLarge}  style={{backgroundImage: `url(${Back})`,backgroundSize:"auto"}}>Add New Appointment</ModalHeader>
          <ModalBody>
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
        </Modal> */}




        <Modal   isOpen={this.state.large1} toggle={this.toggleLarge1}>
          <ModalHeader>Report Generator</ModalHeader>
          <ModalBody>
       
            <p>Click in download button to generate a report of daily appointments</p>

          <PDFDownloadLink
                                        document={<Document>
                                            <Page style={styles.page}>
                                                <View style={styles.appointmentLogo}>
                                                    <Image source="../../../assets/img/logo.png" style={styles.image} />
                                                </View>
                                                <View style={styles.appointmentTitle}>
                                        <Text style={styles.appointmentTitle}>Report for date: {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(this.state.date)}</Text>
                                                    <Text>-----------------------------------------------------------------------</Text>
                                                </View>
                                                {this.state.dailyreport.map(details=>(
                                                  <div>
                                                <View style={styles.appointmentDetails}>
                                                <Text style={styles.appointmentDetails}>Employee Name: {details.name}</Text>
                                                </View>

                                                <View style={styles.appointmentDetails}>
                                                    <Text style={styles.appointmentDetails}>Appointment type: {details.title}</Text>
                                                </View>
                                                <View style={styles.appointmentDetails}>
                                                    <Text style={styles.appointmentDetails}>Appointment Client: {details.client}</Text>
                                                </View>
                                                <View style={styles.appointmentDetails}>
                                                    <Text style={styles.appointmentDetails}>Appointment Start Time: {details.start}</Text>
                                                </View>
                                                <View style={styles.appointmentDetails}>
                                                    <Text style={styles.appointmentDetails}>Appointment End Time: {details.end}</Text>
                                                    <Text>-----------------------------------------------------------------------</Text>
                                                </View>
                                                
                                                </div>
))}
                                               
 
                                                <View style={styles.receiptFooter}>
                                                    <Text style={styles.receiptFooter}>By Sciccor'N'Razor</Text>
                                                </View>


                                            </Page>
                                        </Document>}
                                        fileName="DailyReport.pdf"
                                        style={{
                                            textDecoration: "none",
                                            padding: "10px",
                                            color: "#4a4a4a",
                                            backgroundColor: "#f2f2f2",
                                            border: "1px solid #4a4a4a"
                                        }}
                                    >
                                        {({ blob, url, loading, error }) =>
                                            loading ? "Loading document..." : "Download report"
                                        }
                                    </PDFDownloadLink>

          </ModalBody>
        </Modal>

        {this.state.daily ? (
          <Card>
            <CardHeader>
            <h5><i className="fa fa-th-list fa-lg mt-4" style={{paddingRight:"8px"}}></i>
           Daily Appointment Details</h5>
          </CardHeader>
            <CardBody  style={{backgroundImage: `url(${Back})`,backgroundRepeat:"no-repeat"}}>
           <DailyDisplay board={this.state.data7}/>
           </CardBody>
           </Card>
        ) : (
          <Card>
             <CardHeader>
            <h5><i className="fa fa-th-list fa-lg mt-4" style={{paddingRight:"8px"}}></i>
           Weekly Appointment Details</h5>
          </CardHeader>
            <CardBody  style={{backgroundImage: `url(${Back})`,backgroundRepeat:"no-repeat"}}>
          <WeeklyDisplay board={this.state.weekdata3} />
          </CardBody>
           </Card>
        )}


      </div>
    );
  }
}

export default List;
