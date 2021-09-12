import React, { Component } from 'react';
import Cookie from "js-cookie";

class ProductInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      product: {},
    }
  }

  async componentDidMount() {
    if(Cookie.get('role') === 'Admin'){     
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/products/" + this.props.match.params.id,{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token'),
        },
      });
      if (!response.ok) {
        return
      }
      let data = await response.json();
      this.setState({ loading: false,authenticate: true, product: data });
      return
    }
    this.setState({authenticate: false});
  }


  render() {
    const clickUpdate = () =>{
        this.props.history.push('/admin/products/' + this.state.product.id +'/update')
    }

    const clickBack = () =>{
        this.props.history.push('/admin/products')
    }

    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="module">
            <div className="module-head">
                <h2>Product info</h2>
            </div>
            <div className="module-body">

                <div className="table-responsive w-75 m-auto">
                <table className="table table-product-information">
                    <tbody>
                        <tr>        
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-asterisk text-primary"></span>
                                    Product ID:                                            
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.product.id}
                            </td>
                        </tr>
                        <tr>    
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-user  text-primary"></span>    
                                    Name :                                       
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.product.name}
                            </td>
                        </tr>
                        <tr>    
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-user  text-primary"></span>    
                                    Description :                                       
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.product.description}
                            </td>
                        </tr>
                        <tr>    
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-user  text-primary"></span>    
                                    Category:                                       
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.product.category.name}
                            </td>
                        </tr>

                        <tr>    
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-user  text-primary"></span>    
                                    Price (1m2):                                       
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.product.price}
                            </td>
                        </tr>

                        <tr>    
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-user  text-primary"></span>    
                                    Roll size:                                      
                                </strong>
                            </td>
                            <td className="text-primary">
                                <ul>
                                    {this.state.product.rollSizes.map((item,index)=>{
                                        return(<li key={index}>{item.lengt}m x {item.width}m</li>)
                                    })}
                                </ul>
                            </td>
                        </tr>
                        
                        <tr>    
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-user  text-primary"></span>    
                                    Color:                                      
                                </strong>
                            </td>
                            <td className="text-primary">
                                <ul>
                                    {this.state.product.colors.map((item,index)=>{
                                        return(<li key={index} style={{color:item}}>{item}</li>)
                                    })}
                                </ul>
                            </td>
                        </tr>
                        
                        <tr>        
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-cloud text-primary"></span>  
                                    Create At:                                             
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.product.createdAt}
                            </td>
                        </tr>
                        
                        <tr>        
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-cloud text-primary"></span>  
                                    Last Update:                                           
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.product.updatedAt}
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
      return <h2 className="ProductList-title">You need to login</h2>
    }
    return (<h2 className="ProductList-title">Waiting for API...</h2>);
  }
}

export default ProductInfo;