import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookie from "js-cookie";
import axios from "axios";


class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      filter:{
        status: 'all',
        buyer: ''
      },
      orders: []
    }
  }

  async componentDidMount() {
    if(Cookie.get('role') === 'Admin'){     
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/orders",{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token'),
        },
      });
      if (!response.ok) {
        return
      }
      let orders = await response.json();
      this.setState({ loading: false,authenticate: true, orders: orders });
      return
    }
    this.setState({authenticate: false});
  }

  filterSubmmitHandle(){

  }


  render() {
    const clickInfo = (id) =>{
      this.props.history.push('/admin/orders/'+ id)
    }

    const clickUpdate = (id) =>{
      this.props.history.push("/admin/orders/" + id + "/update")
    }

    const clickDestroy = (id) =>{
      axios
        .delete(process.env.REACT_APP_BACKEND_URL + "/orders/" + id,{
          headers: {
            'Authorization':'bearer '+ Cookie.get('token'),
          },
        })
        .then(response => {
          alert('Destroy success.');
          window.location.href = "/admin/orders"
        })
        .catch(error => {
          alert('Destroy failed !!!');
          console.log('An error occurred:', error.response);
        });
    }


    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="DataList order-list">
          <h2 className="DataList-title">Orders ({this.state.orders.length})</h2>
          <Link to='/admin/orders/create'><button className='btn btn-primary'>Create New Order</button></Link>
          <div className="DataList-container">
            
            <div className="DataList-filter" onSubmit={this.filterSubmmitHandle}>
              <form className="form-inline w-100">
                <div className='input-prepend'>
                  <span className='add-on'>Buyer</span>
                  <input
                    type="text"
                    onChange={e=>this.setState({filter:{...this.state.filter,buyer:e.target.value}})}
                  />
                </div>
                <div className='input-prepend'>
                  <span className='add-on'>status</span>
                  <select value={this.state.filter.status}
                    onChange={e=>this.setState({filter:{...this.state.filter,status:e.target.value}})}>
                    <option value='all'>All</option>
                    <option value='checking'>Checking</option>
                    <option value='confirmed'>Confirmed</option>
                    <option value='delivering'>Delivering</option>
                    <option value='delivered'>Delivered</option>
                  </select>
                </div>
              </form>
            </div>

            <table className="table">
              <thead>
              <tr>
                  <th>ID</th>
                  <th>Buyer</th>
                  <th>Status</th>
                  <th>productList</th>
                  <th></th>
              </tr>
              </thead>
              <tbody>
                {this.state.orders.filter(order=>
                  order.buyer.username.includes(this.state.filter.buyer) &&
                  (this.state.filter.status==='all' ? true :  order.status===this.state.filter.status)
                ).reverse().map((order, index) => {
                  return (
                    <tr key={index}>
                      <td onClick={()=>clickInfo(order.id)}>{order.id}</td>
                      <td onClick={()=>clickInfo(order.id)}>{order.buyer.username}</td>
                      <td onClick={()=>clickInfo(order.id)}>{order.status}</td>
                      <td onClick={()=>clickInfo(order.id)}>
                        {order.productList.map((item,index)=>{
                            if(index === 2)
                                return(<p key={item.id}>...</p>);
                            if(index === 3)
                                return(<></>);
                            return(
                                <p>{item.product.name +" : " + item.quantity + " (cuộn)"}</p>
                            )
                        })}
                      </td>                   
                      <td>
                        <i style={{fontSize:25 + "px",color:"blue",cursor:"pointer",marginRight:10 + "px"}} className="fa fa-edit" onClick={() =>clickUpdate(order.id)} ></i>
                        <i style={{fontSize:28 + "px",color:"red",cursor:"pointer"}} className="fa fa-remove" onClick={() =>clickDestroy(order.id)} ></i>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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

export default OrderList