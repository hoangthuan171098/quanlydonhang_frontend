import React, {Component} from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'

import Status from './component/status'

class OrderManager extends Component{
    constructor(props){
        super(props)
        this.state={
            loading: true,
            filter: {},
            orders: []
        }
    }

    async componentDidMount(){
        await axios
            .get(process.env.REACT_APP_BACKEND_URL + '/orders',{
                headers:{
                    'Authorization' : 'bearer ' + Cookie.get('token')
                }
            })
            .then(res=>{
                this.setState({orders:res.data})
            })
            .catch(err=>{
                console.log('Cannot connect to server')
            })
        this.setState({loading:false})
    }

    infoClick = (id) =>{
        this.props.history.push('/manager/orders/' + id)
    }

    render(){
        return(
            <div className='OrderManager'>
                <div className='module'>
                    <div className='module-head'>
                        <h2>Orders</h2>
                    </div>
                    <div className='module-option'>
                        <select onChange={(e)=>this.setState({filter:{...this.state.filter,status: e.target.value}})}>
                            <option value='all'>All</option>
                            <option value='waiting'>Waiting</option>
                            <option value='processing'>Processing</option>
                            <option value='waiting to deliver'>Waiting to deliver</option>
                            <option value='delivering'>Delivering</option>
                            <option value='delivered'>Delivered</option>
                            <option value='partial delivering'>Partial delivering</option>
                            <option value='partial delivered'>partial delivered</option>
                            <option value='done'>Done</option>
                            <option value='cancled'>Cancled</option>
                        </select>
                    </div>
                    <div className='module-body'>
                        <table className="table list-table">
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
                                {this.state.orders.reverse().map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td onClick={()=>this.infoClick(order.id)}>{order.id}</td>
                                        <td onClick={()=>this.infoClick(order.id)}>{order.buyer.username}</td>
                                        <td onClick={()=>this.infoClick(order.id)}>
                                            <Status status={order.status} />
                                        </td>
                                        <td onClick={()=>this.infoClick(order.id)}>
                                            {order.productList.map((item,index)=>{
                                                if(index === 2)
                                                    return(<p key={index}>...</p>);
                                                if(index === 3)
                                                    return <></>;
                                                return(
                                                    <p key={index}>{item.product.name + ': '}{item.quantity_m ? 
                                                        (item.quantity? 
                                                          item.quantity_m + ' x m,' + item.quantity + ' x roll'
                                                          : item.quantity_m + ' x m')
                                                        :item.quantity + ' x roll'
                                                      }
                                                    </p>
                                                )
                                            })}
                                        </td>
                                    </tr>
                                )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderManager