import React, { Component } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
class ShopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      total: 0,
      orders: [],
      newquanity: 0,
    };
  }
  async componentDidMount() {
    if (Cookie.get("role") === "Public") {
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

      this.setState({ loading: false, authenticate: true, orders: orders });
      return;
    }
    this.setState({ authenticate: false });
  }
  showtotal() {
    var { orders } = this.state;
    var total = 0;
    orders.map((order, index) => {
      const user = Object.values(order.buyer);
      if (user[2] === Cookie.get("id")) {
        total +=
          order.productList[0].product.price * order.productList[0].quantity;
      }
    });

    return total;
  }
  hanleQuantity = (e) => {
    var { orders } = this.state;

    this.setState({});
  };
  render() {
    const clickdestroy = (id) => {
      axios
        .delete(process.env.REACT_APP_BACKEND_URL + "/orders/" + id, {
          headers: {
            Authorization: "bearer " + Cookie.get("token"),
          },
        })
        .then((response) => {
          alert("Destroy success.");
          window.location.href = "/shoppingcart";
        })
        .catch((error) => {
          alert("Update failed !!!");
          console.log("An error occurred:", error.response);
        });
    };
    return (
      <div className="container">
        <div className="inner-header">
          <div className="row">
            <div className="col-lg-2 col-md-2">
              <div className="logo">
                <a href="./index.html">
                  <img src="img/logo.png" alt="" />
                </a>
              </div>
            </div>
            <div className="col-lg-7 col-md-7">
              <div className="advanced-search">
                <button type="button" className="category-btn">
                  All Categories
                </button>
                <div className="input-group">
                  <input type="text" placeholder="What do you need?" />
                  <button type="button">
                    <i className="ti-search" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-3 text-right col-md-3">
              <ul className="nav-right">
                <li className="heart-icon">
                  <a>
                    <i className="icon_heart_alt" />
                    <span>1</span>
                  </a>
                </li>
                <li className="cart-icon">
                  <a>
                    <i className="icon_bag_alt" />
                    <span>{this.state.orders.length -1}</span>
                  </a>
                  <div className="cart-hover">
                    <div className="select-items">
                      <table>
                        <tbody>
                          {this.state.orders.map((order, index) => {
                            const user = Object.values(order.buyer);
                            if (user[2] === Cookie.get("id")) {
                              return (
                                <tr>
                                  <td className="si-pic">
                                    <img
                                      src={
                                    process.env.REACT_APP_BACKEND_URL +
                                    order.productList[0].product.image
                                  }
                                      alt=""
                                    />
                                  </td>
                                  <td className="si-text">
                                    <div className="product-selected">
                                      <p>{order.productList[0].product.price} x {order.productList[0].quantity}</p>
                                      <h6>{order.productList[0].product.name}</h6>
                                    </div>
                                  </td>
                                  <td className="si-close">
                                    <i className="ti-close"  onClick={() => clickdestroy(order.id)} />
                                  </td>
                                </tr>
                              );
                            }
                          })}

                          
                        </tbody>
                      </table>
                    </div>
                    <div className="select-total">
                      <span>total:</span>
                      <h5>{this.showtotal()}</h5>
                    </div>
                    <div className="select-button">
                      <Link to="/shops" className="primary-btn view-card">VIEW CARD</Link>
                      <a className="primary-btn checkout-btn">CHECK OUT</a>
                    </div>
                  </div>
                </li>
                <li className="cart-price">$150.00</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopBar;