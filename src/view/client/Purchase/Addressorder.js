import React, { Component } from "react";
import "../style/order.scss";
export default class Addressorder extends Component {

  render() {
    var Background ="https://cf.shopee.vn/file/059dfcece821ff6afb80ef012dfa2447"
    return (
      <div className="container-fluid">
        <div className="container_layout">
          <div className="Account_sidebar">
            <div className="Account_avatar">
              <div className="info"></div>
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
            <h3 className="styles_Heading">Thêm Mật Khẩu
            <p>
Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
</p></h3>
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
                      value="Kiếm Tiền Nuôi Em"
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="input-label">Xác Nhận Mật Khẩu</label>
                  <div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      maxLength="128"
                      className="input-info"
                      value="0394007104"
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="input-label"></label>
                  <div>
                    <input style={{width:350 + 'px',borderTopRightRadius:'none',borderBottomRightRadius:'none'}}
                      type="text"
                      name="email"
                      maxLength="128"
                      className="input-info" 
                      value="ledinhdiep123456789@gmail.com"
                    />
                    <button className="check">Mã Xác Minh</button>
                  </div>
                </div>
              
                

                <div className="form-control">
                  <label className="input-label">&nbsp;</label>
                  <button type="submit" className="btn-submit">
                    Xác nhận
                  </button>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
