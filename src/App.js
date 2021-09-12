import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"

import NavBar from './components/Navbar'
import Topbar from './components/Topbar'
import {Home,Login,Register,Contact,About} from './view/public/export'
import ProductList from './view/public/Shops/ProductList'
// import ProductList from './view/public/ProductList'
import ProductDetail from './view/public/ProductDetails/ProductDetail'
import Shopcart from './view/client/Shopcart'
import Checkout from './view/client/Checkout'
import Profile from './view/client/profile'

import Server from './view/server/'
import {Services,News,Team} from './view/public/components/export'


import './App.css'


class App extends Component {
	render() {
		return (
			<div className='App'>
				<Router>
					

					<Topbar />
					<NavBar />
					
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
						<Route path='/login' component={Login} />
						<Route path='/register' component={Register} />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App;