import React, { Component } from "react";
import axios from "axios";
import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,

  Jumbotron,
  FormGroup,

  Input,

  Label,
  Container,
} from "reactstrap";
import {

  Card,
  CardBody,

  Col,

  Row,

} from "reactstrap";
//import Scissor from "../../../assets/Scissor.png";
import Scissor from "../../../assets/service.jpg";
import * as BaseService from "../../../BaseService.js";
import Swal from "sweetalert2";

class AddService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
      large1: false,
      large2: false,
      catName: "",
      data: [],
      data2: [],
      serviceName: "",
      servCatergory: "",
      price: "",
      cost: "",
      time: "",
      dropdownOpen: new Array(6).fill(false),
    };

    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggleLarge1 = this.toggleLarge1.bind(this);
    this.toggleLarge2 = this.toggleLarge2.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount = () => {



    const url2= "/category/get/";
    BaseService.GetDataWithoutParams(url2)
      .then((res) => {



        if (res.data.success === true) {

          this.setState({
            data: res.data.data,
          });

          console.log("length " + this.state.data.length);

          this.state.data.map((item) => {
            const values = {
              id: item.id,
              name: item.name,
            };
            this.setState({
              data2: [values,...this.state.data2],
            });
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





    // axios({
    //   method: "GET",
    //   url:
    //     "http://salon-be-dev2.ap-southeast-1.elasticbeanstalk.com/category/get/",
    // })
    //   .then((res) => {
    //     this.setState({
    //       data: res.data.data,
    //     });

    //     console.log("length " + this.state.data.length);

    //     this.state.data.map((item) => {
    //       const values = {
    //         id: item.id,
    //         name: item.name,
    //       };
    //       this.setState({
    //         data2: [values],
    //       });
    //     });
    //     console.log(this.state.data2);
    //   })
    //   .catch((err) => console.log(err));




  };

  toggleLarge() {
    this.setState({
      large: !this.state.large,
      serviceName:"",
price:"",
cost:""
    });
  }

  toggleLarge1() {
    this.setState({
      large1: !this.state.large1,
    });
  }

  toggleLarge2() {
    this.setState({
      large1: !this.state.large1,
    });
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  OnChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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

  ServiceSubmitHandler = (event) => {
    event.preventDefault();

    if(this.state.servCatergory==="")
    {
      alertify.alert("Please add service").setHeader('').set('closable', false);
    }else if(this.state.time==="")
    {
      alertify.alert("Please add time").setHeader('').set('closable', false);
    }else{



    const service = {
      name: this.state.serviceName,
      price: this.state.price,
      cost: this.state.cost,
      is_active: 1,
      slots: parseInt(this.state.time),
      category: parseInt(this.state.servCatergory),
    };

    document.getElementById("submitbtn").disabled=true;
      const url = "/service/save/";
      BaseService.PostService(url, service)
        .then((res) => {
          document.getElementById("submitbtn").disabled=false;
          if (res.data.success === true) {

            this.setState({
              large:false,
serviceName:"",
price:"",
cost:""
            })
this.props.displayservice(1,1);

            Swal.fire(
              "Good job!",
              "Service successfully inserted",
              "success"
            );


          } else {
            alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);
          }
        })
        .catch((err) => {
          alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);
        });


      }
  };

  render() {
    //const contentKets=Object.keys(this.state.data.data);
    return (
      <div>
        {/* <Dropdown
          color="dark"
          className="pull-right"
          isOpen={this.state.dropdownOpen[0]}
          toggle={() => {
            this.toggle(0);
          }}
        >
          <DropdownToggle caret color="dark">
            Add New
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.toggleLarge}>New service</DropdownItem>

            <DropdownItem onClick={this.toggleLarge1}>
              Add catergory
            </DropdownItem>

          </DropdownMenu>
        </Dropdown> */}

<Button color="dark"
          className="pull-right" onClick={this.toggleLarge}  style={{ marginBottom: 20 }}>New Service</Button>
        {/* To add new Catergory */}
        <Modal
          isOpen={this.state.large1}
          toggle={this.toggleLarge1}
          className={"modal-lg " + this.props.className}
        >
          <form onSubmit={this.catergorySubmitHandler}>
            <ModalHeader toggle={this.toggleLarge1}>New Catergory</ModalHeader>
            <ModalBody>
              <Card>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="catName">Catergory Name</Label>
                    <Input
                      type="text"
                      id="catName"
                      name="catName"
                      placeholder="Enter Catergory name"
                      value={this.state.catName}
                      onChange={this.OnChangeHandler}
                      required
                    />
                  </FormGroup>
                  {/* <span
                    style={{
                      color: "grey",
                      fontSize: "x-small",
                      paddingBottom: "100",
                    }}
                  >
                    You can add catergory description here
                  </span>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">
                        Catregory Description
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="textarea"
                        name="textarea-input"
                        id="textarea-input"
                        rows="9"
                        placeholder="Content..."
                      />
                    </Col>
                  </FormGroup> */}
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="success">
                Save
              </Button>{" "}
              <Button color="secondary" onClick={this.toggleLarge1}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>
        {/* To Add New Service */}
        <Modal
          isOpen={this.state.large}
          toggle={this.toggleLarge}
          className={"modal-lg " + this.props.className}
        >
          <form onSubmit={this.ServiceSubmitHandler}>
            <ModalHeader toggle={this.toggleLarge}><i className="fa fa-plus-circle fa-lg mt-4" style={{paddingRight:"8px"}}></i>New Service</ModalHeader>
            <ModalBody>
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
                          required
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

                            onChange={this.OnChangeHandler}
                          >
                            <option value="">Select Category</option>
                            {this.state.data2.map((item1) => (
                              <option value={item1.id}>{item1.name}</option>
                            ))}
                          </Input>
                        </Col>
                      </FormGroup>
                      <hr />
                      <Jumbotron fluid style={{borderRadius:"10px"}}>
                        <p
                          style={{
                            color: "grey",
                            textDecoration: "italic",
                            paddingTop: -200,
                            marginLeft:"10px"
                          }}
                        >
                          Add category and time
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
                                  required
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
                                  required
                                />
                              </FormGroup>
                            </Col>
                          </FormGroup>

                          <FormGroup row className="my-0">
                            <Label htmlFor="select" style={{ marginLeft: "20px" }}>
                             Average Time
                            </Label>

                            <Input
                              type="select"
                              name="time"
                              id="time"
                              style={{ marginLeft: 10 }}
                              onChange={this.OnChangeHandler}
                              style={{ marginRight: "10px",marginLeft:"10px" }}
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

                      {/* <p
                      style={{
                        color: "grey",
                        textDecoration: "italic",
                      }}
                    >
                      Select stylists performing the services
                    </p>
                    <hr />
                    <FormGroup row>
                      <Col md="3">
                        <Label>Select Stylists</Label>
                      </Col>
                      <Col md="9">
                        <FormGroup check className="checkbox">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="checkbox1"
                            name="checkbox1"
                            value="option1"
                          />
                          <Label
                            check
                            className="form-check-label"
                            htmlFor="checkbox1"
                          >
                            Vidula
                          </Label>
                        </FormGroup>
                        <FormGroup check className="checkbox">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="checkbox2"
                            name="checkbox2"
                            value="option2"
                          />
                          <Label
                            check
                            className="form-check-label"
                            htmlFor="checkbox2"
                          >
                            Dinal
                          </Label>
                        </FormGroup>
                        <FormGroup check className="checkbox">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="checkbox3"
                            name="checkbox3"
                            value="option3"
                          />
                          <Label
                            check
                            className="form-check-label"
                            htmlFor="checkbox3"
                          >
                            Amila
                          </Label>
                        </FormGroup>
                        <FormGroup check className="checkbox">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="checkbox3"
                            name="checkbox3"
                            value="option3"
                          />
                          <Label
                            check
                            className="form-check-label"
                            htmlFor="checkbox3"
                          >
                            Piumi
                          </Label>
                        </FormGroup>
                      </Col>
                    </FormGroup> */}
                      <img src={Scissor}  className="img-fluid" alt="img" style={{ paddingTop: 50 }} />

                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>

              <Button id="submitbtn" type="submit" color="success">
                Save
              </Button>
              <Button color="secondary" onClick={this.toggleLarge}>
                Cancel
              </Button>{" "}
            </ModalFooter>
          </form>
        </Modal>{" "}
      </div>
    );
  }
}

export default AddService;
