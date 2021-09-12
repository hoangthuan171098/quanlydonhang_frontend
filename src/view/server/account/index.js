import React, {Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import AccountList from './list'
import AccountInfo from './info'
import AccountCreate from './create'
import AccountUpdate from './update'

import './style/index.scss'

export default class AdminAccount extends Component{
    render(){
        return(
            <div className="AdminAccount">
                <Switch>
                    <Route exact path='/admin/accounts' component={AccountList} />
                    <Route path='/admin/accounts/create' component={AccountCreate} />
                    <Route path='/admin/accounts/:id/update' component={AccountUpdate} />
                    <Route path='/admin/accounts/:id' component={AccountInfo} />
                </Switch>
            </div>
        )
    }
}
