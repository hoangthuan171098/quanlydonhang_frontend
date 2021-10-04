import React, { Component } from 'react'
import './../style/payment.scss'
export default class Payment extends Component {
    render() {
        return (
            <div className="Payment">
                
                    <div className="content-left">
                        <div className="section">
                            <h3 className="title">Chọn hình thức thanh toán</h3>
                            <div className="payment-method">
                                <ul className="list"> 
                                    <li className="method">
                                        <label className="style-radio">
                                           <input type="radio" 
                                                data-view-id="checkout.payment_method_select"
                                                data-view-index="cod" 
                                                readonly="" 
                                                name="payment-methods"
                                                value="cod" />
                                            <span className="radio-fake"></span>
                                            <span className="label">
                                                <div className="method-label">
                                                    <img className="method-icon" src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg" alt=""/>
                                                    <div className="method-content">
                                                        <div className="method-name">
                                                            <span>
                                                                Thanh toán tiền mặt khi nhận hàng
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span>
                                        </label>
                                    </li>

                                    <li className="method">
                                        <label className="style-radio">
                                           <input type="radio" 
                                                data-view-id="checkout.payment_method_select"
                                                data-view-index="cod" 
                                                readonly="" 
                                                name="payment-methods"
                                                value="cod" />
                                            <span className="radio-fake"></span>
                                            <span className="label">
                                                <div className="method-label">
                                                    <img className="method-icon" src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-mo-mo.svg" alt=""/>
                                                    <div className="method-content">
                                                        <div className="method-name">
                                                            <span>
                                                                Thanh toán bằng ví MoMo
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span>
                                        </label>
                                    </li>

                                    <li className="method">
                                        <label className="style-radio">
                                           <input type="radio" 
                                                data-view-id="checkout.payment_method_select"
                                                data-view-index="cod" 
                                                readonly="" 
                                                name="payment-methods"
                                                value="cod" />
                                            <span className="radio-fake"></span>
                                            <span className="label">
                                                <div className="method-label">
                                                    <img className="method-icon" src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-zalo-pay.svg" alt=""/>
                                                    <div className="method-content">
                                                        <div className="method-name">
                                                            <span>
                                                                Thanh toán bằng ZaloPay
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span>
                                        </label>
                                    </li>

                                    <li className="method">
                                        <label className="style-radio">
                                           <input type="radio" 
                                                data-view-id="checkout.payment_method_select"
                                                data-view-index="cod" 
                                                readonly="" 
                                                name="payment-methods"
                                                value="cod" />
                                            <span className="radio-fake"></span>
                                            <span className="label">
                                                <div className="method-label">
                                                    <img className="method-icon" src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-atm.svg" alt=""/>
                                                    <div className="method-content">
                                                        <div className="method-name">
                                                            <span>
                                                                Thanh toán ATM 
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span>
                                        </label>
                                    </li>

                                    

                                    <li className="method">
                                        <label className="style-radio">
                                           <input type="radio" 
                                                data-view-id="checkout.payment_method_select"
                                                data-view-index="cod" 
                                                readonly="" 
                                                name="payment-methods"
                                                value="cod" />
                                            <span className="radio-fake"></span>
                                            <span className="label">
                                                <div className="method-label">
                                                    <img className="method-icon" src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-credit.svg" alt=""/>
                                                    <div className="method-content">
                                                        <div className="method-name">
                                                            <span>
                                                                Nợ 
                                                            </span>
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
                            <button data-view-id="checkout.confirmation_navigation_proceed" class="btn">ĐẶT MUA</button>
                        </div>
                    </div>
                    <div className="content-right">
                        <div className="shipping-address">
                            <div className="title">
                                <span>Địa chỉ giao hàng</span>
                                <a data-view-id="checkout.confirmation_shipping_location.change" href="/checkout/shipping">Sửa</a>
                            </div>
                            <div className="address">
                                <span className="name">Điệp</span>
                                <span class="street">ấp 1, Xã Minh Hưng, Huyện Bù Đăng, Bình Phước Việt Nam</span>
                                <span className="phone">
                                    Điện thoại: 0394007104
                                </span>
                            </div>
                        </div>

                        <div className="order-summary">
                            <div className="title">
                                <div className="sub-title">
                                    <b>Đơn hàng</b>
                                    <p>1 Sản phẩm</p>
                                </div>
                                <a data-view-id="checkout.confirmation_shipping_location.change" href="/checkout/shipping">Sửa</a>
                            </div>
                            <div className="cart">
                                <div className="price-sumary">
                                    <div className="price-info">
                                        <div className="inner">
                                            <div class="name ">Tạm tính</div>
                                            <div class="value ">4.000đ</div>
                                        </div>
                                    </div>
                                    
                                    <div className="total">
                                        <div class="name">Thành tiền:</div>
                                        <div className="value">
                                            48.000 ₫
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
        )
    }
}
