import React, { Component } from 'react'
import Cookie from "js-cookie"
import axios from "axios"

class OrderPack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      modal: {
        isOpen: false
      },
      productList: [],
      order: {},
      checkList: [],
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
        return
      }
      
      let data = await response.json();
      let lst = []
      for (let index = 0; index < data.productList.length; index++) {
        lst[index] = false    
      }
      this.setState({ checkList: lst})
      this.setState({ loading: false, authenticate: true, order: data,productList:data.productList});
      return
    }
    this.setState({authenticate: false});
  }

  submitClick = async (event) =>{
    event.preventDefault() 
    let packList = this.state.packList
    let newPackList = []
    let productList
    let newProductList

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
        if(productList[i].quantity && productList[i].quantity_m){
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
            newProductList[i] = null
            newProductList[i] = {...newProductList[i],quantity: newQuantity}
          }
          else{
            newProductList[i] = {...newProductList[i],quantity: newQuantity,quantity_m: newQuantity_m}
          }
        }
        else if(productList[i].quantity){
          let newQuantity = productList[i].quantity - packList[i].quantity
          if(newQuantity===0){
            newProductList[i] = null
          }
          else{
            newProductList[i] = {...newProductList[i],quantity: newQuantity}
          }
        }
        else{
          let newQuantity_m = productList[i].quantity_m - packList[i].quantity_m
          if(newQuantity_m===0){
            newProductList[i] = null
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
				this.props.history.push('/manager/orders')
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
        lst[index] = null
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
        lst[index] = null
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

  productCheck = async (event,index) =>{
    let list = this.state.checkList
    list[index] = event.target.checked
    await this.setState({checkList:list})
  }

  backClick = (e) =>{
    e.preventDefault()
    this.props.history.push('/manager/orders/' + this.state.order.id)
  }

  render() {
    if (!this.state.loading && Cookie.get('token')) {
      if(this.state.order.remainProductList){
        return (
          <div className='OrderCreate'>
            <div className='module'>
              <div className='module-head'>
                <h2>Pack Order</h2>
              </div>
  
              <div className='module-body'>
                <form onSubmit={this.submitClick}>
                  <div className='row' style={{marginBottom:20+'px'}}>
                    <div className='col-lg-12'>
                      <label>Products list:</label>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th className='cell-check'></th>
                            <th>Name</th>
                            <th>Color</th>
                            <th>Quantity</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.order.remainProductList.map((item,index)=>{
                          return(
                            <tr key={index}>
                              <td style={{width: 200 + 'px'}}>
                                <img className='img-preview' src={process.env.REACT_APP_BACKEND_URL + item.product.image.url}></img>
                              </td>
                              <td>{item.product.name}</td>
                              <td><div className='color-div' style={{backgroundColor:item.color}}></div></td>
                              <td>
                                {item.quantity_m ? 
                                  (item.quantity? 
                                    item.quantity_m + ' x m,' + item.quantity + ' x roll'
                                    : item.quantity_m + ' x m')
                                  :item.quantity + ' x roll'
                                }
                              </td>
                              <td>
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
                  </div>
  
                  <div className='row'>
                    <div className='col-2'>
                      <button className='btn btn-primary'>Submit</button>
                    </div>
                    <button className='btn btn-primary' onClick={e=>this.backClick(e)}>Back</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className='OrderCreate'>

          <div className='module'>
            <div className='module-head'>
              <h2>Pack Order</h2>
            </div>

            <div className='module-body'>
              <form onSubmit={this.submitClick}>
                <div className='row' style={{marginBottom:20+'px'}}>
                  <div className='col-lg-12'>
                    <label>Products list:</label>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th className='cell-check'></th>
                          <th>Name</th>
                          <th>Color</th>
                          <th>Quantity</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.order.productList.map((item,index)=>{
                        return(
                          <tr key={index}>
                            <td style={{width: 200 + 'px'}}>
                              <img className='img-preview' src={process.env.REACT_APP_BACKEND_URL + item.product.image.url}></img>
                            </td>
                            <td>{item.product.name}</td>
                            <td><div className='color-div' style={{backgroundColor:item.color}}></div></td>
                            <td>
                              {item.quantity_m ? 
                                (item.quantity? 
                                  item.quantity_m + ' x m,' + item.quantity + ' x roll'
                                  : item.quantity_m + ' x m')
                                :item.quantity + ' x roll'
                              }
                            </td>
                            <td>
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
                </div>

                <div className='row'>
                  <div className='col-2'>
                    <button className='btn btn-primary'>Submit</button>
                  </div>
                  <button className='btn btn-primary' onClick={e=>this.backClick(e)}>Back</button>
                </div>
              </form>
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

export default OrderPack;