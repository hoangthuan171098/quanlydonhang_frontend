import React, { Component } from "react"
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
                        <Link to="#">
                            <i class="menu-icon icon-bullhorn"></i>
                            Announts
                        </Link>  
                    </li>
                    <li>
                        <Link to="/shipment/list-shipments-orders">
                            <i class="menu-icon icon-inbox"></i>
                            Shipments
                        </Link>
                    </li>
                    
                    
                </ul>  

                
            </div>
        );
    }
}

export default withRouter(SideBar)
