import React, {Component} from 'react'
import {Route,Switch} from 'react-router-dom'

import OrderList from './manager'
import OrderInfo from './info'
import OrderUpdate from './update'
import OrderPack from './pack'

import './style/index.scss'

export default class OrderProduct extends Component{
    render(){
        return(
            <div className="ManagerOrder">
                <Switch>
                    <Route exact path='/manager/orders' component={OrderList} />
                    <Route path='/manager/orders/:id/update' component={OrderUpdate} />
                    <Route path='/manager/orders/:id/pack' component={OrderPack} />
                    <Route path='/manager/orders/:id' component={OrderInfo} />
                </Switch>
            </div>
        )
    }
}
