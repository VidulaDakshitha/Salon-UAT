import React, { Component } from "react";
import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
import Avatar from '@material-ui/core/Avatar';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Back from "../../../assets/back.png";
import Back2 from "../../../assets/back2.png";
import Back5 from "../../../assets/back5.png";
import Swal from 'sweetalert2'
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import ImageUploader from 'react-images-upload';
import {
  Badge,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import {
  Card,
  CardBody,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import {

  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  
  FormGroup,

  Input,
  InputGroup,
  InputGroupAddon,
  
  InputGroupText,
  Label,
} from "reactstrap";
//import classnames from 'classnames';
//import Changetime from "./Changetime";
import * as BaseService from "../../../BaseService.js";
import axios from "axios";


class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: new Array(6).fill(false),
      date: "",
      date2: "",
      date3: "",
      date4: "",
      date5: "",
      date6: "",
      date7: "",
      number: 10,
      large: false,
      large1: false,
      large2: false,
      large3: false,
      activeTab: new Array(4).fill("1"),
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      type: "",
      fullname: "",
      mobileNumber: "",
      address1: "",
      address2: "",
      city: "",
      fullnameupd: "",
      mobileNumberupd: "",
      address1upd: "",
      address2upd: "",
      cityupd: "",
      Nicupd: "",
      codewithoutupd:"",
      countrywithoutupd:"",
      mobilewithoutupd:"",
      mobileisUpdated:false,
      dialCodeupd:"",
      dialcodefinal:"",
      mobilefinal:"",
      countryfinal:"",
      option: "",
      Nic: "",
      dialCode: "",
      Country: "",
      hooks: false,
      size: [],
      value: [],
      data3: [],
      data4: [],
      data5:[],
      data6:[],
      data7:[],
      data8:[],
      pageNumber: 1,
      limit: 10,
      pageCount: null,
      updateId: null,
      loading: true,
      isadmin:0,
      isuser:0,
      searchString:"",
      profilepic:"",
      profilepicupdate:"",
      updateprofilepic:"",
      isPicUpdate:false,
    };

    //this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggleLarge1 = this.toggleLarge1.bind(this);
    this.toggleLarge2 = this.toggleLarge2.bind(this);
    this.toggleLarge3 = this.toggleLarge3.bind(this);
    this.combine = this.combine.bind(this);
    this.staffWork = this.staffWork.bind(this);
    this.toggle1 = this.toggle1.bind(this);

    this.getDays = this.getDays.bind(this);
  }

  submitHandler = (event) => {
    event.preventDefault();

    const lastLetter = this.state.Nic[this.state.Nic.length-1];
   const numbers = this.state.Nic.slice(0,this.state.Nic.length-1);

   var regExp = /[a-zA-Z]/g;

if(this.state.mobileNumber.length!==9)
{

  alertify.alert("Please provide valid phone number").setHeader('').set('closable', false);


}else if(this.state.Nic.length===10)
{

  console.log(lastLetter)
  console.log(numbers)
  console.log(lastLetter.toString()!=="v")

  if(lastLetter.toString()!=="V")
  {

    alertify.alert("Your NIC Should have a capital letter at the end. With 9 numbers").setHeader('').set('closable', false);

  }else{


    document.getElementById("submitbtn").disabled=true;

    const staff = {
      name: this.state.fullname,
      nic: this.state.Nic,
      address_line1: this.state.address1,
      address_line2: this.state.address2,
      city: this.state.city,
      country: this.state.Country,
      country_code: "+" + this.state.dialCode,
      mobile: this.state.mobileNumber,
      is_active: "1",
      profile_pic:this.state.profilepic
    };
   
    const url = "/employee/save/";
    BaseService.PostService(url, staff)
      .then((res) => {
     

        if (res.data.success === true) {
          Swal.fire(
            'Good job!',
            'successfully added staff member',
            'success'
          )
          document.getElementById("submitbtn").disabled=false;
          this.setState({
large:false,
fullname:"",
Nic:"",
address1:"",
address2:"",
city:"",
mobileNumber:"",

          })

          this.receivedData(1, 1);
        } else {
          alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);
        }

        
      })
      .catch((err) => {
        alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);
      });





  }

}else if(this.state.Nic.length===12)
{

  if(regExp.test(this.state.Nic))
  {

    alertify.alert("Your NIC should not have letters").setHeader('').set('closable', false);

  }else{



    document.getElementById("submitbtn").disabled=true;

    const staff = {
      name: this.state.fullname,
      nic: this.state.Nic,
      address_line1: this.state.address1,
      address_line2: this.state.address2,
      city: this.state.city,
      country: this.state.Country,
      country_code: "+" + this.state.dialCode,
      mobile: this.state.mobileNumber,
      is_active: "1",
        profile_pic:this.state.profilepic
    };
   
    const url = "/employee/save/";
    BaseService.PostService(url, staff)
      .then((res) => {
     

        if (res.data.success === true) {
          Swal.fire(
            'Good job!',
            'successfully added staff member',
            'success'
          )
          document.getElementById("submitbtn").disabled=false;
          this.setState({
large:false,
fullname:"",
Nic:"",
address1:"",
address2:"",
city:"",
mobileNumber:"",

          })

          this.receivedData(1, 1);
        } else {
          alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);
        }

        
      })
      .catch((err) => {
        alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);
      });





  }



}else{


  alertify.alert("Please provide either a valid New or old NIC").setHeader('').set('closable', false);

}







