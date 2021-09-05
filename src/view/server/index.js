import React, {Component} from 'react'
import {Route, Switch, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie'

import AdminAccount from './account'
import AdminProduct from './product'

import SideBar from './components/SideBar'

import './index.scss'

class Server extends Component{
    render(){
        if(Cookie.get('role')!=='Admin'){
            alert('You need to login Admin account!')
            return(
                <Redirect to='/'/>
            )
        }
        return(
            <div className='Sever'>
                <SideBar/>
                <div className='content'>
                    <Switch>
                        <Route exact path='/admin' component={DashBoard} />
                        <Route path='/admin/accounts' component={AdminAccount} />
                        <Route path='/admin/account' component={AdminAccount} />
                        <Route path='/admin/products' component={AdminProduct} />
                        <Route path='/admin/product' component={AdminProduct} />
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
            <h1>This is DashBoard</h1>
        )
    }
}
