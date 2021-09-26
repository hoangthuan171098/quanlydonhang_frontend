import React, { Component } from 'react'
import Cookie from "js-cookie"
import axios from 'axios'

import Shipment from './component/shipment'
import Status from './component/status'

class OrderInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			authenticate: true,
			order: {},
			isPartial: false,
			productList: [],
			packList: []
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
		this.setState({ 
				loading: false,
				authenticate: true,
				order: data,
				productList:data.productList,
				packList:[],
				isPartial: false
			});
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
		this.props.history.push('/manager/orders/')
	}

	updateClick = (e) =>{
		e.preventDefault()
		this.props.history.push('/manager/orders/' + this.state.order.id + '/update')
	}

	showPackClick = ()=>{
		this.setState({isPartial: !this.state.isPartial})
	}

	showRemainProducts = ()=>{
		if(this.state.order.remainProductList.length === 0){
			return(<span className='flex-v-center'>Empty</span>)
		}
		else{
			return(
				<table className='table'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Color</th>
							<th>Cuộn</th>
							<th>M</th>
							<th style={{width:250+'px'}} className={this.state.isPartial? '':'d-none'}></th>
						</tr>
					</thead>
					<tbody>
					{this.state.order.remainProductList.map((item,index)=>{
						return(
						<tr key={index}>
							<td><span>{item.product.name}</span></td>
							<td>{item.color}</td>
							<td>
								{item.quantity? item.quantity:'0'}
							</td>
							<td>
								{item.quantity_m? item.quantity_m:'0'}
							</td>
							<td className={this.state.isPartial? '':'d-none'}>
								Roll:
								<input type='number' className='short-input mr-4'
									min='0'
									max={item.quantity? item.quantity.toString():'0'}
									onChange={e=>{this.changePackQuantity(e,index)}}
								></input>
								M:
								<input type='number' className='short-input'
									min='0'
									max={item.quantity_m? item.quantity_m.toString():'0'}
									onChange={e=>{this.changePackQuantityM(e,index)}}
								></input>
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
						<h2>Order  
							<Status status={this.state.order.status} />
							<span className='ml-4 text-primary fa fa-edit'
								onClick={e=>this.updateClick(e)}></span>
						</h2>
						ID: {this.state.order.id}
					</div>
					<div className="module-body">
						<div className='w-75 float-left'>
							<div className='module'>
								<div className='module-body'>
									<div className='row' style={{marginBottom:20+'px'}}>
										<span className='impress flex-v-center'>Remain products: </span>
										{this.showRemainProducts()}
									</div>

									{(!this.state.order.shipments[0].theLast)
										&&this.state.order.shipments.map((shipment,id)=>{
										return(
											<Shipment shipment={this.state.order.shipments[id]}/>
										)
									})}
									
									<div className='row'>
										<span className='flex-v-center impress'>Note :</span><br />
										{this.state.order.note}
									</div>
								</div>
							</div>
						</div>

						<div className='module float-right' style={{width: 20 + '%'}}>
							<div className='module-body'>
								<div className='row'>
									<div className='w-50'>
										<span className='impress'>BUYER:</span>
									</div>
									<div className='w-50'>
										<span>{this.state.order.buyer.username}</span>
									</div>
								</div>
								<div className='row'>
									<div className='w-50'>
										<span className='impress'>CREATED AT:</span>
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
										<span className='imperss'>LAST UPDATE:</span>
									</div>
									<div className='w-50'>
										<span>{this.state.order.updatedAt.slice(0,10)}</span><br/>
										<span>{this.state.order.updatedAt.slice(11,19)}</span>
									</div>
								</div>
							</div>
						</div>

						<div className='clear'>
							<div className={this.state.order.status==='waiting'? 'row':'d-none'}>
								<button onClick={this.confirmClick}
									className='btn btn-primary mr-4'
								>Confirm</button>
								<button onClick={this.cancleClick}
									className='btn btn-danger mr-4'
								>Cancle</button>
							</div>
							<div className={(this.state.order.status === 'processing'
											|| this.state.order.status === "partial delivered")? 
											'row':'d-none'}>
								<button onClick={this.packAllClick}
									className={!this.state.isPartial? 'btn btn-primary mr-4':'d-none'}
								>Pack All</button>
								<button onClick={this.showPackClick}
									className={!this.state.isPartial? 'btn btn-primary mr-4':'d-none' }
								>Partial Pack</button>
								<button onClick={this.submitPackClick}
									className={this.state.isPartial? 'btn btn-primary mr-4':'d-none'}
								>Submit</button>
							</div>
						</div>
					</div>
				</div>
			)
		}
    	return (
			<div className="module">
				<div className="module-head">
					<h2>Order detail 
						<Status status={this.state.order.status} />
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
									<span className='flex-v-center impress'>Product List: </span>
									<table className='table'>
										<thead>
											<tr>
												<th>Name</th>
												<th>Color</th>
												<th>Cuộn</th>
												<th>M</th>
												<th style={{width:250+'px'}} className={this.state.isPartial? '':'d-none'}></th>
											</tr>
										</thead>
										<tbody>
										{this.state.order.productList.map((item,index)=>{
											return(
											<tr key={index}>
												<td><span>{item.product.name}</span></td>
												<td>{item.color}</td>
												<td>
													{item.quantity? item.quantity:0}
												</td>
												<td>
													{item.quantity_m? item.quantity_m:0}
												</td>
												<td className={this.state.isPartial? '':'d-none'}>
													Roll:
													<input type='number' className='short-input mr-4'
														min='0'
														max={item.quantity? item.quantity.toString():'0'}
														onChange={e=>{this.changePackQuantity(e,index)}}
													></input>
													M:
													<input type='number' className='short-input'
														min='0'
														max={item.quantity_m? item.quantity_m.toString():'0'}
														onChange={e=>{this.changePackQuantityM(e,index)}}
													></input>
												</td>
											</tr>
											)
										})}
										</tbody>
									</table>
								</div>

								<div className='row'>
									<span className='flex-v-center impress'>Note :</span><br />
									{this.state.order.note}
								</div>
							</div>
						</div>
					</div>

					<div className='module float-right' style={{width: 20 + '%'}}>
						<div className='module-body'>
							<div className='row'>
								<div className='w-50'>
									<span className='impress'>BUYER:</span>
								</div>
								<div className='w-50'>
									<span>{this.state.order.buyer.username}</span>
								</div>
							</div>
							<div className='row'>
								<div className='w-50'>
									<span className='impress'>CREATED AT:</span>
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
									<span className='impress'>LAST UPDATE:</span>
								</div>
								<div className='w-50'>
									<span>{this.state.order.updatedAt.slice(0,10)}</span><br/>
									<span>{this.state.order.updatedAt.slice(11,19)}</span>
								</div>
							</div>
						</div>
					</div>

					<div className='clear'>
						<div className={this.state.order.status==='waiting'? 'row':'d-none'}>
							<button onClick={this.confirmClick}
								className='btn btn-primary mr-4'
							>Confirm</button>
							<button onClick={this.cancleClick}
								className='btn btn-danger mr-4'
							>Cancle</button>
						</div>
						<div className={(this.state.order.status === 'processing'
										|| this.state.order.status === "partial delivered")? 
										'row':'d-none'}>
							<button onClick={this.packAllClick}
								className={!this.state.isPartial? 'btn btn-primary mr-4':'d-none'}
							>Pack All</button>
							<button onClick={this.showPackClick}
								className={!this.state.isPartial? 'btn btn-primary mr-4':'d-none' }
							>Partial Pack</button>
							<button onClick={this.submitPackClick}
								className={this.state.isPartial? 'btn btn-primary mr-4':'d-none'}
							>Submit</button>
						</div>
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

  submitPackClick = async (event) =>{
    event.preventDefault() 
    let packList = this.state.packList
    let newPackList = []
    let productList
    let newProductList

	if(packList.length===0){
		alert('Xin hãy nhập số lượng vải đóng gói!')
		return
	}

    if(this.state.order.remainProductList){
      productList = this.state.order.remainProductList
      newProductList = this.state.order.remainProductList
    }
    else{
      productList = this.state.order.productList
      newProductList = this.state.order.productList
    }

    
    for(let i=0; i<productList.length; i++){
      if(packList[i]){
        // add new packed product to list
        let item = {
          product: productList[i].product,
          color: productList[i].color
        }
        if(packList[i].quantity){
          item ={...item,quantity:packList[i].quantity}
        }
        if(packList[i].quantity_m){
          item ={...item,quantity_m:packList[i].quantity_m}
        }
        newPackList.push(item)

        // remove or decrease quantity in product list
        if(packList[i].quantity && packList[i].quantity_m){
          let newQuantity = productList[i].quantity - packList[i].quantity
          let newQuantity_m = productList[i].quantity_m - packList[i].quantity_m
          if(newQuantity===0 && newQuantity_m===0){
            newProductList[i] = null
          }
          else if(newQuantity===0){
            delete newProductList[i].quantity
            newProductList[i] = {...newProductList[i],quantity_m: newQuantity_m}
          }
          else if(newQuantity_m===0){
            delete newProductList[i].quantity_m
            newProductList[i] = {...newProductList[i],quantity: newQuantity}
          }
          else{
            newProductList[i] = {...newProductList[i],quantity: newQuantity,quantity_m: newQuantity_m}
          }
        }
        else if(packList[i].quantity){
          let newQuantity = productList[i].quantity - packList[i].quantity
          if(newQuantity===0){
			  if(productList[i].quantity_m){
				delete newProductList[i].quantity
			  }
			  else{
				newProductList[i] = null
			  }
          }
          else{
            newProductList[i] = {...newProductList[i],quantity: newQuantity}
          }
        }
        else{
          let newQuantity_m = productList[i].quantity_m - packList[i].quantity_m
          if(newQuantity_m===0){
			if(productList[i].quantity){
			  delete newProductList[i].quantity_m
			}
			else{
			  newProductList[i] = null
			}
          }
          else{
            newProductList[i] = {...newProductList[i],quantity_m: newQuantity_m}
          }
        }
      }
    }

    for(let i=newProductList.length-1; i>-1;i--){
      if(!newProductList[i]){
        newProductList.splice(i,1)
      }
    }

    let theLast
    if(newProductList.length === 0){
      theLast = true
    }
    else{
      theLast = false
    }

	await axios
		.post(process.env.REACT_APP_BACKEND_URL + '/shipments', {
			productList: newPackList,
			status: 'waiting to deliver',
			buyer: this.state.order.buyer,
			orderID: this.state.order.id,
			theLast: theLast
		},{
			headers: {
				'Authorization':'bearer '+ Cookie.get('token'),
			},
		})
		.then(async (res)=>{
			let shipments = []
			if(this.state.order.shipments){
				shipments = this.state.order.shipments
			}
			await axios
				.put(process.env.REACT_APP_BACKEND_URL + '/orders/' + this.state.order.id, {
					status: 'waiting to deliver',
					remainProductList: newProductList,
					shipments: [...shipments,res.data]
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
			this.componentDidMount()
		})
		.catch(err=>{
			alert('Cannot create shipment')
			console.log('An error occurred:', err.response)
		})
    return
  }

  changePackQuantity = (event,index) =>{
    let value= Number(event.target.value)
    let lst = this.state.packList
    if(value===0){
      if(!lst[index]){
        return
      }
      else if(!lst[index].quantity_m){
        delete lst[index]
      }
      else{
        delete lst[index]['quantity']
      }
    }
    else{
      lst[index] = {...lst[index],quantity:value}
    }
    this.setState({packList:lst})
  }

  changePackQuantityM = (event,index) =>{
    let value = Number(event.target.value)
    let lst = this.state.packList

    if(value===0){
      if(!lst[index]){
        return
      }
      else if(!lst[index].quantity){
        delete lst[index]
      }
      else{
        delete lst[index]['quantity_m']
      }
    }
    else{
      lst[index] = {...lst[index],quantity_m:value}
    }

    this.setState({packList:lst})
  }
}

export default OrderInfo;