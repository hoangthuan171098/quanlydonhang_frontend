import React, { Component } from 'react'
import './style/shippingaddress.scss'
export default class Shippingaddress extends Component {
    render() {
        return (
            <div className="Shipping_address">
                <div className="container-fluid">
                    <div className="address_list">
                        <h3 className="title">Địa chỉ giao hàng</h3>
                    </div>
                    <div className="address_form">
                        <div className="form-container">
                            <div className="formItem">
                                <label>Họ tên</label>
                                <input type="text" name="full_name" placeholder="Nhập họ tên"
                                    maxLength="50" className="input_form" value="Điệp Lê" />
                            </div>
                            <div className="formItem">
                                <label>Điện thoại di động</label>
                                <input type="text" name="telephone" placeholder="Nhập số điện thoại"
                                    maxLength="50" className="input_form" value="0394007104" />
                            </div>
                            <div className="formItem">
                                <label>Địa chỉ</label>
                                <textarea type="textarea" name="location" placeholder="ki tuc xa khu a"
                                    maxLength="50" className="input_area" value="Điệp Lê" />
                            </div>
                            <div className="formItem">
                                <label></label>
                                <div className="button-group">
                                    <button className="cancel">Hủy bỏ</button>
                                    <button className="create-update">Giao đến địa chỉ này</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
