import { Component } from "react";
import { Link } from "react-router-dom";

export default class SideBar extends Component{
    render(){
        return(
            <div className="SideBar">
                <div className="Group-name">
                    <Link to='/admin'>DashBoard</Link>
                </div>
                <div className="Group-name">
                    Data manager
                </div>
                <div className="Group-items">
                    <Link to='/admin/accounts'>Accounts</Link>
                    <Link to='/admin/products'>Products</Link>
                </div>
            </div>
        );
    }
}