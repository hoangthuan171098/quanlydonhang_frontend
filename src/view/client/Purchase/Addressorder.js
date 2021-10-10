import React, { Component } from "react";
import "../style/order.scss";
export default class Addressorder extends Component {
  render() {
    return (
      <div className="container-fluid">
          <div className="container_layout">
            <div className="Account_sidebar">
                <div className="Account_avatar">
                  <div className="info">
                      
                  </div>
                </div>
                <ul className="Account_nav">
                    <li>
                      <a className="is_acitve">
                      <i class="fas fa-user"></i>
                        <span>Thông tin tài khoản</span>
                      </a>
                    </li>
                    <li>
                      <a className="is_acitve">
                      <i class="fas fa-bell"></i>
                        <span>Thông báo của tôi</span>
                      </a>
                    </li>
                    <li>
                      <a className="is_acitve">
                      <i class="fas fa-clipboard"></i>
                        <span>Quản lý đơn hàng</span>
                      </a>
                    </li>
                    <li>
                      <a className="is_acitve">
                      <i class="fas fa-map-marker-alt"></i>
                        <span>Số địa chỉ</span>
                      </a>
                    </li>
                    <li>
                      <a className="is_acitve">
                      <i class="far fa-credit-card"></i>
                        <span>Thông tin thanh toán</span>
                      </a>
                    </li>
                  </ul>
            </div>
            <div className="Account_layout">
              <h3 className="styles_Heading">
                Thông tin tài khoản
              </h3>
              <div className="Account_info">
                <form>
                  <div className="form-control">
                    <label className="input-label">Họ Tên</label>
                    <div>
                      <input type="text" name="fullName" maxLength="128" className="input-info" value="Kiếm Tiền Nuôi Em" /> 
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="input-label">Số điện thoại</label>
                    <div>
                      <input type="tel" name="phoneNumber" maxLength="128" className="input-info" value="0394007104" /> 
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="input-label">Email</label>
                    <div>
                      <input type="text" name="email" maxLength="128" className="input-info" value="ledinhdiep123456789@gmail.com" /> 
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="input-label">Công ty</label>
                    <div>
                      <input type="text" name="company" maxLength="128" className="input-info" value="ABC" /> 
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="input-label">Địa Chỉ</label>
                    <div>
                      <input type="text" name="address" maxLength="128" className="input-info" value="Kí túc xá khu A" /> 
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="input-label">&nbsp;</label>
                    <button type="submit" className="btn-submit">Cập nhật</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
