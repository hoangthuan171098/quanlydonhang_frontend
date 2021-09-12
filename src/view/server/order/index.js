import React, {Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import OrderList from './list'
import OrderInfo from './info'
import OrderCreate from './create'
import OrderUpdate from './update'

import './style/index.scss'


export default class OrederProduct extends Component{
    render(){
        return(
            <div className="AdminOrder">
                <Switch>
                    <Route exact path='/admin/orders' component={OrderList} />
                    <Route path='/admin/orders/create' component={OrderCreate} />
                    <Route path='/admin/orders/:id/update' component={OrderUpdate} />
                    <Route path='/admin/orders/:id' component={OrderInfo} />
                </Switch>
            </div>
        )
    }
}
