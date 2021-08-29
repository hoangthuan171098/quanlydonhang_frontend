import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"

import NavBar from './components/Navbar'
import Topbar from './components/Topbar'
import {Home,Login,Register,Contact,About,Products} from './view/public/export'
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
						<Route path='/products' component={Products} />
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