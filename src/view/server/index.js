import React, {Component} from 'react'
import {Route, Switch, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie'

import AdminAccount from './account'
import AdminProduct from './product'
import AdminOrder from './order'

import SideBar from './components/SideBar'

import './style/index.scss'
import './style/bootstrap.min.scss'
import './style/theme.scss'

class Server extends Component{
    render(){
        if(Cookie.get('role')!=='Admin'){
            alert('You need to login Admin account!')
            return(
                <Redirect to='/'/>
            )
        }
        return(
            <div className='Server'>
                <SideBar/>
                <div className='content'>
                    <Switch>
                        <Route exact path='/admin' component={DashBoard} />
                        <Route path='/admin/accounts' component={AdminAccount} />
                        <Route path='/admin/products' component={AdminProduct} />
                        <Route path='/admin/orders' component={AdminOrder} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Server

class DashBoard extends Component{
    render(){
        return(
            <div>
                <div className="footer">
                    <div className="container">
                        

                        <b className="copyright">&copy; 2014 Edmin - EGrappler.com </b> All rights reserved.
                    </div>
                </div>
            </div>
        )
    }
}
