import React, { Component } from "react"
import reactDom from "react-dom"
import { Link } from "react-router-dom"
import { withRouter } from "react-router"

class SideBar extends Component{

    render(){
        return(
            <div className="SideBar">
                <ul className="widget widget-menu unstyled">
                    <li className="active">
                        <Link to='/admin'>
                            <i className="menu-icon icon-dashboard"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/accounts">
                            <i class="menu-icon icon-bullhorn"></i>
                            Accounts
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products">
                            <i class="menu-icon icon-inbox"></i>
                            Products
                        </Link>
                    </li>
                    
                    <li>
                        <Link to="/admin/orders">
                            <i class="menu-icon icon-tasks"></i>
                            Orders
                        </Link>
                    </li>
                </ul>

                <ul class="widget widget-menu unstyled">
                        <li><Link to="/manager/orders"><i class="menu-icon icon-tasks"></i> Orders </Link></li>
                        <li><Link to="/manager/shipments"><i class="menu-icon icon-tasks"></i> Shipments </Link></li>
                        <li><Link to="#"><i class="menu-icon icon-tasks"></i> More </Link></li>
                        <li><Link to="#"><i class="menu-icon icon-tasks"></i> More </Link></li>
                        <li><Link to="#"><i class="menu-icon icon-tasks"></i> More </Link></li>
                    </ul>

                <ul class="widget widget-menu unstyled">
                    <li>
                        <a class="collapsed" data-toggle="collapse" href="#togglePages">
                            <i class="menu-icon icon-cog"></i>
                            <i class="icon-chevron-down pull-right"></i><i class="icon-chevron-up pull-right"></i>
                            More Pages
                        </a>
                        <ul id="togglePages" class="collapse unstyled">
                            <li>
                                <a href="other-login.html">
                                    <i class="icon-inbox"></i>
                                    Login
                                </a>
                            </li>
                            <li>
                                <a href="other-user-profile.html">
                                    <i class="icon-inbox"></i>
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a href="other-user-listing.html">
                                    <i class="icon-inbox"></i>
                                    All Users
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(SideBar)
