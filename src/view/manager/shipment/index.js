import React, {Component} from 'react'
import {Route,Switch} from 'react-router-dom'

import ShipmentInfo from './info'
import ShipmentList from './list'

export default class OrderShipment extends Component{
    render(){
        return(
            <div className="ManagerOrder">
                <Switch>
                    <Route exact path='/manager/shipments' component={ShipmentList} />
                    <Route path='/manager/shipments/:id' component={ShipmentInfo} />
                </Switch>
            </div>
        )
    }
}
