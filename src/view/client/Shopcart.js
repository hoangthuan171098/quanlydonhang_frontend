import React, { Component } from "react";
import Cookie from 'js-cookie';
import { Link } from "react-router-dom";
import axios from "axios";


export default class Shopcart extends Component {
  constructor(props){
    super(props);
    this.state ={
      loading :true,
      authenticate: true,
      note: '',
      productList: []
    }
  }

  async componentDidMount(){
    let itemListString = Cookie.get('cart')
    
    if(typeof(itemListString)=== "string" && itemListString !==undefined){
      let itemList = JSON.parse(itemListString)
      this.setState({productList: itemList})
    }
  }


  checkOutClick = () =>{
      axios
        .post(process.env.REACT_APP_BACKEND_URL + '/orders',{
          status:'waiting',
          productList : this.state.productList,
          note:this.state.note,
          buyer:Cookie.get('id')
        },{
          headers:{
            'Authorization':'bearer '+ Cookie.get('token'),
          }
        })
        .then(response =>{
          alert('Da dat hang thanh cong');
          Cookie.remove('cart');
          this.props.location.push('/purchase');
        })
        .catch(err => {
        })
  }
  updateMeterClick = (event,index) =>{
    let productList = this.state.productList
    productList[index].quantity_m = Number(event.target.value)
    this.setState({productList:productList})
    Cookie.set('cart',JSON.stringify(productList))
  }
  updateProductClick = (event,index) =>{
    let productList = this.state.productList
    productList[index].quantity = Number(event.target.value)
    this.setState({productList:productList})
    Cookie.set('cart',JSON.stringify(productList))
    
  }
  removeProductClick = (event,index) =>{
    event.preventDefault()
    let productList = this.state.productList
    productList.splice(index,1)
    this.setState({productList:productList})
    console.log(this.state.productList)
    Cookie.set('cart',JSON.stringify(productList))
  }

  render() {
    return (
      <div>
        <div className="breacrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-text product-more">
                  <Link to="/">
                    <i className="fa fa-home" /> Home
                  </Link>
                  <Link to="/products">Shop</Link>
                  <span>Shopping Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="shopping-cart spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="cart-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Hình Ảnh</th>
                        <th className="p-name">Tên Sản Phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Mét</th>
                        <th>Tổng tiền</th>
                        <th>
                          <i className="ti-close" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.productList.map((item,index)=>{
                        return(
                          <tr key={index}>
                            <td className="cart-pic first-row">
                              <img style={{width:200+'px'}}
                                src={process.env.REACT_APP_BACKEND_URL + item.product.image.url} alt="" 
                              />
                            </td>
                            <td className="cart-title first-row">
                              <h5>{item.product.name}</h5>
                            </td>
                            <td className="p-price first-row">{item.product.price}</td>
                            <td className="qua-col first-row">
                              <div className="quantity">
                                <div className="pro-qty">
                                  <input type="text" defaultValue={item.quantity} 
                                    onChange = {(e) =>this.updateProductClick(e,index)}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="qua-col first-row">
                              <div className="quantity">
                                <div className="pro-qty">
                                  <input type="text" defaultValue={item.quantity_m} 
                                    onChange = {(e) =>this.updateMeterClick(e,index)}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="total-price first-row">{item.product.price*item.quantity}</td>
                            <td className="close-td first-row">
                              <i className="ti-close" onClick={e=>this.removeProductClick(e,index)}/>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <label>NOTE :</label><br/>
                <textarea cols='65' onChange={e=>this.setState({note:e.target.value})} />
                <div className="row">
                  <div className="col-lg-4">
                    <div className="cart-buttons">
                      <Link to="/products" className="primary-btn continue-shop">
                        Continue shopping
                      </Link>
                    </div>
                    <div className="discount-coupon">
                      <h6>Discount Codes</h6>
                      <form action="#" className="coupon-form">
                        <input type="text" placeholder="Enter your codes" />
                        <button type="submit" className="site-btn coupon-btn">
                          Apply
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-4 offset-lg-4">
                    <div className="proceed-checkout">
                      <Link to="#" onClick={this.checkOutClick} className="proceed-btn">
                        PROCEED TO CHECK OUT
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
