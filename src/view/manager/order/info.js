import React, { Component } from 'react'
import Cookie from "js-cookie"
import axios from 'axios'

import Shipment from './component/shipment'

class OrderInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			authenticate: true,
			order: {}
		}
	}

	async componentDidMount() {
		if(Cookie.get('role') === 'Admin'){     
			let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/orders/" + this.props.match.params.id,{
			headers: {
				'Authorization':'bearer '+ Cookie.get('token'),
			},
		});
		if (!response.ok) {
			console.log('Cannot connect to sever!!!')
			return
		}
		let data = await response.json();
		this.setState({ loading: false,authenticate: true, order: data });
			return
		}
		this.setState({authenticate: false});
	}

	confirmClick = async () =>{
		await axios
			.put(process.env.REACT_APP_BACKEND_URL + '/orders/' + this.state.order.id, {
				status: 'processing'
			},{
				headers: {
					'Authorization':'bearer '+ Cookie.get('token'),
				},
			})
			.then(response => {
				alert("confirmed order success!");
				this.props.history.push('/manager/orders')
			})
			.catch(error => {
				alert('An error occurred, please check again.');
				console.log('An error occurred:', error.response);
			});
		return
	}

	packAllClick = async () =>{
		let productList = this.state.order.productList

		await axios
			.post(process.env.REACT_APP_BACKEND_URL + '/shipments', {
				productList: productList,
				status: 'waiting to deliver',
				buyer: this.state.order.buyer,
				orderID: this.state.order.id,
				theLast: true
			},{
				headers: {
					'Authorization':'bearer '+ Cookie.get('token'),
				},
			})
			.then(async (res)=>{
				await axios
					.put(process.env.REACT_APP_BACKEND_URL + '/orders/' + this.state.order.id, {
						status: 'waiting to deliver',
						shipments: [res.data]
					},{
						headers: {
							'Authorization':'bearer '+ Cookie.get('token'),
						},
					})
					.catch(error => {
						alert('Cannot pack products')
						console.log('An error occurred:', error.response)
					});
				alert("Packed all product success!")
				this.props.history.push('/manager/orders')
			})
			.catch(err=>{
				alert('Cannot create shipment')
				console.log('An error occurred:', err.response)
			})
	}

	packClick = () =>{
		this.props.history.push('/manager/orders/' + this.state.order.id +'/pack')
	}

	cancleClick = async () =>{
		await axios
			.put(process.env.REACT_APP_BACKEND_URL + '/orders/' + this.state.order.id, {
				status: 'cancled'
			},{
				headers: {
					'Authorization':'bearer '+ Cookie.get('token'),
				},
			})
			.then(response => {
				alert("cancled order success!");
				this.props.history.push('/manager/orders')
			})
			.catch(error => {
				alert('An error occurred, please check again.');
				console.log('An error occurred:', error.response);
			});
	}

	backClick = () =>{
		this.props.history.push('/manager/orders')
	}

	updateClick = (e) =>{
		e.preventDefault()
		this.props.history.push('/manager/orders/' + this.state.order.id + '/update')
	}

	showRemainProducts = ()=>{
		if(this.state.order.remainProductList.length === 0){
			return(<>Empty</>)
		}
		else{
			return(
				<table className='table'>
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Color</th>
							<th>Quantity</th>
						</tr>
					</thead>
					<tbody>
					{this.state.order.remainProductList.map((item,index)=>{
						return(
						<tr key={index}>
							<td style={{width: 150 + 'px'}}>
								<img className='img-preview' src={process.env.REACT_APP_BACKEND_URL + item.product.image.url}></img>
							</td>
							<td><span>{item.product.name}</span></td>
							<td>
								<div className='color-div' style={{backgroundColor:item.color}}></div>
							</td>
							<td>
								{item.quantity_m ? 
									(item.quantity? 
										item.quantity_m + ' x m,' + item.quantity + ' x roll'
										:item.quantity_m + ' x m')
									:item.quantity + ' x roll'
								}
							</td>
						</tr>
						)
					})}
					</tbody>
				</table>
			)
		}
	}

 	render() {
    if (!this.state.loading && Cookie.get('token')) {
		if(this.state.order.remainProductList){
			return(
				<div className="module">
					<div className="module-head">
						<h2>Order detail 
							<span className='ml-4 text-primary fa fa-edit'
								onClick={e=>this.updateClick(e)}></span>
						</h2>
						<p>ID: {this.state.order.id}</p>
					</div>
					<div className="module-body">
						<div className='w-75 float-left'>
							<div className='module'>
								<div className='module-body'>
									<div className='row'>
										<label>Remain products: </label>
										{this.showRemainProducts()}
									</div>

									{(!this.state.order.shipments[0].theLast)
										&&this.state.order.shipments.map((shipment,id)=>{
										return(
											<Shipment shipment={this.state.order.shipments[id]}/>
										)
									})}

									<div className='row'>
										<span>Note :</span><br />
										<p>{this.state.order.note}</p>
									</div>
								</div>
							</div>
						</div>

						<div className='module float-right' style={{width: 20 + '%'}}>
							<div className='module-body'>
								<div className='row'>
									<div className='w-50'>
										<span>BUYER:</span>
									</div>
									<div className='w-50'>
										<span>{this.state.order.buyer.username}</span>
									</div>
								</div>
								<div className='row'>
									<div className='w-50'>
										<span>CREATED AT:</span>
									</div>
									<div className='w-50'>
										<span>{this.state.order.createdAt.slice(0,10)}</span><br/>
										<span>{this.state.order.createdAt.slice(11,19)}</span>
									</div>
								</div>
							</div>
						</div>

						<div className='module float-right' style={{width: 20 + '%'}}>
							<div className='module-body'>
								<div className='row'>
									<div className='w-50'>
										<span>LAST UPDATE:</span>
									</div>
									<div className='w-50'>
										<span>{this.state.order.updatedAt.slice(0,10)}</span><br/>
										<span>{this.state.order.updatedAt.slice(11,19)}</span>
									</div>
								</div>
							</div>
						</div>

						<div className='clear'>
							<button onClick={this.confirmClick}
								className={this.state.order.status === 'waiting'? 'btn btn-primary mr-4':'btn btn-primary mr-4 d-none'}
							>Confirm</button>
							<button onClick={this.packAllClick}
								className={this.state.order.status === 'processing'? 'btn btn-primary mr-4':'btn btn-primary mr-4 d-none'}
							>Pack All</button>
							<button onClick={this.packClick}
								className={(this.state.order.status === 'processing' ||this.state.order.status === 'partial delivered')?
								'btn btn-primary mr-4':'btn btn-primary mr-4 d-none'}
							>Partial Pack</button>
							<button className='btn btn-success' onClick={this.backClick}>Back</button>
						</div>
					</div>
				</div>
			)
		}
    	return (
			<div className="module">
				<div className="module-head">
					<h2>Order detail 
						<span className='ml-4 text-primary fa fa-edit'
							onClick={e=>this.updateClick(e)}></span>
					</h2>
					<p>ID: {this.state.order.id}</p>
				</div>
				<div className="module-body">
					<div className='w-75 float-left'>
						<div className='module'>
							<div className='module-body'>
								<div className='row'>
									<span>Product List: </span>
									<table className='table'>
										<thead>
											<tr>
												<th></th>
												<th>Name</th>
												<th>Color</th>
												<th>Quantity</th>
											</tr>
										</thead>
										<tbody>
										{this.state.order.productList.map((item,index)=>{
											return(
											<tr key={index}>
												<td style={{width: 150 + 'px'}}>
													<img className='img-preview' src={process.env.REACT_APP_BACKEND_URL + item.product.image.url}></img>
												</td>
												<td><span>{item.product.name}</span></td>
												<td>
													<div className='color-div' style={{backgroundColor:item.color}}></div>
												</td>
												<td>
													{item.quantity_m ? 
														(item.quantity? 
														item.quantity_m + ' x m,' + item.quantity + ' x roll'
														: item.quantity_m + ' x m')
														:item.quantity + ' x roll'
													}
												</td>
											</tr>
											)
										})}
										</tbody>
									</table>
								</div>

								<div className='row'>
									<span>Note :</span><br />
									<p>{this.state.order.note}</p>
								</div>
							</div>
						</div>
					</div>

					<div className='module float-right' style={{width: 20 + '%'}}>
						<div className='module-body'>
							<div className='row'>
								<div className='w-50'>
									<span>BUYER:</span>
								</div>
								<div className='w-50'>
									<span>{this.state.order.buyer.username}</span>
								</div>
							</div>
							<div className='row'>
								<div className='w-50'>
									<span>CREATED AT:</span>
								</div>
								<div className='w-50'>
									<span>{this.state.order.createdAt.slice(0,10)}</span><br/>
									<span>{this.state.order.createdAt.slice(11,19)}</span>
								</div>
							</div>
						</div>
					</div>

					<div className='module float-right' style={{width: 20 + '%'}}>
						<div className='module-body'>
							<div className='row'>
								<div className='w-50'>
									<span>LAST UPDATE:</span>
								</div>
								<div className='w-50'>
									<span>{this.state.order.updatedAt.slice(0,10)}</span><br/>
									<span>{this.state.order.updatedAt.slice(11,19)}</span>
								</div>
							</div>
						</div>
					</div>

					<div className='clear'>
						<button onClick={this.confirmClick}
							className={this.state.order.status === 'waiting'? 'btn btn-primary mr-4':'btn btn-primary mr-4 d-none'}
						>Confirm</button>
						<button onClick={this.packAllClick}
							className={this.state.order.status === 'processing'? 'btn btn-primary mr-4':'btn btn-primary mr-4 d-none'}
						>Pack All</button>
						<button onClick={this.packClick}
							className={(this.state.order.status === 'processing' ||this.state.order.status === 'partial delivered')?
							'btn btn-primary mr-4':'btn btn-primary mr-4 d-none'}
						>Partial Pack</button>
						<button className='btn btn-success' onClick={this.backClick}>Back</button>
					</div>
				</div>
			</div>
		)
    }
    if(!this.state.authenticate){
      return <h2>You need to login</h2>
    }
    return (<h2>Waiting for API...</h2>);
  }
}

export default OrderInfo;