// if(this.state.mobileNumber.length===9)
// {

//   document.getElementById("submitbtn").disabled=true;

//     const staff = {
//       name: this.state.fullname,
//       nic: this.state.Nic,
//       address_line1: this.state.address1,
//       address_line2: this.state.address2,
//       city: this.state.city,
//       country: this.state.Country,
//       country_code: "+" + this.state.dialCode,
//       mobile: this.state.mobileNumber,
//       is_active: "1",
//     };
   
//     const url = "/employee/save/";
//     BaseService.PostService(url, staff)
//       .then((res) => {
     

//         if (res.data.success === true) {
//           Swal.fire(
//             'Good job!',
//             'successfuly added staff member',
//             'success'
//           )
//           document.getElementById("submitbtn").disabled=false;
//           this.setState({
// large:false,
// fullname:"",
// Nic:"",
// address1:"",
// address2:"",
// city:"",
// mobileNumber:"",

//           })

//           this.receivedData(1, 1);
//         } else {
//           alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);
//         }

        
//       })
//       .catch((err) => {
//         alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);
//       });


//     }else{
  
//       alertify.alert("please provide valid phone number").setHeader('').set('closable', false);
//     }
  };




updatePicture=()=>{
  this.setState({
    isPicUpdate:true
  })
}





  SystemUserSubmitHandler = (event) => {
    event.preventDefault();

    if(this.state.isuser===0 && this.state.isadmin===0)
    {
      alertify.alert("Please add user type").setHeader('').set('closable', false);
    }else{

  
    const users = {
      
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      is_admin:this.state.isadmin,
      is_user:this.state.isuser
    };
  
    const url = "/user/save/";
    BaseService.PostService(url, users)
      .then((res) => {




        if(res.data!==undefined)
        {
          if(res.data.success===true)
          {
            Swal.fire(
              'Good job!',
              'successfully added system user',
              'success'
            )
  
            this.setState({
              large2:false,
              firstName:"",
              lastName:"",
              email:"",
              isuser:0,
              isadmin:0
            })
  
            this.receivedData1(1,1);
          }
        }
       else if(res.response.data!==null) {
        
          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Oops...',
            text: 'Error Saving data! '+res.response.data["description"],
            
          })
      
        }else{
      
          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Oops...',
            text: 'Error Saving data!',
            
          })
      
        }





     
      })
      .catch((err) => {
        alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);
      });

    }
  };

  setSize = (e) => {
    var temp = this.state.size;

    if (this.state.size[e.target.value] === "false") {
      temp[e.target.value] = e.target.name;
    } else {
      temp[e.target.value] = "false";
    }
    this.setState(
      {
        size: temp,
      },
      console.log(this.state.size)
    );
  };

  toggleLarge() {
    this.setState({
      large: !this.state.large,
      fullname:"",
Nic:"",
address1:"",
address2:"",
city:"",
mobileNumber:"",
profilepic:"",
    });
  }
  toggleLarge1() {
    this.setState({
      large1: !this.state.large1,
    });
  }

  toggleLarge2() {
    this.setState({
      large2: !this.state.large2,
      firstName:"",
      lastName:"",
      email:"",
      isuser:0,
      isadmin:0
    });
  }


  toggleLarge3() {
    this.setState({
      large3: !this.state.large3,
    });
  }

  handleOnChange = (event) => {
    let orderkeyword=event.target.value.trim().toLowerCase();
    if(orderkeyword.length>0){
        this.setState({
            data6:this.state.data6.filter(element=>{
                return(
                    element.first_name.toLowerCase().match(event.target.value)||
                    element.last_name.toLowerCase().match(event.target.value)||
                    element.email.toLowerCase().match(event.target.value)
                   



                )
            })
        })
    }else{
        this.receivedData1(1,1);
    }
  };



  handleOnChange1 = (event) => {
    let orderkeyword=event.target.value.trim().toLowerCase();
    if(orderkeyword.length>0){
        this.setState({
            data3:this.state.data3.filter(element=>{
                return(
                    element.name.toLowerCase().match(event.target.value)||
                    element.nic.toLowerCase().match(event.target.value)
                 
                   



                )
            })
        })
    }else{
        this.receivedData(1,1);
    }
  };




  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // console.log(this.state.firstName)
  };


  onChangeType=(e)=>{

    if(e.target.value==="2")
    {

      this.setState({
        isadmin:1,
        isuser:0
      })

    }else if(e.target.value==="3")
    {

      this.setState({
        isadmin:0,
        isuser:1
      })

    }else{

      this.setState({
        isadmin:0,
        isuser:0
      })

    }

  }

  staffWork(value) {
    return (
      <div>
        <Button size="sm" color="ghost-success" onClick={this.toggleLarge1}>
          {value}
        </Button>
        <Modal isOpen={this.state.large1} toggle={this.toggleLarge1}>
          <ModalHeader>Add New Staff Member</ModalHeader>
          <ModalBody>{value}</ModalBody>
        </Modal>
      </div>
    );
  }

  combine() {
    console.log("open");
    this.toggleLarge1();
    this.staffWork();
  }

  getDays() {
    console.log("hello");
  }

  componentDidMount() {
   
    

    // var day1 = new Date();
    // var nextDay = new Date(day1);
    // var nextDay1 = new Date(nextDay);
    // var nextDay2 = new Date(nextDay1);
    // var nextDay3 = new Date(nextDay2);
    // var nextDay4 = new Date(nextDay3);
    // var nextDay5 = new Date(nextDay4);
    // var nextDay6 = new Date(nextDay5);

    // nextDay.setDate(day1.getDate() + 1);
    // nextDay1.setDate(nextDay.getDate() + 1);
    // nextDay2.setDate(nextDay1.getDate() + 1);
    // nextDay3.setDate(nextDay2.getDate() + 1);
    // nextDay4.setDate(nextDay3.getDate() + 1);
    // nextDay5.setDate(nextDay4.getDate() + 1);
    // nextDay6.setDate(nextDay5.getDate() + 1);

    // var val = day1.toDateString().split(" ");
    // var val1 = nextDay.toDateString().split(" ");
    // var val2 = nextDay1.toDateString().split(" ");
    // var val3 = nextDay2.toDateString().split(" ");
    // var val4 = nextDay3.toDateString().split(" ");
    // var val5 = nextDay4.toDateString().split(" ");
    // var val6 = nextDay5.toDateString().split(" ");
    // console.log(val[0]);
    // this.setState({
    //   //date:day+'/'+month+'/'+year,
    //   date: val[0] + " " + val[1] + " " + val[2] + " " + val[3],
    //   date2: val1[0] + " " + val1[1] + " " + val1[2] + " " + val1[3],
    //   date3: val2[0] + " " + val2[1] + " " + val2[2] + " " + val2[3],
    //   date4: val3[0] + " " + val3[1] + " " + val3[2] + " " + val3[3],
    //   date5: val4[0] + " " + val4[1] + " " + val4[2] + " " + val4[3],
    //   date6: val5[0] + " " + val5[1] + " " + val5[2] + " " + val5[3],
    //   date7: val6[0] + " " + val6[1] + " " + val6[2] + " " + val6[3],
    // });

    // for (var i = 0; i < this.state.serv.length + 1; i++) {
    //   this.state.size.push("false");
    // }

    this.receivedData(1, 1);
    this.receivedData1(1, 1);
  }

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
          const url2= "/employee/getbypage/";
        BaseService.GetDataWithParams(url2,paramdata)
          .then((res) => {
  
           

            this.setState({
              data3: res.data.data,
              pageCount: Math.ceil(res.data.count / this.state.limit),
            });


            console.log("length of data4" + this.state.data4.length);
          })
          .catch((err) => console.log(err));
      }
    );
  };




  receivedData1 = (e, index) => {
  
    let values=""
    console.log("index" + index);
    this.setState(
      {
        pageNumber: index,
        data5: [],
        data6: [],
      },
      () => {
       
        const paramdata= {
          page: this.state.pageNumber, limit: this.state.limit
        };
        const url2= "/user/getall/";
      BaseService.GetDataWithParams(url2,paramdata)
        .then((res) => {

         

            this.setState({
              data5: res.data.data,
              pageCount: Math.ceil(res.data.count / this.state.limit),
            });

            console.log("length of limit" + this.state.data3.length);

            this.state.data5.map((item) => {

              if(item.is_admin===true)
              {
                values = {
                  id: item.id,
                  first_name: item.first_name,
                  last_name: item.last_name,
                  email: item.email,
                  type: "Admin",
                };

              }else{

                values = {
                  id: item.id,
                  first_name: item.first_name,
                  last_name: item.last_name,
                  email: item.email,
                  type: "User",
                };

              }
            
              this.setState({
                data6: [values, ...this.state.data6],
              });
            });

            console.log("length of data4" + this.state.data6.length);
          })
          .catch((err) => console.log(err));
      }
    );
  };

  getDate() {
    return Date();
  }

  toggle1(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }



  staffUpdateHandler=(e)=>{
   
    e.preventDefault();

    if(this.state.mobileisUpdated===true)
    {

      if(this.state.isPicUpdate && this.state.profilepicupdate!=="")
      {

 document.getElementById("updatebtn").disabled=true;
      document.getElementById("deletebtn").disabled=true;

      if(this.state.mobileNumber.length===9)
      {


      this.setState({
        mobilefinal:this.state.mobileNumber,
        dialcodefinal:this.state.dialCodeupd,
        countryfinal:this.state.Country
      },()=>{

        const values={

          name: this.state.fullnameupd,
      nic: this.state.Nicupd,
      address_line1: this.state.address1upd,
      address_line2: this.state.address2upd,
      city: this.state.cityupd,
      country: this.state.countryfinal,
      country_code: this.state.dialcodefinal,
      mobile: this.state.mobilefinal,
      profile_pic:this.state.profilepicupdate

        }
      
        const url = "/employee/update/";
        BaseService.UpdateService(url, values,this.state.updateId)
          .then((res) => {
           
            console.log("response"+res)
            if (res.data.success === true) {
             // this.receivedData(1,1);
             Swal.fire(
              'Good job!',
              'successfully updated staff',
              'success'
            )
            document.getElementById("updatebtn").disabled=false;
            document.getElementById("deletebtn").disabled=false;
              this.setState({
                large3:false
              })
              this.receivedData(1, 1);
            } else {
              Swal.fire({
                allowOutsideClick: false,
                icon: 'error',
                title: 'Oops...',
                text: 'cannot perform operation!',
                
              })
            }
          })
          .catch((err) => {
            Swal.fire({
              allowOutsideClick: false,
              icon: 'error',
              title: 'Oops...',
              text: 'cannot perform operation!',
              
            })
            console.log("if error"+err);
          });
  

      })

    }else{
      alertify.alert("please provide valid phone number").setHeader('').set('closable', false);
    }


      }else{

 document.getElementById("updatebtn").disabled=true;
      document.getElementById("deletebtn").disabled=true;

      if(this.state.mobileNumber.length===9)
      {


      this.setState({
        mobilefinal:this.state.mobileNumber,
        dialcodefinal:this.state.dialCodeupd,
        countryfinal:this.state.Country
      },()=>{

        const values={

          name: this.state.fullnameupd,
      nic: this.state.Nicupd,
      address_line1: this.state.address1upd,
      address_line2: this.state.address2upd,
      city: this.state.cityupd,
      country: this.state.countryfinal,
      country_code: this.state.dialcodefinal,
      mobile: this.state.mobilefinal,

        }
      
        const url = "/employee/update/";
        BaseService.UpdateService(url, values,this.state.updateId)
          .then((res) => {
           
            console.log("response"+res)
            if (res.data.success === true) {
             // this.receivedData(1,1);
             Swal.fire(
              'Good job!',
              'successfully updated staff',
              'success'
            )
            document.getElementById("updatebtn").disabled=false;
            document.getElementById("deletebtn").disabled=false;
              this.setState({
                large3:false
              })
              this.receivedData(1, 1);
            } else {
              Swal.fire({
                allowOutsideClick: false,
                icon: 'error',
                title: 'Oops...',
                text: 'cannot perform operation!',
                
              })
            }
          })
          .catch((err) => {
            Swal.fire({
              allowOutsideClick: false,
              icon: 'error',
              title: 'Oops...',
              text: 'cannot perform operation!',
              
            })
            console.log("if error"+err);
          });
  

      })

    }else{
      alertify.alert("please provide valid phone number").setHeader('').set('closable', false);
    }

      }
     

    }else{


       if(this.state.isPicUpdate && this.state.profilepicupdate!=="")
      {

              document.getElementById("updatebtn").disabled=true;
      document.getElementById("deletebtn").disabled=true;


      this.setState({
        mobilefinal:this.state.mobilewithoutupd,
        dialcodefinal:this.state.codewithoutupd,
        countryfinal:this.state.countrywithoutupd
      },()=>{

        const values={

          name: this.state.fullnameupd,
      nic: this.state.Nicupd,
      address_line1: this.state.address1upd,
      address_line2: this.state.address2upd,
      city: this.state.cityupd,
      country: this.state.countryfinal,
      country_code: this.state.dialcodefinal,
      mobile: this.state.mobilefinal,
      profile_pic:this.state.profilepicupdate

        }
       
        const url = "/employee/update/";
        BaseService.UpdateService(url, values,this.state.updateId)
          .then((res) => {
          
            console.log("response"+res)
            if (res.data.success === true) {
             // this.receivedData(1,1);
             Swal.fire(
              'Good job!',
              'successfully updated staff',
              'success'
            )
            document.getElementById("updatebtn").disabled=false;
            document.getElementById("deletebtn").disabled=false;
              this.setState({
                large3:false
              })
              this.receivedData(1, 1);
            } else {
              Swal.fire({
                allowOutsideClick: false,
                icon: 'error',
                title: 'Oops...',
                text: 'cannot perform operation!',
                
              })
            }
          })
          .catch((err) => {
            Swal.fire({
              allowOutsideClick: false,
              icon: 'error',
              title: 'Oops...',
              text: 'cannot perform operation!',
              
            })
            console.log("if error"+err);
          });
  


      })
      }else{


              document.getElementById("updatebtn").disabled=true;
      document.getElementById("deletebtn").disabled=true;


      this.setState({
        mobilefinal:this.state.mobilewithoutupd,
        dialcodefinal:this.state.codewithoutupd,
        countryfinal:this.state.countrywithoutupd
      },()=>{

        const values={

          name: this.state.fullnameupd,
      nic: this.state.Nicupd,
      address_line1: this.state.address1upd,
      address_line2: this.state.address2upd,
      city: this.state.cityupd,
      country: this.state.countryfinal,
      country_code: this.state.dialcodefinal,
      mobile: this.state.mobilefinal,

        }
       
        const url = "/employee/update/";
        BaseService.UpdateService(url, values,this.state.updateId)
          .then((res) => {
          
            console.log("response"+res)
            if (res.data.success === true) {
             // this.receivedData(1,1);
             Swal.fire(
              'Good job!',
              'successfully updated staff',
              'success'
            )
            document.getElementById("updatebtn").disabled=false;
            document.getElementById("deletebtn").disabled=false;
              this.setState({
                large3:false
              })
              this.receivedData(1, 1);
            } else {
              Swal.fire({
                allowOutsideClick: false,
                icon: 'error',
                title: 'Oops...',
                text: 'cannot perform operation!',
                
              })
            }
          })
          .catch((err) => {
            Swal.fire({
              allowOutsideClick: false,
              icon: 'error',
              title: 'Oops...',
              text: 'cannot perform operation!',
              
            })
            console.log("if error"+err);
          });
  


      })


      }



    }

  }

  pass=(valueId,name,nic,mobile,code,pic)=>{

    this.setState(
      {
        updateId:valueId,
        mobileNumberupd: code+mobile,
        mobilewithoutupd:mobile,
        codewithoutupd:code,
        data7: [],
        data8: [],
        updateprofilepic:"https://images.ereserv.me/"+pic,
        isPicUpdate:false,
        profilepicupdate:""
      });

      const paramdata= {
        id: valueId
      };
      const url2= "/employee/getdetail/";
    BaseService.GetDataWithParams(url2,paramdata)
      .then((res) => {
      
        res.data.data.map((item) => {

   

         this.setState({
          fullnameupd: item.name,
          countrywithoutupd:item.country,
          address1upd: item.address_line1,
          address2upd: item.address_line2,
          cityupd: item.city,
          Nicupd: item.nic


         })
  
          
        });
      
      })
      .catch((err) => console.log(err));

  
  }


  setStatus=(id,isactive,e)=>{

    console.log(isactive)
    let updatestate=""
    
console.log(id)

if(e===true)
{

  updatestate={
    is_active:1
  }

}else if(e===false)
{
  updatestate={
    is_active:0
  }

}
   

    const url = "/employee/update/";
    BaseService.UpdateService(url, updatestate,id)
      .then((res) => {
  
       
        
        console.log("response"+res)
        if (res.data.success === true) {
         
        this.receivedData(1,1);
       
  
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


  deletestaff=()=>{

    
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



    document.getElementById("updatebtn").disabled=true;
    document.getElementById("deletebtn").disabled=true;
  
    const url = "/employee/delete/";
    BaseService.DeleteData(url,this.state.updateId)
      .then((res) => {
  
  
        console.log("response"+res)
        document.getElementById("updatebtn").disabled=false;
        document.getElementById("deletebtn").disabled=false;
  
        if (res.data.success === true) {
          this.receivedData(1,1);
      
         
  
          alertify.success("Successfully deleted staff");
  
          this.setState({
            large3:false
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



  deletestaff1=()=>{

    
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



  
    const url = "/employee/delete/";
    BaseService.DeleteData(url,this.state.updateId)
      .then((res) => {
  
  
        console.log("response"+res)
  
  
        if (res.data.success === true) {
          this.receivedData(1,1);
      
         
  
          alertify.success("Successfully deleted staff");
  
          this.setState({
            large3:false
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

      onDrop=(picturefiles,pictureDataURLS)=> {
        this.setState({
            profilepic: pictureDataURLS[0],
        });
    }


      onDropUpdate=(picturefiles,pictureDataURLS)=> {
        this.setState({
            profilepicupdate: pictureDataURLS[0],
        },console.log(this.state.profilepicupdate));
    }

  onSelectLimit=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    },()=>{this.receivedData(1,1);this.receivedData1(1,1);})
        
      }

  tabPane() {
    const {pageNumber}=this.state;
    return (
      <>
        <TabPane tabId="1">
          {
            <Col>
              <Card>
                <CardBody>
                 
                <div className="row">
                <div className="col-lg-7">
                <FormGroup>
                <Input placeholder={'Search staff from  name or NIC '} name="searchString"  onChange={this.handleOnChange1}></Input>   
                </FormGroup>
</div>
            <div className="col-lg-2 mb-3">
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
         
  </div>
                  {/* <Dropdown
                    color="dark"
                    className="pull-right"
                    isOpen={this.state.dropdownOpen[0]}
                    toggle={() => {
                      this.toggle1(0);
                    }}
                  >
                    <DropdownToggle caret color="dark">
                      Add New
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.toggleLarge}>
                        Staff
                      </DropdownItem>
                      <DropdownItem onClick={this.toggleLarge2}>
                        System User
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown> */}

                  <Modal
                    isOpen={this.state.large}
                  
                    className={"modal-lg " + this.props.className}
                  >
                    <ModalHeader toggle={this.toggleLarge}>
                    <i className="fa fa-plus-circle fa-lg mt-4" style={{paddingRight:"8px"}}></i>Add New Staff Member
                    </ModalHeader>
                    <ModalBody style={{backgroundImage: `url(${Back})`,backgroundSize:"auto"}}>
                      <form onSubmit={this.submitHandler}>
                        <Row>
                          <Col xs="12" sm="6">
                            <Card style={{ borderColor: "white" }}>
                              <CardBody>
                                <FormGroup>
                                  <Label htmlFor="firstName">Full Name</Label>
                                  <Input
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    placeholder="Enter first Name"
                                    value={this.state.fullname}
                                    onChange={this.changeHandler}
                                    required
                                  />
                                </FormGroup>

                                <FormGroup>
                                  <Label htmlFor="mobileNumber">
                                    Mobile Number
                                  </Label>
                                

                                  <PhoneInput
                                    country={"lk"}
                                    name="mobileNumber"
                                    // value={this.state.mobileNumber}
                                    onChange={(country, value, event) => {
                                      this.setState({
                                        dialCode: value["dialCode"],
                                        Country: value["name"],
                                        mobileNumber: country.slice(
                                          value.dialCode.length
                                        ),
                                      });
                                    }}
                                  />
                                </FormGroup>

                                <FormGroup>
                                  <Label htmlFor="Nic">NIC</Label>
                                  <Input
                                    type="text"
                                    id="Nic"
                                    name="Nic"
                                    placeholder="Enter Employee NIC"
                                    value={this.state.Nic}
                                    onChange={this.changeHandler}
                                    required
                                  />
                                </FormGroup>
                              </CardBody>
                            </Card>
                          </Col>

                          <Col xs="12" sm="6">
                            <Card style={{ borderColor: "white" }}>
                              <CardBody>
                               

                                <FormGroup>
                                  <Label htmlFor="street">Address 1</Label>
                                  <Input
                                    type="text"
                                    id="address1"
                                    name="address1"
                                    placeholder="Enter Address line 1"
                                    value={this.state.address1}
                                    onChange={this.changeHandler}
                                    required
                                  />
                                </FormGroup>

                                <FormGroup>
                                  <Label htmlFor="street">Address 2</Label>
                                  <Input
                                    type="text"
                                    id="address2"
                                    name="address2"
                                    placeholder="Enter Address line 2"
                                    value={this.state.address2}
                                    onChange={this.changeHandler}
                                    required
                                  />
                                </FormGroup>

                                <FormGroup>
                                  <Label htmlFor="city">City</Label>
                                  <Input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Enter your city"
                                    value={this.state.city}
                                    onChange={this.changeHandler}
                                    required
                                  />
                                </FormGroup>

                            
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                                                <Card>
                        <CardBody>
  <ImageUploader
                withIcon={true}
                buttonText='Add staff profile image'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.png']}
                maxFileSize={5242880}
                singleImage={true}
                withPreview={true}
            />
                        </CardBody>
                        </Card>
                        <ModalFooter>
                        <Button
                        id="submitbtn"
                          type="submit"
                          color="success"
                          
                        >
                          Save
                        </Button>
                        <Button color="secondary" onClick={this.toggleLarge}>
                Cancel
              </Button>{" "}
              </ModalFooter>
                      </form>
                    </ModalBody>
                  </Modal>



















                  <Modal
                    isOpen={this.state.large3}
                   
                    className={"modal-lg " + this.props.className}
                  >
                    <ModalHeader toggle={this.toggleLarge3}>
                    <i className="fa fa-edit fa-lg mt-4" style={{paddingRight:"8px"}}></i> Edit Staff Member
                    </ModalHeader>
                    <ModalBody style={{backgroundImage: `url(${Back2})`,backgroundSize:"auto"}}>
                      <form onSubmit={this.staffUpdateHandler}>
                        <Row>
                          <Col xs="12" sm="6">
                            <Card style={{ borderColor: "white" }}>
                              <CardBody>
                                <FormGroup>
                                  <Label htmlFor="firstName">Full Name</Label>
                                  <Input
                                    type="text"
                                    id="fullnameupd"
                                    name="fullnameupd"
                                    placeholder="Enter first Name"
                                    value={this.state.fullnameupd}
                                    onChange={this.changeHandler}
                                    required
                                  />
                                </FormGroup>

                                <FormGroup>
                                  <Label htmlFor="mobileNumber">
                                    Mobile Number
                                  </Label>
                                

                                  <PhoneInput
                                    //country={"lk"}
                                    name="mobileNumberupd"
                                     value={this.state.mobileNumberupd}
                                     
                                    onChange={(country, value, event) => {
                                      this.setState({
                                        mobileisUpdated:true,
                                        dialCodeupd: "+"+value["dialCode"],
                                        Country: value["name"],
                                        mobileNumber: country.slice(
                                          value.dialCode.length
                                        ),
                                      });
                                    }}
                                  />
                                </FormGroup>

                                <FormGroup>
                                  <Label htmlFor="Nic">NIC</Label>
                                  <Input
                                    type="text"
                                    id="Nicupd"
                                    name="Nicupd"
                                    placeholder="Enter Employee NIC"
                                    value={this.state.Nicupd}
                                    onChange={this.changeHandler}
                                    required
                                  />
                                </FormGroup>


                              </CardBody>
                            </Card>
                          </Col>

                          <Col xs="12" sm="6">
                            <Card style={{ borderColor: "white" }}>
                              <CardBody>
                         

                                <FormGroup>
                                  <Label htmlFor="street">Address 1</Label>
                                  <Input
                                    type="text"
                                    id="address1upd"
                                    name="address1upd"
                                    placeholder="Enter Address line 1"
                                    value={this.state.address1upd}
                                    onChange={this.changeHandler}
                                  />
                                </FormGroup>

                                <FormGroup>
                                  <Label htmlFor="street">Address 2</Label>
                                  <Input
                                    type="text"
                                    id="address2upd"
                                    name="address2upd"
                                    placeholder="Enter Address line 2"
                                    value={this.state.address2upd}
                                    onChange={this.changeHandler}
                                    required
                                  />
                                </FormGroup>

                                <FormGroup>
                                  <Label htmlFor="city">City</Label>
                                  <Input
                                    type="text"
                                    id="cityupd"
                                    name="cityupd"
                                    placeholder="Enter your city"
                                    value={this.state.cityupd}
                                    onChange={this.changeHandler}
                                    required
                                  />
                                </FormGroup>

                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                        <Card>
                        <CardBody>



{this.state.isPicUpdate?
  <ImageUploader
                withIcon={true}
                buttonText='Add staff profile image'
                onChange={this.onDropUpdate}
                imgExtension={['.jpg', '.png']}
                maxFileSize={5242880}
                singleImage={true}
                withPreview={true}
            />
            :
<div className="d-flex justify-content-center">
                                    <div className="divelement2">
  <img src={this.state.updateprofilepic} className="main-profile-img" />
  <i className="fa fa-edit" title="Click to update profile picture" onClick={()=>this.updatePicture()} style={{cursor:"pointer"}}></i>
</div>
</div>
  }
                        </CardBody>
                        </Card>
                        <ModalFooter>
                        <Button
                          type="submit"
                          color="success"
                          id="updatebtn"
                        >
                          Save
                        </Button>
                        <Button onClick={()=>this.deletestaff()} id="deletebtn"  color="danger">
                  Delete
                </Button>
                
                <Button color="secondary" onClick={this.toggleLarge3}>
                Cancel
              </Button>
              </ModalFooter>
                      </form>
                    </ModalBody>
                  </Modal>






 <Modal
                    isOpen={this.state.large2}
                    
                    className={"modal-lg " + this.props.className}
                  >
                    <form onSubmit={this.SystemUserSubmitHandler}>
                      <ModalHeader toggle={this.toggleLarge2}>
                      <i className="fa fa-plus-circle fa-lg mt-4" style={{paddingRight:"8px"}}></i>Add System User
                      </ModalHeader>
                      <ModalBody style={{backgroundImage: `url(${Back5})`,backgroundSize:"auto"}}>
                        <Card style={{ borderColor: "white" }}>
                          <CardBody>
                            <FormGroup row className="my-0">
                              <Col xs="6">
                                <FormGroup>
                                  <Label htmlFor="firstName">First Name</Label>
                                  <Input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter first Name"
                                    value={this.state.firstName}
                                    onChange={this.changeHandler}
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs="6">
                                <FormGroup>
                                  <Label htmlFor="lastName">last Name</Label>
                                  <Input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Enter last Name"
                                    value={this.state.lastName}
                                    onChange={this.changeHandler}
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </FormGroup>

               
                            <FormGroup>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fa fa-envelope"></i>
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  type="email"
                                  id="email"
                                  name="email"
                                  placeholder="Email"
                                  autoComplete="username"
                                  value={this.state.email}
                                  onChange={this.changeHandler}
                                  required
                                />
                              </InputGroup>
                            </FormGroup>

                            <FormGroup row>
                              <Col md="2">
                                <Label htmlFor="select">Select Type</Label>
                              </Col>
                              <Col xs="6" md="4">
                                <Input
                                  type="select"
                                  name="type"
                                  id="type"
                                  onChange={this.onChangeType}
                                >
                                  <option value="">Select user type</option>
                                  <option value="2">Admin</option>
                                  <option value="3">User</option>
                                </Input>
                              </Col>
                            </FormGroup>
                          </CardBody>
                        </Card>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          type="submit"
                          color="success"
                          
                        >
                          Save
                        </Button>{" "}
                        <Button color="secondary" onClick={this.toggleLarge2}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </form>
                  </Modal> 

                  <Table responsive className="table table-hover">
                    <thead>
                      <tr>
                      <i className="fa fa-reorder fa-lg mt-4" style={{paddingTop:12}}></i>

                         <th>
                        
                          <i className="fa fa-user-circle-o fa-fw"></i>
                          Image
                        </th>
                      
                        <th>
                        
                          <i className="fa fa-user-circle-o fa-fw"></i>Staff
                          Name
                        </th>

                        <th>
                        <i className="fa fa-id-card fa-fw mt-4"></i>
                          NIC
                        </th>
                        <th>
                          <i className="fa fa-phone fa-fw"></i>Mobile Number
                        </th>
                        <th>
                          <i className="fa fa-circle-o-notch fa-fw fa-spin mt-4"></i>
                          Employee Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data3.map((item) => (
                        <tr >
                        <div className="d-flex">
                           <i
                      className="fa fa-edit fa-lg mt-4" style={{cursor:"pointer"}}
                      onClick={()=>{this.toggleLarge3();this.pass(item.id,item.name,item.nic,item.mobile,item.country_code,item.profile_pic)}}
                    ></i>
                     <i
                      className="fa fa-trash fa-lg mt-4 ml-3" style={{cursor:"pointer"}}
                      onClick={()=>{this.pass(item.id,item.name,item.nic,item.mobile,item.country_code,item.profile_pic);this.deletestaff1()}}
                    ></i>
                   </div>
                    <td>  <Avatar alt={item.name} src={"https://images.ereserv.me/"+item.profile_pic}  /></td>
                          <td>{item.name}</td>
                          <td>{item.nic}</td>
                          <td>{item.mobile}</td>
                          <td><Switch checkedChildren="Active" unCheckedChildren="Deactive" defaultChecked checked={item.is_active} onChange={(e) => this.setStatus(item.id,item.is_active, e)}/></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination>
               




                    <PaginationItem disabled={pageNumber <= 1}>
              
              <PaginationLink
                onClick={e => this.receivedData(e, pageNumber - 1)}
                previous
                
              />
              
            </PaginationItem>

              {[...Array(this.state.pageCount)].map((page, i) => 
              <PaginationItem active={i === pageNumber-1} key={i}>
                <PaginationLink onClick={e => this.receivedData(e, i+1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )}


<PaginationItem disabled={pageNumber >= this.state.pageCount}>
              
              <PaginationLink
                onClick={e => this.receivedData(e, pageNumber + 1)}
                next
               
              />
              
            </PaginationItem>


                  </Pagination>
                </CardBody>
              </Card>
            </Col>
          }
        </TabPane>
        <TabPane tabId="2">
          {/* Starting tab pane 2 */}

          {
            // <Col>
            //   <Card>
            //     <CardBody>
            //       <Table responsive bordered>
            //         <thead>
            //           <tr>
            //             <th>Name</th>
            //             <th>{this.state.date}</th>
            //             <th>{this.state.date2}</th>
            //             <th>{this.state.date3}</th>
            //             <th>{this.state.date4}</th>
            //             <th>{this.state.date5}</th>
            //             <th>{this.state.date6}</th>
            //             <th>{this.state.date7}</th>
            //           </tr>
            //         </thead>

            //         <tbody>
            //           {this.state.data.map((values) => (
            //             <tr>
            //               <td>{values.name}</td>
            //               <td>
            //                 {/* <Button size="sm" color="ghost-success" onClick={this.toggleLarge1}>
            //          {values.num1}
            //          </Button>   */}
            //                 {this.staffWork(values.num1)}
            //               </td>

            //               <td>
            //                 <Button size="sm" color="ghost-success">
            //                   {values.num1}
            //                 </Button>
            //               </td>

            //               <td>
            //                 <Button size="sm" color="ghost-success">
            //                   {values.num2}
            //                 </Button>
            //               </td>

            //               <td>
            //                 <Button size="sm" color="ghost-success">
            //                   {values.num3}
            //                 </Button>
            //               </td>

            //               <td>
            //                 <Button size="sm" color="ghost-success">
            //                   {values.num4}
            //                 </Button>
            //               </td>

            //               <td>
            //                 <Button size="sm" color="ghost-success">
            //                   {values.num5}
            //                 </Button>
            //               </td>

            //               <td>
            //                 <Button size="sm" color="ghost-success">
            //                   {values.num6}
            //                 </Button>
            //               </td>
            //             </tr>
            //           ))}
            //         </tbody>
            //       </Table>
            //     </CardBody>
            //   </Card>
            // </Col>

            <Card>
              <CardBody>
         
              <div className="row">
              <div className="col-lg-7">
              <FormGroup>
              <Input placeholder={'Search user from first name, email or last name '} name="searchString"  onChange={this.handleOnChange}></Input>   
             </FormGroup>
              </div>
            <div className="col-lg-2 mb-3">
            <FormGroup>
            <Input
             type="select"
             id="limit"
             name="limit"
             value={this.state.limit.toString()}
             onChange={this.onSelectLimit}>
               
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </Input>
            </FormGroup>
            </div>
         
  </div>
            
            <Table responsive className="table table-hover">
            <thead>
              <tr>
              
                <th>
                
                  <i className="fa fa-user-circle-o fa-fw"></i>First Name
                </th>

                <th>
                <i className="fa fa-user-circle-o fa-fw"></i>
                  Last Name
                </th>
                <th>
                <i className="fa fa-envelope fa-fw mt-4"></i>Email
                </th>
                <th>
                  <i className="fa fa-id-badge fa-fw mt-4"></i>
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.data6.map((item) => (
                <tr >
                  
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  
                  <td>
                    {item.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
       




            <PaginationItem disabled={pageNumber <= 1}>
      
      <PaginationLink
        onClick={e => this.receivedData1(e, pageNumber - 1)}
        previous
        
      />
      
    </PaginationItem>

      {[...Array(this.state.pageCount)].map((page, i) => 
      <PaginationItem active={i === pageNumber-1} key={i}>
        <PaginationLink onClick={e => this.receivedData1(e, i+1)}>
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    )}


<PaginationItem disabled={pageNumber >= this.state.pageCount}>
      
      <PaginationLink
        onClick={e => this.receivedData1(e, pageNumber + 1)}
        next
       
      />
      
    </PaginationItem>


          </Pagination>
          </CardBody>
          </Card>
          }
        </TabPane>
      </>
    );
  }

  render() {

  //  var searchString = this.state.searchString.trim().toLowerCase();

  //   if (searchString.length > 0) {
  //     this.state.data6 = this.state.data5.filter(function(i) {
  //          return (i.first_name.toLowerCase().match( searchString )||
  //                 i.last_name.toLowerCase().match( searchString )||
  //                 i.email.toLowerCase().match( searchString )
                 
  //                  );
  //     });
  //  }



    
    return (
      <div className="animated fadeIn">
           

           <Dropdown
                    color="dark"
                    className="pull-right"
                    isOpen={this.state.dropdownOpen[0]}
                    toggle={() => {
                      this.toggle1(0);
                    }}
                  >
                    <DropdownToggle caret color="dark">
                      Add New
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.toggleLarge}>
                        Staff
                      </DropdownItem>
                      <DropdownItem onClick={this.toggleLarge2}>
                        System User
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>


        <div className="pt-lg-5">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "1"}
                  onClick={() => {
                    this.toggle(0, "1");
                  }}
                >
                  <b>Staff Members</b>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.toggle(0, "2");
                  }}
                >
                  System Users
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "3"}
                  onClick={() => {
                    this.toggle(0, "3");
                  }}
                >
                  Messages
                </NavLink>
              </NavItem> */}
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
            </div>
        
      </div>
    );
  }
}

export default Staff;
