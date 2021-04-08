import axios from "axios";
import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";



//const base_url = "http://salon-be-dev2.ap-southeast-1.elasticbeanstalk.com";
//const base_url = "https://dev-reservation-api.onepos.lk";
const base_url = "https://reserveme-api.ereserv.me";





export const PostService = (url, data) => {
  return axios(base_url + url, {
    method: "POST",
    headers: {
      "content-type": "application/json", // whatever you want
      Authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
    },
    data: data,
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response && err.response.status === 401) {
        let obj = {
          refresh: localStorage.getItem("RefreshToken"),
        };
        return axios(base_url + "/refresh/", {
          method: "POST",
          headers: {
            "content-type": "application/json", // whatever you want
            Authorization: "Token ".concat(localStorage.getItem("RefreshToken"))
          },
          data: data,
        }).then(
          (res) => {
            localStorage.setItem("AccessToken", res.data["access"]);
            return axios(base_url + url, {
              method: "POST",
              headers: {
                "content-type": "application/json", // whatever you want
                Authorization: "Bearer ".concat(
                  localStorage.getItem("AccessToken")
                ),
              },
              data: data,
            }).then(
              (res) => {
                return res;
              },
              (err) => {
                alertify.alert("Cannot perform the operation. Try refreshing page or contact administrator").setHeader('').set('closable', false);;
                return err;
              }
            );
          },
          (err) => {
            if (err.response && err.response.status === 401) {
              console.log(err.response.data["Error"]);
              localStorage.setItem("previous", window.location.hash);
              localStorage.removeItem("AccessToken");
              window.location.href = `/#/login`;
              window.location.reload();
            } else {
              alertify.alert("Cannot perform the operation. Try refreshing page or contact administrator").setHeader('').set('closable', false);;
              return err;
            }
          }
        );
      } else {
        return err;
      }
    }
  );
};

export const PostServiceWithoutHeader=(url, data)=>{


  return axios(base_url + url, {
    method: "POST",
   // headers: {
      //"content-type": "application/json", // whatever you want
      //Authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
    //},
    data: data,
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      // if (err.response && err.response.status === 401) {
      //   let obj = {
      //     refresh: localStorage.getItem("RefreshToken"),
      //   };
      //   return axios(base_url + "/refresh/", {
      //     method: "POST",
      //     headers: {
      //       "content-type": "application/json", // whatever you want
      //       // Authorization: "Token ".concat(localStorage.getItem("RefreshToken"))
      //     },
      //     data: obj,
      //   }).then(
      //     (res) => {
      //       localStorage.setItem("AccessToken", res.data["access"]);
      //       return axios(base_url + url, {
      //         method: "POST",
      //         headers: {
      //           "content-type": "application/json", // whatever you want
      //           Authorization: "Bearer ".concat(
      //             localStorage.getItem("AccessToken")
      //           ),
      //         },
      //         data: data,
      //       }).then(
      //         (res) => {
      //           return res;
      //         },
      //         (err) => {
      //           alertify.alert("Cannot perform the operation");
      //           return err;
      //         }
      //       );
      //     },
      //     (err) => {
      //       if (err.response && err.response.status === 401) {
      //         console.log(err.response.data["Error"]);
      //         localStorage.setItem("previous", window.location.hash);
      //         localStorage.removeItem("AccessToken");
      //         window.location = `/#/login`;
      //       } else {
      //         alertify.alert("Cannot perform the operation");
      //         return err;
      //       }
      //     }
      //   );
      // } else {
      //   return err;
      // }

      return err
    }
  );

}


export const UpdateService=(url, data,param)=>{


  return axios(base_url + url, {
    method: "PUT",
    headers: {
      "content-type": "application/json", // whatever you want
      Authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
    },
    params:{id:param},
    data: data,
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response && err.response.status === 401) {
        let obj = {
          refresh: localStorage.getItem("RefreshToken"),
        };
        return axios(base_url + "/refresh/", {
          method: "PUT",
          headers: {
            "content-type": "application/json", // whatever you want
            Authorization: "Token ".concat(localStorage.getItem("RefreshToken"))
          },
          params:{id:param},
          data: data,
        }).then(
          (res) => {
            localStorage.setItem("AccessToken", res.data["access"]);
            return axios(base_url + url, {
              method: "PUT",
              headers: {
                "content-type": "application/json", // whatever you want
                Authorization: "Bearer ".concat(
                  localStorage.getItem("AccessToken")
                ),
              },
              params:{id:param},
              data: data,
            }).then(
              (res) => {
                return res;
              },
              (err) => {
                alertify.alert("Cannot perform the operation. Try refreshing page or contact administrator").setHeader('').set('closable', false);;
                return err;
              }
            );
          },
          (err) => {
            if (err.response && err.response.status === 401) {
              console.log(err.response.data["Error"]);
              localStorage.setItem("previous", window.location.hash);
              localStorage.removeItem("AccessToken");
              window.location.href = `/#/login`;
            } else {
              alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);;
              return err;
            }
          }
        );
      } else {
        return err;
      }
    }
  );

}


export const GetDataWithParams = (url, data) => {
  return axios(base_url + url, {
    method: "GET",
    headers: {
      "content-type": "application/json", // whatever you want
      Authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
    },
    params: data,
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response && err.response.status === 401) {
        let obj = {
          refresh: localStorage.getItem("RefreshToken"),
        };
        return axios(base_url + "/refresh/", {
          method: "GET",
          headers: {
            "content-type": "application/json", // whatever you want
            Authorization: "Token ".concat(localStorage.getItem("RefreshToken"))
          },
          params: data,
        }).then(
          (res) => {
            localStorage.setItem("AccessToken", res.data["access"]);
            return axios(base_url + url, {
              method: "GET",
              headers: {
                "content-type": "application/json", // whatever you want
                Authorization: "Bearer ".concat(
                  localStorage.getItem("AccessToken")
                ),
              },
              params: data,
            }).then(
              (res) => {
                return res;
              },
              (err) => {
                alertify.alert("Cannot perform the operation. Try refreshing page or contact administrator").setHeader('').set('closable', false);;
                return err;
              }
            );
          },
          (err) => {
            if (err.response && err.response.status === 401) {
              console.log(err.response.data["Error"]);
              localStorage.setItem("previous", window.location.hash);
              localStorage.removeItem("AccessToken");
              window.location.href = `/#/login`;
            } else {
              alertify.alert("Cannot perform the operation. Try refreshing page or contact administrator").setHeader('').set('closable', false);;
              return err;
            }
          }
        );
      } else {
        return err;
      }
    }
  );
};





export const GetDataWithParamsWithoutHeader = (url, data) => {
  return axios(base_url + url, {
    method: "GET",
    // headers: {
    //   "content-type": "application/json", // whatever you want
    //   Authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
    // },
    params: data,
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      return err;
      // if (err.response && err.response.status === 401) {
      //   let obj = {
      //     refresh: localStorage.getItem("RefreshToken"),
      //   };
      //   return axios(base_url + "/refresh/", {
      //     method: "GET",
      //     headers: {
      //       "content-type": "application/json", // whatever you want
      //       Authorization: "Token ".concat(localStorage.getItem("RefreshToken"))
      //     },
      //     params: data,
      //   }).then(
      //     (res) => {
      //       localStorage.setItem("AccessToken", res.data["access"]);
      //       return axios(base_url + url, {
      //         method: "GET",
      //         headers: {
      //           "content-type": "application/json", // whatever you want
      //           Authorization: "Bearer ".concat(
      //             localStorage.getItem("AccessToken")
      //           ),
      //         },
      //         params: data,
      //       }).then(
      //         (res) => {
      //           return res;
      //         },
      //         (err) => {
      //           alertify.alert("Cannot perform the operation. Try refreshing page or contact administrator").setHeader('').set('closable', false);;
      //           return err;
      //         }
      //       );
      //     },
      //     (err) => {
      //       if (err.response && err.response.status === 401) {
      //         console.log(err.response.data["Error"]);
      //         localStorage.setItem("previous", window.location.hash);
      //         localStorage.removeItem("AccessToken");
      //         window.location.href = `/#/login`;
      //       } else {
      //         alertify.alert("Cannot perform the operation. Try refreshing page or contact administrator").setHeader('').set('closable', false);;
      //         return err;
      //       }
      //     }
      //   );
      // } else {
      //   return err;
      // }
    }
  );
};




