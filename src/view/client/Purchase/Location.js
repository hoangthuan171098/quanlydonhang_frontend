import React, { Component } from "react";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import "../style/order.scss";
export default class Location extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          firstname_error : "",
          lastname_error : "",
          firm_error: "",
          phone_error:"",
          address_error: "",
          loading: true,
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
            wards :"",
            street: ""
          },
          images: [],
          authenticate: true,
        };
    
      }
      async componentDidMount() {
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
        let data2 = await response2.json();
        this.setState({ loading: false, authenticate: true, user: data1[0] });
        if (data2.length !== 0) {
          this.setState({ info: data2[0] });
        }
        if (!this.state.user.avatar) {
          this.setState({
            displayAddAvatar: "block",
            displayChangeAvatar: "none",
            imgURL: "/uploads/avatar-default.jpg",
          });
        } else {
          this.setState({
            displayAddAvatar: "none",
            displayChangeAvatar: "block",
            imgURL: this.state.user.avatar.url,
          });
        }
      }
  render() {
    
    return (
      <div className="Account_layout">
            <div className="address">
                <div className="heading">Sổ địa chỉ</div>
                <div className="inner">
                    {/* <div className="new">
                        <a href="">
                            <i class="fas fa-plus"></i>
                            <span>Thêm địa chỉ mới</span>
                        </a>
                    </div> */}
                    <div className="item">
                        <div className="info">
                            <div className="name">
                            {`${this.state.info.firstName}  ${this.state.info.lastName}`}
                                <span>Địa chỉ mặc định</span>
                            </div>
                            <div className="address">
                                <span>Địa chỉ: </span>{`${this.state.info.street},${this.state.info.wards},${this.state.info.district},${this.state.info.region}`}
                            </div>
                            <div className="address">
                                <span>Công ty: </span>{this.state.info.firm}
                            </div>
                            <div className="phone">
                                <span>Điện thoại: </span>{this.state.info.phoneNumber}
                            </div>
                        </div>
                        <div className="action">
                            <Link to={`/purchase/user/${Cookie.get('id')}`} className="edit" href="/customer/address/edit/21201996">Chỉnh sửa</Link>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
  }
}
