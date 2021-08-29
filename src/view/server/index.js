import React, {Component} from 'react'
import {Route,Switch } from 'react-router-dom'
import AdminAccount from './account'
import SideBar from './components/SideBar'
// import Header from './components/Header'
import './index.scss'

export default class Server extends Component{
    render(){
        return(
            <div className='Sever'>
                <SideBar/>
                <div className='content'>
                    <Switch>
                        <Route exact path='/admin' component={DashBoard} />
                        <Route path='/admin/accounts' component={AdminAccount} />
                        <Route path='/admin/account' component={AdminAccount} />
                    </Switch>
                </div>
            </div>
        )
    }
}

class DashBoard extends Component{
    render(){
        return(
            <h1>This is DashBoard</h1>
        )
    }
}
