import React, { Component } from "react";
import reactDom from "react-dom";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class SideBar extends Component{
    constructor(props){
        super(props)

        this.accountRef= React.createRef();
        this.productRef= React.createRef();
        this.dashboardRef = React.createRef();

        this.state={
            change : false
        }
    }

    componentDidMount(){
        let path = this.props.history.location.pathname.split('/')[2]
        switch(path){
            case 'accounts': case 'account':
                reactDom.findDOMNode(this.accountRef.current).classList.toggle('active-admin-sideBar')
                break
            case 'products': case 'product':
                reactDom.findDOMNode(this.productRef.current).classList.toggle('active-admin-sideBar')
                break
            default: return
        }
    }

    changePathHandle = (e,pathto) =>{
        // e.preventDefault();
        let path = this.props.history.location.pathname.split('/')[2]
        switch(path){
            case 'accounts': case 'account':
                reactDom.findDOMNode(this.accountRef.current).classList.toggle('active-admin-sideBar')
                this.redirectPage(pathto)
                break
            case 'products': case 'product':
                reactDom.findDOMNode(this.productRef.current).classList.toggle('active-admin-sideBar')
                this.redirectPage(pathto)
                break
            case pathto:
                return
            default:
                this.redirectPage(pathto)
                return
        }
    }

    redirectPage = (pathto) =>{
        switch(pathto){
            case 'accounts':
                reactDom.findDOMNode(this.accountRef.current).classList.toggle('active-admin-sideBar')
                break
            case 'products':
                reactDom.findDOMNode(this.productRef.current).classList.toggle('active-admin-sideBar')
                break
            default: return
        }
    }

    render(){
        return(
            <div className="SideBar">
                <div className="Group-name">
                    <Link ref={this.dashboardRef} onClick={(e)=>this.changePathHandle(e,'')} to='/admin'>DashBoard</Link>
                </div>
                <div className="Group-name">
                    Data manager
                </div>
                <div className="Group-items">
                    <Link ref={this.accountRef} onClick={(e)=>this.changePathHandle(e,'accounts')} to='/admin/accounts'>Accounts</Link>
                    <Link ref={this.productRef} onClick={(e)=>this.changePathHandle(e,'products')} to='/admin/products'>Products</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(SideBar)
