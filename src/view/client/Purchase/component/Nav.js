import React, { Component } from "react";
import { NavLink,Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    let {id} = this.props;
    
    return (
      <>
        <NavLink to={`/purchase/${id}`} className="tab-item " activeClassName="active" exact={true}>
         
          Tất cả
        </NavLink>
        <NavLink to={`/purchase/${id}/checking`} className="tab-item" activeClassName="active">
          
          Chờ xác nhận
        </NavLink>
        <NavLink  to={`/purchase/${id}/confirmed`} className="tab-item" activeClassName="active">
          
          Chờ lấy hàng
        </NavLink>
        <NavLink to={`/purchase/${id}/delivering`} className="tab-item" activeClassName="active">
         
          Đang giao
        </NavLink>
        <NavLink to={`/purchase/${id}/delivered`} className="tab-item" activeClassName="active">
          
          Đã giao
        </NavLink>
        <NavLink to={`/purchase/${id}/cancelled`} className="tab-item" activeClassName="active">
          
          Đã Hủy
        </NavLink>
      </>
    );
  }
}
