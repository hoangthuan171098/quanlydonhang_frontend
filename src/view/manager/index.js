import React, {Component} from 'react'
import {Route, Switch, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie'

import ManagerOrder from './order'
import ManagerShipment from './shipment'

import SideBar from './components/SideBar'

import './style/index.scss'
import './style/bootstrap.min.scss'
import './style/theme.scss'


class Manager extends Component{
    render(){
        if(Cookie.get('role')!=='Admin'){
            alert('You need to login Admin account!')
            return(
                <Redirect to='/'/>
            )
        }
        return(
            <div className='Manager'>
                <SideBar/>
                <div className='content'>
                    <Switch>
                        <Route exact path='/manager' component={DashBoard} />
                        <Route path='/manager/orders' component={ManagerOrder} />
                        <Route path='/manager/shipments' component={ManagerShipment} />
                    </Switch>
                </div>
            </div>
        )
    }
}

class DashBoard extends Component{
    render(){
        return(
            <div>This is dashBoard</div>
        )
    }
}

export default Manager
