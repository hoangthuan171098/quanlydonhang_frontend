import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"

import NavBar from './components/Navbar'
import Chat from './components/chat'
import {Home,Login,Register,Contact,About} from './view/public/export'
import ProductList from './view/public/Shops/ProductList'
import ProductDetail from './view/public/ProductDetails/ProductDetail'
import Shopcart from './view/client/Shopcart'
import Checkout from './view/client/Checkout'
import Profile from './view/client/profile'

import Server from './view/server/'
import Manager from './view/manager'
import {Services,News,Team} from './view/public/components/export'
import Order from './view/client/Purchase/Order'
import './responsive.scss'
import './base.scss'
import './grid.scss'
import './App.scss'
import Shipment from './view/shipment'
import Shippingaddress from './view/client/Shippingaddress'
import Payment from './view/client/Purchase/Payment'
import Topbar from './components/Topbar'
import Footer from './components/Footer'
import Addressorder from './view/client/Purchase/Addressorder'
import Account from './view/client/Purchase/Account'


class App extends Component {
	render() {
		return (
			<div className='app'>
				<Router>
					<Topbar />
					<Chat />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/about' component={About} />
						<Route path='/contact' component={Contact} />
						<Route path='/services' component={Services} />
						<Route path='/team' component={Team} />
						<Route path='/news' component={News} />
						<Route path='/products' component={ProductList} />
						<Route path='/product/:productId' component={ProductDetail} />						
						<Route path='/shopping-cart' component={Shopcart} />
						<Route path='/checkout' component={Checkout} />
						<Route path='/profile' component={Profile} />
						<Route path='/admin' component={Server} />
						<Route path='/manager' component={Manager} />
						<Route path='/login' component={Login} />
						<Route path='/register' component={Register} />
						<Route path='/purchase' component={Order} />
						<Route path='/shipment' component={Shipment} />
						<Route path='/location' component={Shippingaddress} />
						<Route path='/payment' component={Payment} />
						<Route path='/a' component={Account} />
					</Switch>
					<Footer />
				</Router>
			</div>
		)
	}
}

export default App;