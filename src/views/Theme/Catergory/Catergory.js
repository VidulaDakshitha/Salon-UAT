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
  CardHeader
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
  Container,
} from "reactstrap";




class Catergory extends Component {
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
      catNameupdate:""
    };
 
  }


  componentWillMount = () => {
  


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
      const url2= "/category/getbypage/";
    BaseService.GetDataWithParams(url2,paramdata)
      .then((res) => {
        
       
        if (res.data.success === true) {


          this.setState({
            data3: res.data.data,
            pageCount:Math.ceil(res.data.count / this.state.limit),
  
            
          });
          
          // console.log("length of limit" + this.state.data3.length);
  
          // this.state.data3.map((item) => {
  
          //   const index1=this.state.data2.findIndex((res)=>{
              
          //     return res.name===item.category
              
          // });
  
          //   const values = {
          //     id: item.id,
          //     name: item.name,
          // is_active:item.is_active
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

  toggleLarge=()=> {
    this.setState({
      large: !this.state.large,
    });
  }

  toggleLarge1=()=> {
    this.setState({
      large1: !this.state.large1,
      catName: "",
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
  pass = (name,id) => {
    this.setState({
      updateId:id,
      catNameupdate:name

    })


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

   
  };




  catergorySubmitHandler = (event) => {
    event.preventDefault();
    const catergory = {
      name: this.state.catName,
      is_active: 1,
    };
    const url = "/category/save/";
    BaseService.PostService(url, catergory)
      .then((res) => {
        console.log(res)
        if (res.data.success === true) {
    
        console.log(res);
        console.log(res.data);
        this.setState({
          catName: "",
          large1:false
        });

        Swal.fire(
          "Good job!",
          "Category successfully inserted",
          "success"
        );
        window.location.reload(false)
      }
      })
      .catch((error) => {
        alertify.alert("Cannot perform operation "+error).setHeader('').set('closable', false);
      });
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
   

    const url = "/category/update/";
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



  updateCatergoryHandler=(e)=>{

    e.preventDefault();
    const Updatecatergory = {
      name: this.state.catNameupdate,

    };
    document.getElementById("updatebtn").disabled=true;
    document.getElementById("deletebtn").disabled=true;
  
  const url = "/category/update/";
  BaseService.UpdateService(url, Updatecatergory,this.state.updateId)
    .then((res) => {

      document.getElementById("updatebtn").disabled=false;
      document.getElementById("deletebtn").disabled=false;

      
      console.log("response"+res)
      if (res.data.success === true) {
       // this.receivedData(1,1);
       Swal.fire(
        'Good job!',
        'Category successfully Updated',
        'success'
      );
     
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



catergorySubmitHandler = (event) => {
  event.preventDefault();
  const catergory = {
    name: this.state.catName,
    is_active: 1,
  };
  document.getElementById("submitbtn").disabled=true;
  const url = "/category/save/";
  BaseService.PostService(url, catergory)
    .then((res) => {
      console.log(res)
      document.getElementById("submitbtn").disabled=false;
      if (res.data.success === true) {
  
      console.log(res);
      console.log(res.data);
      this.setState({
        catName: "",
        large1:false
      });
      this.receivedData(1,1);
      Swal.fire(
        "Good job!",
        "Category successfully inserted",
        "success"
      );
     
    }
    })
    .catch((error) => {
      alertify.alert("Cannot perform operation "+error).setHeader('').set('closable', false);
    });
};


deletecatergory=()=>{

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

  const url = "/category/delete/";
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


deletecatergory1=()=>{

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

  const url = "/category/delete/";
  BaseService.DeleteData(url,this.state.updateId)
    .then((res) => {


     

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


  render() {

    const {pageNumber}=this.state;
    return (
      <div className="animated fadeIn">
        
      <Col>
       
        <Card>

        <CardHeader>
       
            <h5> <i className="fa fa-list-alt fa-lg mt-4" style={{paddingRight:"8px"}}></i>
          Category Details</h5>
          </CardHeader>
       
          <CardBody>
          <div className="row">
          <div className="col-lg-7">
          <FormGroup>
          <Input placeholder={'Search category from category name'} name="searchString"  onChange={this.handleOnChange}></Input>   
           
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
          <Button color="dark"
          className="pull-right" onClick={this.toggleLarge1} style={{ marginBottom: 20 }}>New Category</Button>
          </div>
  </div>
            <Table responsive className="table table-hover hover">
              <thead>
                <tr>
                  <i className="fa fa-reorder fa-lg mt-4" style={{paddingTop:12}}></i>
                  <th> 
             
                
                  <i className="fa fa-user-circle-o fa-fw"></i>
            
                  Catergory Name
               
                  
                  
                  </th>
                  
                  <th><i className="fa fa-exclamation-triangle fa-fw mt-4"></i>Action</th>
               
                </tr>
              </thead>
              {this.state.data3.map((item) => (
                <tbody>
                  <tr>
                  <div className="d-flex">
                    <i
                      className="fa fa-edit fa-lg mt-4" style={{cursor:"pointer"}}
                      onClick={()=>{this.toggleLarge();this.pass(item.name,item.id)}}
                    ></i>
                         <i
                      className="fa fa-trash fa-lg mt-4 ml-3" style={{cursor:"pointer"}}
                      onClick={()=>{this.pass(item.name,item.id);this.deletecatergory1();}}
                    ></i>
                    </div>
                    <td>{item.name}</td>
                
                    <td><Switch checkedChildren="Active" unCheckedChildren="Deactive" defaultChecked checked={item.is_active} onChange={(e) => this.setStatus(item.id,item.is_active, e)}/></td>

                    {/* <button onClick={this.toggleLarge}>click</button> */}
                  </tr>


         
                </tbody>
              ))}
            </Table>


            <Modal
          isOpen={this.state.large1}
        
          className={"modal-lg " + this.props.className}
        >
          <form onSubmit={this.catergorySubmitHandler}>
            <ModalHeader toggle={this.toggleLarge1}><i className="fa fa-plus-circle fa-lg mt-4" style={{paddingRight:"8px"}}></i>New Category</ModalHeader>
            <ModalBody>
              <Card>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="catName">Category Name</Label>
                    <Input
                      type="text"
                      id="catName"
                      name="catName"
                      placeholder="Enter Category name"
                      value={this.state.catName}
                      onChange={this.OnChangeHandler}
                      required
                    />
                  </FormGroup>
                                                     
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button id="submitbtn" type="submit" color="success">
                Save
              </Button>{" "}
              <Button color="secondary" onClick={this.toggleLarge1}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>

   



        <Modal
          isOpen={this.state.large}
   
          className={"modal-lg " + this.props.className}
        >
          <form onSubmit={this.updateCatergoryHandler}>
            <ModalHeader toggle={this.toggleLarge}><i className="fa fa-edit fa-lg mt-4" style={{paddingRight:"8px"}}></i>Edit Category</ModalHeader>
            <ModalBody>
              <Card>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="catName">Category Name</Label>
                    <Input
                      type="text"
                      id="catNameupdate"
                      name="catNameupdate"
                      placeholder="Enter Catergory name"
                      value={this.state.catNameupdate}
                      onChange={this.OnChangeHandler}
                      required
                    />
                  </FormGroup>
                                                     
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              
            <Button id="updatebtn" type="submit" color="success">
                Save
              </Button>
              <Button onClick={()=>this.deletecatergory()} id="deletebtn"  color="danger">
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

export default Catergory;
