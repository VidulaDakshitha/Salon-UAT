import React, { Component } from "react";
import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
import * as BaseService from "../../../BaseService.js";
import { Switch } from 'antd';
import 'antd/dist/antd.css';

import Swal from "sweetalert2";


import {

  Card,
  CardBody,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Jumbotron,
  FormGroup,
  Input,
  Label,
  CardHeader,
  Container,
} from "reactstrap";
//import Scissor from "../../../assets/Scissor.png";
import AddService from "./AddService";
import Scissor from "../../../assets/service.jpg";

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
      large1: false,
      dropdownOpen: new Array(6).fill(false),
      showComponent: false,
      serviceName: "",
      servCatergory: "",
      price: "",
      cost: "",
      time: "",
      data:[],
      data2:[],
      data3:[],
      data4:[],
      pageNumber:1,
      limit:10,
      pageCount:null,
      updateId:null,
      loading:true,
    };

  }


  componentWillMount = () => {



    const url2= "/category/get/";
     BaseService.GetDataWithoutParams(url2)
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


      this.receivedData(1,1);



  };


  receivedData=(e,index)=>{


    console.log("index"+index)
    this.setState({
      pageNumber:index,

    },()=>{


      const paramdata= {
        page: this.state.pageNumber, limit: this.state.limit
      };
      const url2= "/service/getbypage/";
    BaseService.GetDataWithParams(url2,paramdata)
      .then((res) => {


        if (res.data.success === true) {


          this.setState({
            data3: res.data.data,
            pageCount:Math.ceil(res.data.count / this.state.limit),


          });

          console.log("length of limit" + this.state.data3.length);

          // this.state.data3.map((item) => {

          //   const index1=this.state.data2.findIndex((res)=>{

          //     return res.name===item.category

          // });

          //   const values = {
          //     id: item.id,
          //     name: item.name,
          //     price:item.price,
          //     time:item.time,
          //     category:this.state.data2[index1],
          //     cost:item.cost,
          //     slots:item.slots,
          //     is_active:item.is_active
          //   };
          //   this.setState({
          //     data4: [values,...this.state.data4],
          //   });
          // });


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



    })

  }


  handleOnChange = (event) => {
    let orderkeyword=event.target.value.trim().toLowerCase();
    if(orderkeyword.length>0){
        this.setState({
            data3:this.state.data3.filter(element=>{
                return(
                    element.name.toLowerCase().match(event.target.value)





                )
            })
        })
    }else{
        this.receivedData(1,1);
    }
  };




  toggleLarge=()=> {
    this.setState({
      large: !this.state.large,
    });
  }

  toggleLarge1=()=> {
    this.setState({
      large: !this.state.large,
    });
  }

  toggle=(i)=> {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }
  pass = (servvalue,catvalue,price,cost,time1,id) => {





   const index1=this.state.data2.findIndex((res)=>{

              return res.name===catvalue

          });


if(index1>=0)
{


    this.setState({
      serviceName:servvalue,
      servCatergory: this.state.data2[index1].id,
      price: price,
      cost: cost,
      time: time1,
      updateId:id

    })
  }else{
    this.setState({
      serviceName:servvalue,
      servCatergory: catvalue,
      price: price,
      cost: cost,
      time: time1,
      updateId:id

    })

  }

    // if(time1==="1")
    // {
    //   document.getElementById("time").value="1";
    // }else if(time1==="2")
    // {
    //   document.getElementById("time").value="2";
    // }else if(time1==="3")
    // {
    //   document.getElementById("time").value="3";
    // }else if(time1==="4")
    // {
    //   document.getElementById("time").value="4";
    // }else if(time1==="5")
    // {
    //   document.getElementById("time").value="5";
    // }else
    // {
    //   document.getElementById("time").value="6";
    // }

    console.log(time1)
  };

  OnChangeHandler=(e)=>{

    this.setState({
      [e.target.name]:e.target.value
    })
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


    const url = "/service/update/";
    BaseService.UpdateService(url, updatestate,id)
      .then((res) => {



        console.log("response"+res)
        if (res.data.success === true) {
         // this.receivedData(1,1);
        //  Swal.fire(
        //   'Good job!',
        //   'Client successfuly Updated',
        //   'success'
        // );
        this.receivedData(1,1);


        } else {
          Swal.fire({
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



  updateServiceHandler=(e)=>{

    e.preventDefault();
    const Updateservice = {
      name: this.state.serviceName,
      price: this.state.price,
      cost: this.state.cost,

      category_id: parseInt(this.state.servCatergory),
      slots: parseInt(this.state.time),
    };
    document.getElementById("updatebtn").disabled=true;
    document.getElementById("deletebtn").disabled=true;

  const url = "/service/update/";
  BaseService.UpdateService(url, Updateservice,this.state.updateId)
    .then((res) => {



      console.log("response"+res)
      if (res.data.success === true) {
     this.receivedData(1,1);
       Swal.fire(
        'Good job!',
        'Service successfully Updated',
        'success'
      );
      document.getElementById("updatebtn").disabled=false;
      document.getElementById("deletebtn").disabled=false;

        this.setState({
          large:false
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



deleteservice=()=>{

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

  const url = "/service/delete/";
  BaseService.DeleteData(url,this.state.updateId)
    .then((res) => {


      console.log("response"+res)
      document.getElementById("updatebtn").disabled=false;
      document.getElementById("deletebtn").disabled=false;

      if (res.data.success === true) {
        this.receivedData(1,1);



        alertify.success("Successfully deleted service");

        this.setState({
          large:false
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


deleteservice1=()=>{

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



  const url = "/service/delete/";
  BaseService.DeleteData(url,this.state.updateId)
    .then((res) => {


      console.log("response"+res)


      if (res.data.success === true) {
        this.receivedData(1,1);



        alertify.success("Successfully deleted service");

        this.setState({
          large:false
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


  render() {

    const {pageNumber}=this.state;
    return (
      <div className="animated fadeIn">
      <Col>

        <Card>
        <CardHeader>
            <h5><i className="fa fa-book fa-lg mt-4" style={{paddingRight:"8px"}}></i>
           Service Details</h5>
          </CardHeader>


          <CardBody>
            <div className="row">
<div className="col-lg-7">
<FormGroup>
            <Input placeholder={'Search by service type '} name="searchString"  onChange={this.handleOnChange}></Input>
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
              <AddService displayservice={this.receivedData}/>
               </div>
            </div>

            <Table responsive className="table table-hover hover">
              <thead>
                <tr>
                  <i className="fa fa-reorder fa-lg mt-4"  style={{paddingTop:12}}></i>
                  <th><i className="fa fa-file-text-o fa-fw"></i>Service Type</th>
                  <th><i className="fa fa-clock-o fa-fw"></i>Average time</th>
                  <th><i className="fa fa-money fa-fw"></i>Price (LKR)</th>
                  <th><i className="fa fa-exclamation-triangle fa-fw mt-4"></i>Action</th>
                </tr>
              </thead>
              {this.state.data3.map((item) => (
                <tbody>
                  <tr>
                  <div className="d-flex">
                    <i
                      className="fa fa-edit fa-lg mt-4" style={{cursor:"pointer"}}
                      onClick={()=>{this.toggleLarge();this.pass(item.name,item.category,item.price,item.cost,item.slots,item.id)}}
                    ></i>
                     <i
                      className="fa fa-trash fa-lg mt-4 ml-3" style={{cursor:"pointer"}}
                      onClick={()=>{this.pass(item.name,item.category,item.price,item.cost,item.slots,item.id);this.deleteservice1();}}
                    ></i>
                    </div>
                    <td>{item.name}</td>
                    <td>{item.time} min</td>
                    <td>{item.price}</td>
                    <td><Switch checkedChildren="Active" unCheckedChildren="Deactive" defaultChecked checked={item.is_active} onChange={(e) => this.setStatus(item.id,item.is_active, e)}/></td>

                    {/* <button onClick={this.toggleLarge}>click</button> */}
                  </tr>



                </tbody>
              ))}
            </Table>





            <Modal
                    isOpen={this.state.large}
                    toggle={this.toggleLarge}
                    className={"modal-lg " + this.props.className}
                  >
                    {/*table model*/}

          <form onSubmit={this.updateServiceHandler}>
            <ModalHeader toggle={this.toggleLarge}><i className="fa fa-edit fa-lg mt-4" style={{paddingRight:"8px"}}></i>Edit Service</ModalHeader>
            <ModalBody >
              <Row>
                <Col xs="12" sm="6">
                  <Card style={{ border: "transparent" }}>
                    <CardBody>
                      <FormGroup>
                        <Label htmlFor="serviceName">Service Name</Label>
                        <Input
                          type="text"
                          id="serviceName"
                          name="serviceName"
                          value={this.state.serviceName}
                          placeholder="Enter service name"
                          onChange={this.OnChangeHandler}
                        />
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="select">Category</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="select"
                            name="servCatergory"
                            id="servCatergory"
                            value={this.state.servCatergory}
                            onChange={this.OnChangeHandler}
                          >
                            <option value="0">Select Category</option>
                            {this.state.data2.map((item1) => (
                              <option value={item1.id}>{item1.name}</option>
                            ))}
                          </Input>
                        </Col>
                      </FormGroup>
                      <hr />
                      <Jumbotron  fluid style={{borderRadius:"10px"}}>
                        <p
                          style={{
                            color: "grey",
                            textDecoration: "italic",
                            paddingTop: -200,
                            marginLeft:"10px"
                          }}
                        >
                          Add catergory and time
                        </p>
                        <hr />
                        <Container fluid>
                          <FormGroup row className="my-0">
                            <Col xs="6">
                              <FormGroup>
                                <Label htmlFor="city">Cost</Label>
                                <Input
                                  style={{ marginLeft: 10 }}
                                  type="number"
                                  id="cost"
                                  name="cost"
                                  placeholder="LKR"
                                  value={this.state.cost}
                                  onChange={this.OnChangeHandler}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs="6">
                              <FormGroup>
                                <Label htmlFor="lastName">Selling Price</Label>
                                <Input
                                  type="number"
                                  id="price"
                                  name="price"
                                  value={this.state.price}
                                  onChange={this.OnChangeHandler}
                                  placeholder="LKR"
                                />
                              </FormGroup>
                            </Col>
                          </FormGroup>
                          <FormGroup row className="my-0">
                            <Label htmlFor="select" style={{ marginLeft: 10 }}>
                              Average Time
                            </Label>

                            <Input
                              type="select"
                              name="time"
                              id="time"
                              value={this.state.time}
                              style={{ marginLeft: 10 }}
                              onChange={this.OnChangeHandler}
                            >
                              <option value="">Select Time</option>

                               <option value="1">Slots 1 : {localStorage.getItem("slot_minutes")*1} min</option>
                              <option value="2">Slots 2 : {localStorage.getItem("slot_minutes")*2} min</option>
                              <option value="3">Slots 3 : {localStorage.getItem("slot_minutes")*3} min</option>
                              <option value="4">Slots 4 : {localStorage.getItem("slot_minutes")*4} min</option>
                              <option value="5">Slots 5 : {localStorage.getItem("slot_minutes")*5} min</option>
                              <option value="6">Slots 6 : {localStorage.getItem("slot_minutes")*6} min</option>
                              <option value="7">Slots 7 : {localStorage.getItem("slot_minutes")*7} min</option>
                              <option value="8">Slots 8 : {localStorage.getItem("slot_minutes")*8} min</option>
                              <option value="9">Slots 9 : {localStorage.getItem("slot_minutes")*9} min</option>
                              <option value="10">Slots 10 : {localStorage.getItem("slot_minutes")*10} min</option>
                              <option value="11">Slots 11 : {localStorage.getItem("slot_minutes")*11} min</option>
                              <option value="12">Slots 12 : {localStorage.getItem("slot_minutes")*12} min</option>
                              <option value="13">Slots 13 : {localStorage.getItem("slot_minutes")*13} min</option>
                              <option value="14">Slots 14 : {localStorage.getItem("slot_minutes")*14} min</option>
                              <option value="15">Slots 15 : {localStorage.getItem("slot_minutes")*15} min</option>
                              <option value="16">Slots 16 : {localStorage.getItem("slot_minutes")*16} min</option>
                              <option value="17">Slots 17 : {localStorage.getItem("slot_minutes")*17} min</option>
                              <option value="18">Slots 18 : {localStorage.getItem("slot_minutes")*18} min</option>
                              <option value="19">Slots 19 : {localStorage.getItem("slot_minutes")*19} min</option>
                              <option value="20">Slots 20 : {localStorage.getItem("slot_minutes")*20} min</option>
                              <option value="21">Slots 21 : {localStorage.getItem("slot_minutes")*21} min</option>
                              <option value="22">Slots 22 : {localStorage.getItem("slot_minutes")*22} min</option>
                              <option value="23">Slots 23 : {localStorage.getItem("slot_minutes")*23} min</option>
                              <option value="24">Slots 24 : {localStorage.getItem("slot_minutes")*24} min</option>
                              <option value="25">Slots 25 : {localStorage.getItem("slot_minutes")*25} min</option>
                              <option value="26">Slots 26 : {localStorage.getItem("slot_minutes")*26} min</option>
                              <option value="27">Slots 27 : {localStorage.getItem("slot_minutes")*27} min</option>
                              <option value="28">Slots 28 : {localStorage.getItem("slot_minutes")*28} min</option>
                              <option value="29">Slots 29 : {localStorage.getItem("slot_minutes")*29} min</option>
                              <option value="30">Slots 30 : {localStorage.getItem("slot_minutes")*30} min</option>
                              <option value="31">Slots 31 : {localStorage.getItem("slot_minutes")*31} min</option>
                              <option value="32">Slots 32 : {localStorage.getItem("slot_minutes")*32} min</option>
                            </Input>
                          </FormGroup>
                        </Container>
                      </Jumbotron>
                    </CardBody>
                  </Card>
                </Col>

                <Col xs="12" sm="6">


                      <img src={Scissor} className="img-fluid" alt="img" style={{ paddingTop: 50 }} />

                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>

              <Button id="updatebtn" type="submit" color="success">
                Save
              </Button>
              <Button onClick={()=>this.deleteservice()} id="deletebtn"  color="danger">
                  Delete
                </Button>
              <Button color="secondary" onClick={this.toggleLarge}>
                Cancel
              </Button>{" "}
            </ModalFooter>
          </form>
                  </Modal>
            <Pagination>
              {/* <PaginationItem disabled>
                <PaginationLink previous tag="button">
                  Prev
                </PaginationLink>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink tag="button" value="1">1</PaginationLink>
              </PaginationItem> */}
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

              {/* <PaginationItem>
                <PaginationLink tag="button">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next tag="button">
                  Next
                </PaginationLink>
              </PaginationItem> */}
            </Pagination>
          </CardBody>
        </Card>
      </Col>
      </div>
    );
  }
}

export default Services;
