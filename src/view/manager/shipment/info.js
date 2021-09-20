import React, { Component } from 'react'
import Cookie from "js-cookie"
import axios from 'axios'

class ShipmentInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			authenticate: true,
			shipment: {}
		}
	}

	async componentDidMount() {
		if(Cookie.get('role') === 'Admin'){     
			let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/shipments/" + this.props.match.params.id,{
				headers: {
					'Authorization':'bearer '+ Cookie.get('token'),
				},
			});
			if (!response.ok) {
				console.log('Cannot connect to sever!!!')
				return
			}
			let data = await response.json();
			this.setState({ loading: false,authenticate: true, shipment: data });
			return
		}
		this.setState({authenticate: false});
	}

  	deliverClick = async () =>{
		await axios
			.put(process.env.REACT_APP_BACKEND_URL + '/shipments/' + this.state.shipment.id, {
				status: 'delivering'
			},{
				headers: {
					'Authorization':'bearer '+ Cookie.get('token'),
				}
			})
			.then(async(res) => {
				let status
				if(this.state.shipment.theLast){
					status = 'delivering'
				}
				else{
					status = 'partial delivering'
				}
				await axios
					.put(process.env.REACT_APP_BACKEND_URL + '/orders/' + this.state.shipment.orderID, {
						status: status
					},{
						headers: {
							'Authorization':'bearer '+ Cookie.get('token'),
						}
					})
					.then(res=>{
						alert("deliver product  success!");
						this.props.history.push('/manager/shipments')
					})
					.catch(err=>{
						alert('An error occurred, please check again.');
						console.log('An error occurred:', err.response);
					})
			})
			.catch(err => {
				alert('An error occurred, please check again.');
				console.log('An error occurred:', err.response);
			});
		return
 	}


	doneClick = async () =>{
		await axios
			.put(process.env.REACT_APP_BACKEND_URL + '/shipments/' + this.state.shipment.id, {
				status: 'delivered'
			},{
				headers: {
					'Authorization':'bearer '+ Cookie.get('token'),
				}
			})
			.then(async(res) => {
				let status
				if(this.state.shipment.theLast){
					status = 'delivered'
				}
				else{
					status = 'partial delivered'
				}
				await axios
					.put(process.env.REACT_APP_BACKEND_URL + '/orders/' + this.state.shipment.orderID, {
						status: status
					},{
						headers: {
							'Authorization':'bearer '+ Cookie.get('token'),
						}
					})
					.then(res=>{
						alert("deliver product  success!");
						this.props.history.push('/manager/shipments')
					})
					.catch(err=>{
						alert('An error occurred, please check again.');
						console.log('An error occurred:', err.response);
					})
			})
			.catch(err => {
				alert('An error occurred, please check again.');
				console.log('An error occurred:', err.response);
			});
		return
	}

	backClick = () =>{
		this.props.history.push('/manager/shipments')
	}

  	render() {
    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="module">
            <div className="module-head">
                <h2>Shipment detail</h2>
                <p>ID: {this.state.shipment.id}</p>
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
									{this.state.shipment.productList.map((item,index)=>{
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
								<span>{this.state.shipment.buyer.username}</span>
							</div>
						</div>
						<div className='row'>
							<div className='w-50'>
								<span>CREATED AT:</span>
							</div>
							<div className='w-50'>
								<span>{this.state.shipment.createdAt.slice(0,10)}</span><br/>
								<span>{this.state.shipment.createdAt.slice(11,19)}</span>
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
								<span>{this.state.shipment.updatedAt.slice(0,10)}</span><br/>
								<span>{this.state.shipment.updatedAt.slice(11,19)}</span>
							</div>
						</div>
					</div>
				</div>

                <div className='clear'>
					<button onClick={this.deliverClick}
						className={this.state.shipment.status === 'waiting to deliver'?
							'btn btn-primary mr-4':'btn btn-primary mr-4 d-none'}
					>Deliver</button>
					
					<button onClick={this.doneClick}
						className={this.state.shipment.status === 'delivering'?
							'btn btn-primary mr-4':'btn btn-primary mr-4 d-none'}
					>Done</button>
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

export default ShipmentInfo