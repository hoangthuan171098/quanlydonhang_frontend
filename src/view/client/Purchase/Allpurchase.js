import React, { Component } from "react";
import Cookie from "js-cookie";
import "../style/purchase.scss";
import axios from "axios";

export default class Allpurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticate: true,
      note: "",
      orders: [],
    };
  }
  async componentDidMount() {
    if (Cookie.get("role")) {
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
        loading: false,
        authenticate: true,
        orders: orders,
      });
      return;
    }
    this.setState({ authenticate: false });
  }
  
  render() {
    return (
      <div className="d-flex justify-content-center row">
          {this.state.orders.map((order, index) => {
            
            if(order.id ===this.props.match.params.id){
              return (
              <div className="col-md-10" key={index}>
              
                {order.productList.map((item, index) => {
                  return (
                    <div className="row p-2 bg-white border rounded" key={index}>
                      <div className="col-md-3 mt-1">
                        <img
                          className="img-fluid img-responsive rounded product-image"
                          src={process.env.REACT_APP_BACKEND_URL + item.product.image.url}
                          alt=""
                        />
                      </div>
                      <div className="col-md-6 mt-1">
                        <h5>{item.product.name}</h5>
                        <div className="d-flex flex-row">Category : Kaki</div>
                        <div className="d-flex flex-row">Số cuộn : {item.quantity}</div>
                        <div className="d-flex flex-row">Số Mét : {item.quantity_m}</div>
                        <div className="mt-1 mb-1 spec-1">
                          <span>Màu: </span>
                          <span className="dot" />
                          <span>{item.color}</span>
                        </div>
                      </div>
                      <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                        <div className="d-flex flex-row align-items-center">
                          <h4 className="mr-1">{item.product.price}</h4>
                          <span style={{marginLeft:80+'px'}} className="strike-text">{item.status}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
             
              </div>
            );
            }
            
          })}
        
      </div>
    );
  }
}