export const GetDataWithoutParams = (url) => {
  return axios(base_url + url, {
    method: "GET",
    headers: {
      "content-type": "application/json", // whatever you want
      Authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
    },
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response && err.response.status === 401) {
        let obj = {
          refresh: localStorage.getItem("RefreshToken"),
        };
        return axios(base_url + "/refresh/", {
          method: "GET",
          headers: {
            "content-type": "application/json", // whatever you want
            Authorization: "Token ".concat(localStorage.getItem("RefreshToken"))
          },
          
        }).then(
          (res) => {
            localStorage.setItem("AccessToken", res.data["access"]);
            return axios(base_url + url, {
              method: "GET",
              headers: {
                "content-type": "application/json", // whatever you want
                Authorization: "Bearer ".concat(
                  localStorage.getItem("AccessToken")
                ),
              },
              
            }).then(
              (res) => {
                return res;
              },
              (err) => {
                alertify.alert("Cannot perform the operation");
                return err;
              }
            );
          },
          (err) => {
            if (err.response && err.response.status === 401) {
              console.log(err.response.data["Error"]);
              localStorage.setItem("previous", window.location.hash);
              localStorage.removeItem("AccessToken");
              window.location.href = `/#/login`;
            } else {
              alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);;
              return err;
            }
          }
        );
      } else {
        return err;
      }
    }
  );
};



export const DeleteData = (url,param) => {
  return axios(base_url + url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json", // whatever you want
      Authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
      "Access-Control-Allow-Origin": "*",
    },
    params:{id:param},
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response && err.response.status === 401) {
        let obj = {
          refresh: localStorage.getItem("RefreshToken"),
        };
        return axios(base_url + "/refresh/", {
          method: "DELETE",
          headers: {
            "content-type": "application/json", // whatever you want
            Authorization: "Token ".concat(localStorage.getItem("RefreshToken"))
          },
          params:{id:param},
        }).then(
          (res) => {
            localStorage.setItem("AccessToken", res.data["access"]);
            return axios(base_url + url, {
              method: "DELETE",
              headers: {
                "content-type": "application/json", // whatever you want
                Authorization: "Bearer ".concat(
                  localStorage.getItem("AccessToken")
                ),
              },
              params:{id:param},
            }).then(
              (res) => {
                return res;
              },
              (err) => {
                alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);;
                return err;
              }
            );
          },
          (err) => {
            if (err.response && err.response.status === 401) {
              console.log(err.response.data["Error"]);
              localStorage.setItem("previous", window.location.hash);
              localStorage.removeItem("AccessToken");
              window.location.href = `/#/login`;
            } else {
              alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);;
              return err;
            }
          }
        );
      } else {
        return err;
      }
    }
  );
};




export const DeleteDataWithParams = (url,param) => {
  return axios(base_url + url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json", // whatever you want
      Authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
      "Access-Control-Allow-Origin": "*",
    },
    params:param,
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response && err.response.status === 401) {
        let obj = {
          refresh: localStorage.getItem("RefreshToken"),
        };
        return axios(base_url + "/refresh/", {
          method: "DELETE",
          headers: {
            "content-type": "application/json", // whatever you want
            Authorization: "Token ".concat(localStorage.getItem("RefreshToken"))
          },
          params:{id:param},
        }).then(
          (res) => {
            localStorage.setItem("AccessToken", res.data["access"]);
            return axios(base_url + url, {
              method: "DELETE",
              headers: {
                "content-type": "application/json", // whatever you want
                Authorization: "Bearer ".concat(
                  localStorage.getItem("AccessToken")
                ),
              },
              params:{id:param},
            }).then(
              (res) => {
                return res;
              },
              (err) => {
                alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);;
                return err;
              }
            );
          },
          (err) => {
            if (err.response && err.response.status === 401) {
              console.log(err.response.data["Error"]);
              localStorage.setItem("previous", window.location.hash);
              localStorage.removeItem("AccessToken");
              window.location.href = `/#/login`;
            } else {
              alertify.alert("Cannot perform the operation").setHeader('').set('closable', false);;
              return err;
            }
          }
        );
      } else {
        return err;
      }
    }
  );
};