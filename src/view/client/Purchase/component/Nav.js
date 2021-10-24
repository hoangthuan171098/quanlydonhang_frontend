import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
export default class Nav extends Component {
  render() {
    return ( 
      <ul className="Account_nav">
          <li>
          <Link to={"/purchase/profile"} className="is_acitve" activeClassName="is_active" exact={true}>
            <i class="fas fa-user"></i>
            <span>Thông tin tài khoản</span>
          </Link>
        </li>
        <li>
          <Link to='/purchase' className="is_acitve"  > 
            <i class="fas fa-clipboard"></i>
            <span>Quản lý đơn hàng</span>
          </Link>
        </li>
        <li>
          <Link to='/purchase/loca'  className="is_acitve"  >
            <i class="fas fa-map-marker-alt"></i>
            <span>Số địa chỉ</span>
          </Link>
        </li>
        <li>
          <Link to='/purchase/paymentinfo' className="is_acitve"  >
            <i class="far fa-credit-card"></i>
            <span>Thông tin thanh toán</span>
          </Link>
        </li>
      </ul>
    );
  }
}