import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import Order from './Order'
import Ordermaga from './Ordermaga'

export default class index extends Component {
    render() {
        return (
            <div>
               <Switch>
                    
                    <Route   path='/purchase/user' component={Order} />          
               </Switch> 
            </div>
        )
    }
}