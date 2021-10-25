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
                <div className="page-header">
                    <div className="page-block">
                        <div className="row align-items-center">
                            <div className="col-md-12 p-0">
                                <div className="page-header-title">
                                    <h5>ĐƠN HÀNG</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card'>
                    <div className='card-body'>
                        <div className='module-option'>
                            <select onChange={(e)=>this.setState({filter:{...this.state.filter,status: e.target.value}})}>
                                <option value='all'>Tất cả</option>
                                <option value='waiting'>Đang chờ</option>
                                <option value='processing'>Đang xử lý</option>
                                <option value='waiting to deliver'>Đợi giao hàng</option>
                                <option value='delivering'>Đang giao</option>
                                <option value='delivered'>Đã giao</option>
                                <option value='partial delivering'>Đang giao một phần</option>
                                <option value='partial delivered'>Đã giao một phần</option>
                                <option value='done'>Hoàn tất</option>
                                <option value='cancled'>Hủy</option>
                            </select>
                        </div>

                        <table className="table list-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Người mua</th>
                                    <th>Trạng thái</th>
                                    <th>Danh sách</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders
                                .sort((a,b)=>(new Date(b.updatedAt.slice(0,19)+'Z')) - (new Date(a.updatedAt.slice(0,19)+'Z')))
                                .map((order, index) => {
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