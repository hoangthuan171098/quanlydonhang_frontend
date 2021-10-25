import React, { Component } from "react";
import "./../style/payment.scss";
import Cookie from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import {withRouter} from "react-router"
class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        wards :"",
        street: ""
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
    let response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/orders",
      {
        headers: {
          Authorization: "bearer " + Cookie.get("token"),
        },
      }
    );
    if (!response.ok) {
      return;
    }
    let orders = await response.json();
    this.setState({
      orders: orders,
    });
    return;
  }
  checkOutClick = () => {
    if(this.state.status_payment===""){
      alert("vui long chon phuong thuc thanh toan")
      return
    }
    var tempParams = {
      to_email: this.state.user.email,
      from_name: "SSS+ Shop",
      to_name:`${this.state.info.firstName} ${this.state.info.lastName}`,
      to_address : `${this.state.info.street},${this.state.info.wards},${this.state.info.district},${this.state.info.region}`,
      list_product : `
        ${this.state.productList.map((product)=>{
          return(
            `
            ${product.quantity} Cuộn x ${product.quantity_m} Mét - ${product.product.name} - Màu ${product.color}
            
            ` 
          )
        })}
      `
    };
    emailjs
      .send("service_usji67r", "template_fl6j2tu", tempParams,'user_P4FiW8xW41BqwLDdM7RSb')
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    
    axios
        .post(process.env.REACT_APP_BACKEND_URL + '/transections',{
          total: 2000,
          status:this.state.status_payment,
          address: `${this.state.info.street},${this.state.info.wards},${this.state.info.district},${this.state.info.region}`,
          buyer : Cookie.get("id"),
          note:this.state.note,
          order : this.state.orders[this.state.orders.length - 1].id
        },{
          headers:{
            'Authorization':'bearer '+ Cookie.get('token'),
          }
        })
        .then(response =>{
          alert('Da dat hang thanh cong');
          Cookie.remove('cart');
          this.props.history.push('/purchase');
          window.location.href="/purchase"
        })
        .catch(err => {
        })
  };
  render() {
    var total = 0;
    this.state.productList.map((item) => {
      total += parseInt(item.product.price) * item.quantity;
    });

    return (
      <div className="Payment">
        <div className="content-left">
          <div className="section">
            <h3 className="title">Chọn hình thức thanh toán</h3>
            <div className="payment-method">
              <ul className="list">
                <li className="method">
                  <label className="style-radio">
                    <input
                      type="radio"
                      data-view-id="checkout.payment_method_select"
                      data-view-index="cod"
                      
                      name="payment-methods"
                      value="cod"
                      onClick={() =>
                        this.setState({ status_payment: "unpaid" })
                      }
                    />
                    <span className="radio-fake"></span>
                    <span className="label">
                      <div className="method-label">
                        <img
                          className="method-icon"
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"
                          alt=""
                        />
                        <div className="method-content">
                          <div className="method-name">
                            <span>Thanh toán tiền mặt khi nhận hàng</span>
                          </div>
                        </div>
                      </div>
                    </span>
                  </label>
                </li>

                <li className="method">
                  <label className="style-radio">
                    <input
                      type="radio"
                      data-view-id="checkout.payment_method_select"
                      data-view-index="cod"
                    
                      name="payment-methods"
                      value="cod"
                      onClick={() => this.setState({ status_payment: "paid" })}
                    />
                    <span className="radio-fake"></span>
                    <span className="label">
                      <div className="method-label">
                        <img
                          className="method-icon"
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-mo-mo.svg"
                          alt=""
                        />
                        <div className="method-content">
                          <div className="method-name">
                            <span>Thanh toán bằng ví MoMo</span>
                          </div>
                        </div>
                      </div>
                    </span>
                  </label>
                </li>

                <li className="method">
                  <label className="style-radio">
                    <input
                      type="radio"
                      data-view-id="checkout.payment_method_select"
                      data-view-index="cod"
                      
                      name="payment-methods"
                      value="cod"
                      onClick={() => this.setState({ status_payment: "paid" })}
                    />
                    <span className="radio-fake"></span>
                    <span className="label">
                      <div className="method-label">
                        <img
                          className="method-icon"
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-zalo-pay.svg"
                          alt=""
                        />
                        <div className="method-content">
                          <div className="method-name">
                            <span>Thanh toán bằng ZaloPay</span>
                          </div>
                        </div>
                      </div>
                    </span>
                  </label>
                </li>

                <li className="method">
                  <label className="style-radio">
                    <input
                      type="radio"
                      data-view-id="checkout.payment_method_select"
                      data-view-index="cod"
                    
                      name="payment-methods"
                      value="cod"
                      onClick={() => this.setState({ status_payment: "paid" })}
                    />
                    <span className="radio-fake"></span>
                    <span className="label">
                      <div className="method-label">
                        <img
                          className="method-icon"
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-atm.svg"
                          alt=""
                        />
                        <div className="method-content">
                          <div className="method-name">
                            <span>Thanh toán ATM</span>
                          </div>
                        </div>
                      </div>
                    </span>
                  </label>
                </li>

                <li className="method">
                  <label className="style-radio">
                    <input
                      type="radio"
                      data-view-id="checkout.payment_method_select"
                      data-view-index="cod"
                     
                      name="payment-methods"
                      value="cod"
                      onClick={(e) => this.setState({ status_payment: "debt" })}
                    />
                    <span className="radio-fake"></span>
                    <span className="label">
                      <div className="method-label">
                        <img
                          className="method-icon"
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-credit.svg"
                          alt=""
                        />
                        <div className="method-content">
                          <div className="method-name">
                            <span>Nợ</span>
                          </div>
                        </div>
                      </div>
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div className="order-button">
            <button
              data-view-id="checkout.confirmation_navigation_proceed"
              className="btn"
              onClick={this.checkOutClick}
            >
              ĐẶT MUA
            </button>
          </div>
        </div>
        <div className="content-right">
          <div className="shipping-address">
            <div className="title">
              <span>Địa chỉ giao hàng</span>
              <Link to="/location"
                data-view-id="checkout.confirmation_shipping_location.change"
                
              >
                Sửa
              </Link>
            </div>
            <div className="address">
              <span className="name">{`${this.state.info.firstName}  ${this.state.info.lastName}`}</span>
              <span className="street">
                {" "}
                {`${this.state.info.street},${this.state.info.wards},${this.state.info.district},${this.state.info.region}`}
              </span>
              <span className="phone">
                Điện thoại: {this.state.info.phoneNumber}
              </span>
              <span className="phone">Công ty: {this.state.info.firm}</span>
            </div>
          </div>

          <div className="order-summary">
            <div className="title">
              <div className="sub-title">
                <b>Đơn hàng</b>
                <p>{this.state.productList.length} Sản phẩm</p>
              </div>
              <Link to="shopping-cart"
                data-view-id="checkout.confirmation_shipping_location.change"
               
              >
                Sửa
              </Link>
            </div>
            <div className="cart">
              <div className="price-sumary">
                <div className="price-info">
                  <div className="inner">
                    <div className="name ">Tạm tính</div>
                    <div className="value ">{total}$</div>
                  </div>
                </div>

                <div className="total">
                  <div class="name">Thành tiền:</div>
                  <div className="value">{total} $</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Payment)
