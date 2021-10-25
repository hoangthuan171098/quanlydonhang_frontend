import React, { Component } from 'react'
import Cookie from "js-cookie"
import axios from 'axios'
import Modal from 'react-modal'


import Shipment from './component/shipment'
import Status from './component/status'
import UserInfo from '../components/UserInfo'


class OrderInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			authenticate: true,
			order: {},
			isPartial: false,
			productList: [],
			packList: [],
			openModal: false,
			shipment: null
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

	openModal = () =>{
		this.setState({openModal:true})
	}

	closeModal = () =>{
		this.setState({openModal:false})
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
		if(this.state.order.remainProductList){
			this.setState({isPartial: !this.state.isPartial,show:'remainProducts'})
			return
		}
		this.setState({isPartial: !this.state.isPartial,show:'products'})
	}

	showProductList = () =>{
		let productList
		let title
		if(!this.state.order.remainProductList){
			productList = this.state.order.productList
			title = "Danh sách sản phẩm"
		}
		else{
			if(this.state.order.remainProductList.length === 0){
				productList = this.state.order.productList
				title = "Danh sách sản phẩm"
			}
			else{
				productList = this.state.order.remainProductList
				title = "sản phẩm chưa giao"
			}
		}
		return(
			<div className='row'>
				<span className='flex-v-center impress'>{title}</span>
				<table className='table'>
					<thead>
						<tr>
							<th>Tên</th>
							<th>Màu</th>
							<th>Cuộn</th>
							<th>Mét</th>
							<th style={{width:250+'px'}} className={this.state.isPartial? '':'d-none'}></th>
						</tr>
					</thead>
					<tbody>
					{productList.map((item,index)=>{
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
								CUỘN:
								<input type='number' className='short-input mr-4'
									min='0'
									max={item.quantity? item.quantity.toString():'0'}
									onChange={e=>{this.changePackQuantity(e,index)}}
								></input>
								Mét:
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
		)
	}



	showNote = () =>{
		if(this.state.order.note && this.state.order.note!==""){
			return(
				<div className='row'>
					<span className='impress'>Ghi chú : </span>
					{this.state.order.note}
				</div>
			)
		}
		return(<></>)
	}

	showShipment = () =>{
		if(this.state.shipment){
			return(
				<Shipment shipment={this.state.shipment} shipIndex={this.state.shipIndex}/>
			)
		}
		return(
			<></>
		)
	}

	showShipments = () =>{
		if(this.state.order.shipments.length !== 0){
			return(
				<div className='card'>
					<div className='card-body'>
						<div className='row'>
							<div className='w-100'>
								<span className='impress'>Giao hàng:</span>
							</div>
							{this.state.order.shipments.map((shipment,index)=>{
								return(
									<span index={index} onClick={(e)=>this.selectShipmentClick(e,shipment,index+1)}
										style={{cursor:'pointer'}}
									>#{index+1} - {shipment.status}</span>
								)
							})}
						</div>
					</div>
				</div>
			)
		}
	}

	showButton = () =>{
		let status = this.state.order.status
		if(status === 'waiting'){
			return(
				<div className='row'>
					<button onClick={this.confirmClick} className='btn btn-primary mr-4'>Xác nhận</button>
					<button onClick={this.cancleClick} className='btn btn-danger mr-4'>Hủy</button>
				</div>
			)
		}
		else if(status === 'processing'){
			return(
				<div className='row'>
					<button onClick={this.packAllClick}
						className={!this.state.isPartial? 'btn btn-primary mr-4':'d-none'}
					>Đóng gói hết</button>
					<button onClick={this.showPackClick}
						className={!this.state.isPartial? 'btn btn-primary mr-4':'d-none' }
					>Chọn sản phẩm</button>
					<button onClick={this.submitPackClick}
						className={this.state.isPartial? 'btn btn-primary mr-4':'d-none'}
					>Xác nhận</button>
				</div>
			)
		}
		else if(status === 'partial delivered'||status === 'partial delivering'){
			return(
				<div className='row'>
					<button onClick={this.showPackClick}
						className={!this.state.isPartial? 'btn btn-primary mr-4':'d-none' }
					>Chọn sản phẩm</button>
					<button onClick={this.submitPackClick}
						className={this.state.isPartial? 'btn btn-primary mr-4':'d-none'}
					>Xác nhận</button>
				</div>
			)
		}
		else if(status === 'waiting to deliver' && this.state.order.remainProductList){
			if(this.state.order.remainProductList.length !==0){
				return(
					<div className='row'>
						<button onClick={this.showPackClick}
							className={!this.state.isPartial? 'btn btn-primary mr-4':'d-none' }
						>Chọn sản phẩm </button>
						<button onClick={this.submitPackClick}
							className={this.state.isPartial? 'btn btn-primary mr-4':'d-none'}
						>Xác nhận</button>
					</div>
				)
			}
		}
		return(
			<></>
		)
	}

	selectShipmentClick = (event,shipment,index) =>{
		event.preventDefault()
		this.setState({shipment:shipment,shipIndex:index})
	}

 	render() {
    if (!this.state.loading && Cookie.get('token')) {
    	return (
			<div>
				<div className="page-header">
                    <div className="page-block">
                        <div className="row align-items-center">
                            <div className="col-md-12 p-0">
                                <div className="page-header-title">
                                    <h5>Thông tin đơn hàng 
										<i className='fa fa-edit' style={{cursor:'pointer',color:'blue'}}
										onClick={()=>{this.props.history.push("/manager/orders/"+this.state.order.id+"/update")}}
										></i>
									</h5>
									ID: {this.state.order.id + ' '}
									<Status status={this.state.order.status} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				
				<div className="card-body">
					
					<div className='w-100 d-flex flex-row-reverse' style={{marginBottom:10+'px'}}>
						{this.showButton()}
					</div>

					<div className='w-75 float-left'>
						<div className='card'>
							<div className='card-body'>
								{this.showProductList()}
								{this.showNote()}
							</div>
						</div>
					</div>

					<div className='float-right' style={{width: 20 + '%'}}>
						<div className='card'>
							<div className='card-body'>
								<div className='row'>
									<div className='w-50'>
										<span className='impress'>Người Mua:</span>
									</div>
									<div className='w-50'>
										<span onClick={()=>this.openModal()}
											style={{cursor:'pointer'}}
										>{this.state.order.buyer.username}</span>
									</div>
								</div>
								<div className='row'>
									<div className='w-50'>
										<span className='impress'>Tạo lúc:</span>
									</div>
									<div className='w-50'>
										<span>{this.state.order.createdAt.slice(0,10)}</span><br/>
										<span>{this.state.order.createdAt.slice(11,19)}</span>
									</div>
								</div>
							</div>
						</div>
						
						{this.showShipments()}

						<div className='card'>
							<div className='card-body' >
								<div className='row'>
									<div className='w-50'>
										<span className='impress'>Cập nhật:</span>
									</div>
									<div className='w-50'>
										<span>{this.state.order.updatedAt.slice(0,10)}</span><br/>
										<span>{this.state.order.updatedAt.slice(11,19)}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{this.showShipment()}
					<div className='clear'></div>
				</div>
				
				<Modal
					isOpen={this.state.openModal}
					onRequestClose={this.closeModal}
					contentLabel="Select product"
					ariaHideApp={false}
					style={{content:{marginLeft:300+'px',marginTop: 50+'px'}}}
				>
					<UserInfo user={this.state.order.buyer} clickBack={this.closeModal}/>
				</Modal>
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
			alert("Packed partial product success!")
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