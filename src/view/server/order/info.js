import React, { Component } from 'react';
import Cookie from "js-cookie";

class OrderInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      order: {},
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


  render() {
    const clickUpdate = () =>{
        this.props.history.push('/admin/orders/' + this.state.product.id +'/update')
    }

    const clickBack = () =>{
        this.props.history.push('/admin/orders')
    }

    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="module">
            <div className="module-head">
                <h2>Order info</h2>

            </div>
            <div className="module-body m-auto w-75">

                <div className="table-responsive">
                <table className="table table-user-information">
                    <tbody>
                        <tr>        
                            <td>
                                <strong>
                                    Order ID:                                            
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.order.id}
                            </td>
                        </tr>
                        
                        <tr>        
                            <td>
                                <strong>
                                    Buyer:                                            
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.order.buyer.username}
                            </td>
                        </tr>

                        <tr>        
                            <td>
                                <strong>
                                    Status:                                            
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.order.status}
                            </td>
                        </tr>

                        <tr>    
                            <td>
                                <strong> 
                                    Product List:                                 
                                </strong>
                            </td>
                            <td className="text-primary">
                                <ul>
                                    {this.state.order.productList.map((item,index)=>{
                                        return(<li key={index}>{item.product.name}: {item.quantity}</li>)
                                    })}
                                </ul>
                            </td>
                        </tr>
                        
                        <tr>        
                            <td>
                                <strong>
                                    Create At:                                             
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.order.createdAt}
                            </td>
                        </tr>
                        
                        <tr>        
                            <td>
                                <strong>
                                    Last Update:                                           
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.order.updatedAt}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <button className="btn btn-primary" onClick={clickUpdate} style={{marginRight:30+"px"}}>Update</button>
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={clickBack}>Back</button>
                            </td>
                        </tr>                                
                    </tbody>
                </table>
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