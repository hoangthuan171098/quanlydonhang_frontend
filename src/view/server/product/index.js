import React, {Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import ProductList from './list'
import ProductInfo from './info'
import ProductCreate from './create'
import ProductUpdate from './update'

import './style/index.scss'


export default class AdminProduct extends Component{
    render(){
        return(
            <div className="AdminProduct">
                <Switch>
                    <Route exact path='/admin/products' component={ProductList} />
                    <Route path='/admin/product/create' component={ProductCreate} />
                    <Route path='/admin/product/:id/update' component={ProductUpdate} />
                    <Route path='/admin/product/:id' component={ProductInfo} />
                </Switch>
            </div>
        )
    }
}
