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
      data3: [],
      data4: [],
      pageNumber: 1,
      limit: 10,
      pageCount: null,
      updateId: null,
      mobileupdated:false,
      mobilefinal:"",
      dialfinal:"",
      countrycd:"",
      mobilewithoutupd:""
      //value:[]
    };
  }

  componentDidMount = () => {
    // 
    
    this.receivedData(1, 1);
  };


  setStatus=(id,isactive,e)=>{

    let updatestate=""
    let active= !(isactive);
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


  

    const url = "/client/update/";
        BaseService.UpdateService(url, updatestate,id)
          .then((res) => {
          
            console.log("response"+res)
            if (res.data.success === true) {
             // this.receivedData(1,1);
             this.componentDidMount()
            
            
      
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
        const url2= "/client/getbypage/";
      BaseService.GetDataWithParams(url2,paramdata)
        .then((res) => {
          
         

          if (res.data.success === true) {

            


          this.setState({
            data3: res.data.data,
            pageCount: Math.ceil(res.data.count / this.state.limit),
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
    );
  };

  toggleLarge=()=> {
    this.setState({
      large: !this.state.large,
      fullName:"",
      NIC:"",
      mobileNumber:""
    });
  }


  toggleLarge2=()=> {
    this.setState({
      large2: !this.state.large2,
    });
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // console.log(this.state.firstName)
  };

  clientsubmitHandler = (event) => {
    event.preventDefault();



if(this.state.mobileNumber.length===9)
{



    if(this.state.NIC==="")
    {
      
      
      const client = {
      name: this.state.fullName,
      nic: "Not Provided",
      country_code: "+" + this.state.dialCode,
      mobile: this.state.mobileNumber,
      is_active: "1",
    };


    document.getElementById("submitbtn").disabled=true;
    const url = "/client/save/";
    BaseService.PostService(url, client)
      .then((res) => {
    

        if (res.data.success === true) {
          Swal.fire(
            'Good job!',
            'Client successfully inserted',
            'success'
          )
          this.setState({
            large:false,
            fullName:"",
            NIC:"",
            mobileNumber:""
          })
          document.getElementById("submitbtn").disabled=false;
          this.receivedData(1, 1);

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
      });

    }else{

      const lastLetter = this.state.NIC[this.state.NIC.length-1];
      const numbers = this.state.NIC.slice(0,this.state.NIC.length-1);
   
      var regExp = /[a-zA-Z]/g;
   
    

if(this.state.NIC.length===10)
{



  if(lastLetter.toString()!=="V")
  {

    alertify.alert("Your NIC Should have a capital letter at the end. With 9 numbers").setHeader('').set('closable', false);

  }else{


    document.getElementById("submitbtn").disabled=true;

    const client = {
      name: this.state.fullName,
      nic: this.state.NIC,
      country_code: "+" + this.state.dialCode,
      mobile: this.state.mobileNumber,
      is_active: "1",
    };


    document.getElementById("submitbtn").disabled=true;
    const url = "/client/save/";
  BaseService.PostService(url, client)
    .then((res) => {
  

      if (res.data.success === true) {

        Swal.fire(
          'Good job!',
          'Client successfully inserted',
          'success'
        )
        this.setState({
          large:false,
          fullName:"",
          NIC:"",
          mobileNumber:""
        })
        document.getElementById("submitbtn").disabled=false;
        this.receivedData(1, 1);

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
    });






  }

}else if(this.state.NIC.length===12)
{

  if(regExp.test(this.state.NIC))
  {

    alertify.alert("Your NIC should not have letters").setHeader('').set('closable', false);

  }else{



    document.getElementById("submitbtn").disabled=true;

    const client = {
      name: this.state.fullName,
      nic: this.state.NIC,
      country_code: "+" + this.state.dialCode,
      mobile: this.state.mobileNumber,
      is_active: "1",
    };


    document.getElementById("submitbtn").disabled=true;
    const url = "/client/save/";
  BaseService.PostService(url, client)
    .then((res) => {
  

      if (res.data.success === true) {

        Swal.fire(
          'Good job!',
          'Client successfully inserted',
          'success'
        )
        this.setState({
          large:false,
          fullName:"",
          NIC:"",
          mobileNumber:""
        })
        document.getElementById("submitbtn").disabled=false;
        this.receivedData(1, 1);

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
    });





  }



}else{


  alertify.alert("Please provide either a valid New or old NIC or keep Field blank").setHeader('').set('closable', false);

}







    }






  }else{

    alertify.alert("Please provide valid phone number").setHeader('').set('closable', false);
  }
 
    
  };

  pass=(id,name,nic,mobile,code)=>{
console.log(mobile)
console.log(code)
    this.setState({
      updateId:id,
      fullNameupd:name,
      NICupd:nic,
      mobileNumberupd:code+mobile,
      countrycd:code,
      mobilewithoutupd:mobile
    })

   


  }



  clientUpdateHandler=(event)=>{

    event.preventDefault();

    
    if(this.state.mobileupdated===true)
    {
      this.setState({
        dialfinal:this.state.dialCodeupd,
        mobilefinal:this.state.mobileNumber


      },()=>{
          const client={
          //id:this.state.updateId,
          name: this.state.fullNameupd,
          nic: this.state.NICupd,
          country_code: this.state.dialfinal,
          mobile: this.state.mobilefinal,
        }

        document.getElementById("updatebtn").disabled=true;
        document.getElementById("deletebtn").disabled=true;
      
        const url = "/client/update/";
        BaseService.UpdateService(url, client,this.state.updateId)
          .then((res) => {
          
            console.log("response"+res)
            if (res.data.success === true) {
           this.receivedData(1,1);
                Swal.fire(
            'Good job!',
            'Client successfully Updated',
            'success'
          )
          document.getElementById("updatebtn").disabled=false;
          document.getElementById("deletebtn").disabled=false;
      
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

      });	

    }

    if(this.state.mobileupdated===false){
console.log("visit here")
console.log("value here:"+this.state.countrycd)
      this.setState({
        dialfinal:this.state.countrycd,
        mobilefinal:this.state.mobilewithoutupd
      },()=>{


         const client={
         
          name: this.state.fullNameupd,
          nic: this.state.NICupd,
          country_code: this.state.dialfinal,
          mobile: this.state.mobilefinal,
        }

        document.getElementById("updatebtn").disabled=true;
        document.getElementById("deletebtn").disabled=true;

      
        const url = "/client/update/";
        BaseService.UpdateService(url, client,this.state.updateId)
          .then((res) => {
      

            console.log("response"+res)
            if (res.data.success === true) {
              //this.receivedData(1,1);
              Swal.fire(
                'Good job!',
                'Client successfully Updated',
                'success'
              )
              document.getElementById("updatebtn").disabled=false;
              document.getElementById("deletebtn").disabled=false;

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
      
    
    
    
    })
      
    }




  }


  deleteClient=()=>{

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
    
        const url = "/client/delete/";
        BaseService.DeleteData(url,this.state.updateId)
          .then((res) => {
      
    
            console.log("response"+res)
            document.getElementById("updatebtn").disabled=false;
            document.getElementById("deletebtn").disabled=false;
    
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
                data3:this.state.data3.filter(element=>{
                    return(
                        element.name.toLowerCase().match(event.target.value)||
                        element.nic.match(event.target.value)
                      
                      
                       
    
    
    
                    )
                })
            })
        }else{
            this.receivedData(1,1);
        }
      };

  

  render() {
   
    const { pageNumber } = this.state;
    return (
      <div className="animated fadeIn">
      <Card>
            <CardHeader>
            <h5><i className="fa fa-user fa-lg mt-4" style={{paddingRight:"8px"}}></i>
           Client Details</h5>
          </CardHeader>


        <CardBody>
        
          <div className="row">
           <div className="col-lg-7 ">
           <FormGroup>
          <Input placeholder={'Search by client name or NIC '} name="searchString"  onChange={this.handleOnChange}></Input>  
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
             <div className="col-lg-2 ">
            <Button
              onClick={this.toggleLarge}
              color="dark"
              className="pull-right"
              style={{ marginBottom: 20 }}
            >
              Add Client
            </Button>
            </div>
          </div>

          <Modal
            isOpen={this.state.large}
            
            className={"modal-lg " + this.props.className}
          >
            <form onSubmit={this.clientsubmitHandler}>
              <ModalHeader toggle={this.toggleLarge}><i className="fa fa-plus-circle fa-lg mt-4" style={{paddingRight:"8px"}}></i>Add Client</ModalHeader>
              <ModalBody style={{backgroundImage: `url(${Back4})`,backgroundSize:"auto"}}>
                <Card>
                  <CardBody>
                    <FormGroup>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your First Name"
                        value={this.state.fullName}
                        onChange={this.changeHandler}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="NIC">NIC</Label>
                      <Input
                        type="text"
                        id="NIC"
                        name="NIC"
                        placeholder="Enter NIC"
                        value={this.state.NIC}
                        onChange={this.changeHandler}
                        
                      />
                      <FormText color="muted">
          Optional field
        </FormText>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="mobileNumber">Mobile Number</Label>
                      <PhoneInput
                        country={"lk"}
                        name="mobileNumber"
                        onChange={(country, value, event) => {
                          this.setState({
                            dialCode: value["dialCode"],
                            Country: value["name"],
                            mobileNumber: country.slice(value.dialCode.length),
                          });
                        }}
                      />
                    </FormGroup>
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button id="submitbtn" type="submit" color="success">
                  Save
                </Button>
                <Button color="secondary" onClick={this.toggleLarge}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </Modal>

          <Table responsive className="table table-hover hover">
            <thead>
              <tr>
                <i
                  className="fa fa-reorder fa-lg mt-4"
                  style={{ paddingTop: 12 }}
                ></i>
                <th >
<div className="d-flex">
<div>
                  <i className="fa fa-user-circle-o fa-fw"></i>
                  </div>
                  Full name
                  </div>
                </th>
                <th>
                  <i className="fa fa-id-card fa-fw mt-4"></i>
                  NIC
                </th>
                <th>
                  <i className="fa fa-phone fa-fw"></i>
                  Mobile
                </th>
                <th>
                  <i className="fa fa-calendar fa-fw mt-4"></i>
                  last Date
                </th>
                  <th>
                <i className="fa fa-exclamation-triangle fa-fw mt-4"></i>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {this.state.data3.map((person) => (
                <tr>
                <div className="d-flex">
                  <i
                    className="fa fa-edit fa-lg mt-4"  style={{cursor:"pointer"}}
                    onClick={() => {
                      this.toggleLarge2();this.pass(
                        person.id,
                        person.name,
                        person.nic,
                        person.mobile,
                        person.country_code
                      );
                    }}
                  ></i>

<i
                    className="fa fa-trash fa-lg mt-4 ml-3"  style={{cursor:"pointer"}}
                    onClick={() => {
                     this.pass(
                        person.id,
                        person.name,
                        person.nic,
                        person.mobile,
                        person.country_code
                      );
                      this.deleteClient1();
                    }}
                  ></i>
</div>
                  <td>{person.name}</td>
                  <td>{person.nic?person.nic:'Not Provided'}</td>
                  <td>{person.country_code + person.mobile}</td>
                  {person.last_date === null ? (
                    <td>No appointments</td>
                  ) : (
                    <td>{person.lastdate}</td>
                  )}
                  <td><Switch checkedChildren="Active" unCheckedChildren="Deactive" defaultChecked checked={person.is_active} unchecked={false} onChange={(e) => this.setStatus(person.id,person.is_active, e)}/></td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal
            isOpen={this.state.large2}
         
            className={"modal-lg " + this.props.className}
          >
            <form onSubmit={this.clientUpdateHandler}>
              <ModalHeader toggle={this.toggleLarge2}><i className="fa fa-edit fa-lg mt-4" style={{paddingRight:"8px"}}></i>Edit Client</ModalHeader>
              <ModalBody style={{backgroundImage: `url(${Back3})`,backgroundSize:"auto"}}>
              <Card>
                <CardBody>

                
                    <FormGroup>
                      <Label htmlFor="fullNameupd">Full Name</Label>
                      <Input
                        type="text"
                        id="fullNameupd"
                        name="fullNameupd"
                        placeholder="Enter your First Name"
                        value={this.state.fullNameupd}
                        onChange={this.changeHandler}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="NICupd">NIC</Label>
                      <Input
                        type="text"
                        id="NICupd"
                        name="NICupd"
                        placeholder="Enter NIC"
                        value={this.state.NICupd}
                        onChange={this.changeHandler}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="mobileNumberupd">Mobile Number</Label>
                      <PhoneInput
                        country={"lk"}
                        name="mobileNumberupd"
                        value={this.state.mobileNumberupd}
                        onChange={(country, value, event) => {
                          this.setState({
                            mobileupdated:true,
                            dialCodeupd: "+"+value["dialCode"],
                            Country: value["name"],
                            mobileNumber: country.slice(value.dialCode.length),
                          });
                        }}
                      />
                    </FormGroup>
                    </CardBody>
              </Card>
              </ModalBody>
              <ModalFooter>
                <Button id="updatebtn" type="submit" color="success">
                  Save
                </Button>
                <Button onClick={()=>this.deleteClient()} id="deletebtn"  color="danger">
                  Delete
                </Button>
                <Button color="secondary" onClick={this.toggleLarge2}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </Modal>
          <Pagination>
            {/* <PaginationItem>
                  <PaginationLink previous tag="button"></PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink tag="button">1</PaginationLink>
                </PaginationItem> */}

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
        </CardBody>
      </Card>
      </div>
    );
  }
}




export default  Client;
