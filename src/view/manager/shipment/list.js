import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Cookie from 'js-cookie'

class ShipmentList extends Component{
    constructor(props){
        super(props)
        this.state={
            loading: true,
            filter: {},
            shipments: []
        }
    }

    async componentDidMount(){
        await axios
            .get(process.env.REACT_APP_BACKEND_URL + '/shipments',{
                headers:{
                    'Authorization' : 'bearer ' + Cookie.get('token')
                }
            })
            .then(res=>{
                this.setState({shipments:res.data})
            })
            .catch(err=>{
                console.log('Cannot connect to server')
            })
        this.setState({loading:false})
    }

    infoClick = (id) =>{
        this.props.history.push('/manager/shipments/' + id)
    }

    render(){
        return(
            <div className='ShipmentManager'>
                <div className='module'>
                    <div className='module-head'>
                        <h2>Shipments</h2>
                    </div>
                    <div className='module-option'>
                        <select onChange={(e)=>this.setState({filter:{...this.state.filter,status: e.target.value}})}>
                            <option value='all'>All</option>
                            <option value='waiting to deliver'>Waiting to deliver</option>
                            <option value='delivering'>Delivering</option>
                            <option value='delivered'>Delivered</option>
                            <option value='cancled'>Cancled</option>
                        </select>
                    </div>
                    <div className='module-body'>
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
                                {this.state.shipments.reverse().map((shipment, index) => {
                                return (
                                    <tr key={index}>
                                        <td onClick={()=>this.infoClick(shipment.id)}>{shipment.id}</td>
                                        <td onClick={()=>this.infoClick(shipment.id)}>{shipment.buyer.username}</td>
                                        <td onClick={()=>this.infoClick(shipment.id)}>{shipment.status}</td>
                                        <td onClick={()=>this.infoClick(shipment.id)}>
                                            {shipment.productList.map((item,index)=>{
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

export default ShipmentList