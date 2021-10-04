import React, {Component} from 'react'
import {Route, Switch, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie'

import SideBar from './components/SideBar';

import './style/index.scss'
import './style/bootstrap.min.scss'
import './style/theme.scss'
import ShipmentList from './list';
import ShipmentInfo from './info';
import AnnountList from './Annount/list';
import AnnountInfo from './Annount/info';

class Shipment extends Component{ 
    render(){
        // if(Cookie.get('role')!=='Shipment'){
        //     alert('You need to login Shipment account!')
        //     return(
        //         <Redirect to='/'/>
        //     )
        // }
        return(
            <div className='Shipment'>
                <SideBar/>
                <div className='content'>
                    <Switch>  
                        <Route exact path='/shipment' component={DashBoard} />
                        <Route path='/shipment/list-shipments-orders' component={ShipmentList} />
                        <Route path='/shipment/shipments-orders/:id' component={ShipmentInfo}/>
                        <Route path='/shipment/annount-list' component={AnnountList} />
                        <Route path='/shipment/annount-item/:id' component={AnnountInfo} />
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

export default Shipment
