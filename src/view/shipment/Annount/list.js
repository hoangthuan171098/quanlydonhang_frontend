import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import Status from "./../components/status";

class AnnountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      filter: {},
      shipments: [],
    };
  }

  async componentDidMount() {
    await axios
      .get(process.env.REACT_APP_BACKEND_URL + "/shipments", {
        headers: {
          Authorization: "bearer " + Cookie.get("token"),
        },
      })
      .then((res) => {
        this.setState({ shipments: res.data });
      })
      .catch((err) => {
        console.log("Cannot connect to server");
      });
    this.setState({ loading: false });
  }

  infoClick = (id) => {
    this.props.history.push("/shipment/annount-item/" + id);
  };
  Clickall = async () => {
    var shipments = this.state.shipments;
    shipments.map((shipment, index) => {
      if (shipment.shipper.id === Cookie.get("id")) {
        shipment.status = "delivering";
        axios
          .put(
            process.env.REACT_APP_BACKEND_URL + "/shipments/" + shipment.id,
            {
              status: "delivering",
            },
            {
              headers: {
                Authorization: "bearer " + Cookie.get("token"),
              },
            }
          )
          .then(async (res) => {
            let status;
            if (shipment.theLast) {
              status = "delivering";
              shipment.status = "delivering";
            } else {
              status = "partial delivering";
              shipment.status = "partial delivering";
            }
            await axios
              .put(
                process.env.REACT_APP_BACKEND_URL +
                  "/orders/" +
                  shipment.orderID,
                {
                  status: status,
                },
                {
                  headers: {
                    Authorization: "bearer " + Cookie.get("token"),
                  },
                }
              )
              .then((res) => {
                
                this.props.history.push("/shipment/annount-list");
              })
              .catch((err) => {
                alert("An error occurred, please check again.");
                console.log("An error occurred:", err.response);
              });
          })
          .catch((err) => {
            alert("An error occurred, please check again.");
            console.log("An error occurred:", err.response);
          });
      }
    });
    alert("deliver product  success!");
    this.setState({ shipment: shipments });
  };
  render() {
    let check = false;
    return (
      <div className="ShipmentManager">
        <div className="module">
          <div className="module-head">
            <h2>Shipments</h2>
          </div>
          <div className="module-option">
            <select
              onChange={(e) =>
                this.setState({
                  filter: { ...this.state.filter, status: e.target.value },
                })
              }
            >
              <option value="all">All</option>
              <option value="waiting to deliver">Waiting to deliver</option>
              <option value="delivering">Delivering</option>
              <option value="delivered">Delivered</option>
              <option value="cancled">Cancled</option>
            </select>
          </div>
          <div className="module-body">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Buyer</th>
                  <th>Status</th>
                  <th>Address</th>
                  <th>productList</th>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {this.state.shipments.map((shipment, index) => {
                  if (shipment.shipper.id === Cookie.get("id")) {
                    return (
                      <tr key={index}>
                        <td onClick={() => this.infoClick(shipment.id)}>
                          {shipment.id}
                        </td>
                        <td onClick={() => this.infoClick(shipment.id)}>
                          {shipment.buyer.username}
                        </td>
                        <td onClick={() => this.infoClick(shipment.id)}>
                          <Status status={shipment.status} />
                        </td>
                        <td onClick={() => this.infoClick(shipment.id)}>
                          {shipment.address}
                        </td>
                        <td onClick={() => this.infoClick(shipment.id)}>
                          {shipment.productList.map((item, index) => {
                            if (index === 2) return <p key={index}>...</p>;
                            if (index === 3) return <></>;
                            return (
                              <p key={index}>
                                {item.product.name + ": "}
                                {item.quantity_m
                                  ? item.quantity
                                    ? item.quantity_m +
                                      " x m," +
                                      item.quantity +
                                      " x cuộn"
                                    : item.quantity_m + " x m"
                                  : item.quantity + " x cuộn"}
                              </p>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>

            <button className="btn btn-success" onClick={this.Clickall}>
              Deliver
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AnnountList;
