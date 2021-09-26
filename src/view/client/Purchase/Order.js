import React, { Component } from "react";
import "../style/order.scss";
import {Switch,Route} from "react-router-dom";
import Account from "./Account";
import Listorder from "./Listorder";
import Nav from "./component/Nav";
import OrderlistDetail from "./OrderlistDetail";
import Cookie from "js-cookie";
export default class Order extends Component {
  render() {
    
    return (
      <div className="container-fluid">
          <div className="container_layout">
            <div className="Account_sidebar">
                <div className="Account_avatar">
                  <div className="info">
                    Tài khoản của
                    <strong>{Cookie.get('username').toUpperCase()}</strong>
                  </div>
                </div>
                <Nav />
            </div>

              <Switch>
                    {/* <Route exact path='/purchase/order' component={Ordermaga} /> */}
                    <Route path='/purchase/user/:id' component={Account} />
                    <Route path='/purchase' exact component={Listorder} />
                    <Route path='/purchase/:id' component={OrderlistDetail} />
               </Switch> 
          </div>
      </div>
    );
  }
}
