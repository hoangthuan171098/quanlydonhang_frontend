import React, { Component } from "react";
import emailjs from "emailjs-com";
import Cookie from "js-cookie";
import axios from "axios";
export default class ChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      random:0,
      newpassword: "",
      comfirmpass: "",
      verification: "",
      loading: true,
      status_payment: "",
      total: 0,
      note: "",
      orders: [],
      productList: [],
      info: {
        id: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        firm: "",
        address: "",
        gender: 1,
        dateOfBirth: "",
        region: "",
        district: "",
        wards: "",
        street: "",
      },
      images: [],
      authenticate: true,
    };
  }
  async componentDidMount() {
    let itemListString = Cookie.get("cart");

    if (typeof itemListString === "string" && itemListString !== undefined) {
      let itemList = JSON.parse(itemListString);
      this.setState({ productList: itemList });
    }

    let response1 = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/users?username=" +
        Cookie.get("username"),
      {
        headers: {
          Authorization: "bearer " + Cookie.get("token"),
        },
      }
    );
    let response2 = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/customer-infos?customerId=" +
        Cookie.get("id"),
      {
        headers: {
          Authorization: "bearer " + Cookie.get("token"),
        },
      }
    );
    if (!response1.ok && !response2.ok) {
      console.log("Cannot connect to sever!");
      return;
    }
    let data1 = await response1.json();
   
    this.setState({ loading: false, authenticate: true, user: data1[0] });
    
    let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/orders", {
      headers: {
        Authorization: "bearer " + Cookie.get("token"),
      },
    });
    if (!response.ok) {
      return;
    }
    let orders = await response.json();
    this.setState({
      orders: orders,
    });
    return;
  }
  ClickChange = () => {
    console.log(this.state.random);
    console.log(this.state.verification);
    if (this.state.newpassword !== this.state.confirmpass) {
      alert("Xác nhận mật khẩu không chính xác.Xin vui lòng nhập lại!");
      return;
    }

    // if (this.state.verification !== this.state.random) {
    //   alert("Mã xác minh không chính xác!");    
    //   return;
    // }

    axios
    .put(process.env.REACT_APP_BACKEND_URL + '/users/' + Cookie.get('id'), {
        password : this.state.newpassword
    },{
        headers: {
        'Authorization':'bearer '+ Cookie.get('token')
        }
    })
    .then(response => {
        alert('update profile success.');
        this.props.history.push("/purchase/profile");
    })
    .catch(error => {
        alert('Update failed !!!');
        console.log('An error occurred:', error.response);
    });
   
  };
  SendCode = () => {
    var min =100000
    var max =999999 
    var rand = min + Math.floor(Math.random() * (max - min))
    this.setState({random:rand})
    console.log(this.state.random);
    var tempParams = {
        to_email: this.state.user.email,
        from_name: "SSS+ Shop",
        rand : rand
    }  
      emailjs
        .send("service_usji67r", "template_x8bt64q", tempParams,'user_P4FiW8xW41BqwLDdM7RSb')
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
            alert("fail")
          }
        );
  };
  render() {
    return (
      <div className="Account_layout">
        <h3 className="styles_Heading">
          Thêm Mật Khẩu
          <p>
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
          </p>
        </h3>
        <div className="Account_info">
          <form>
            <div className="form-control">
              <label className="input-label">Mật khẩu mới</label>
              <div>
                <input
                  type="text"
                  name="fullName"
                  maxLength="128"
                  className="input-info"
                  onChange={(e) =>
                    this.setState({ newpassword: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="input-label">Xác Nhận Mật Khẩu</label>
              <div>
                <input
                  type="text"
                  name="phoneNumber"
                  maxLength="128"
                  className="input-info"
                  onChange={(e) =>
                    this.setState({ confirmpass: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="input-label"></label>
              <div>
                <input
                  style={{
                    width: 350 + "px",
                    borderTopRightRadius: "none",
                    borderBottomRightRadius: "none",
                  }}
                  type="text"
                  name="email"
                  maxLength="128"
                  className="input-info"
                  onChange={(e) =>
                    this.setState({ verification: e.target.value })
                  }
                />
                <button type="button" className="check" onClick={this.SendCode}>
                  Mã Xác Minh
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="input-label">&nbsp;</label>
              <button
                type="button"
                className="btn-submit"
                onClick={this.ClickChange}
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
