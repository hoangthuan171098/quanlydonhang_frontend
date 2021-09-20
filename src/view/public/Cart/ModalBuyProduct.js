import axios from "axios";
import Cookie from "js-cookie";
import React, { Component } from "react";
import { withRouter } from "react-router";
import './styles/buycart.scss'

class ModalBuyProduct extends Component {
  constructor(props){
    super(props);
    this.state ={
      loading :true,
      authenticate: true,
      quantity:1,
      color : "RED",
      met :1
    }
  }
  handleMeter = (e) =>{
    this.setState({
      met : e.target.value
    })
  }
  handleQuantity = (e) =>{
    this.setState({
        quantity: e.target.value
    })
  }
  handlecolor = (e) =>{
    this.setState({
      color : e.target.value
    })
  }
  handlenote = (e) =>{
    this.setState({
      note: e.target.value
    })
  }

  addtocart = () =>{
    var {productdetail} = this.props;
    let item = {
      product:       
        {
          id:productdetail.id,
          name:productdetail.name,
          image: {url: productdetail.image.url},
          price : productdetail.price
        },
      color: this.state.color,
      quantity: Number(this.state.quantity),
      quantity_m : Number(this.state.met)
    }
    let itemList = Cookie.get('cart')
    if(typeof(itemList)=== "string" && itemList !==undefined){
      console.log('a')
      let list = JSON.parse(itemList)
      let newlist = [...list,item]
      Cookie.set('cart',JSON.stringify(newlist))
    }
    else{
      Cookie.set('cart',JSON.stringify([item]))
    }
    alert('Them san pham vao gio hang thanh cong!')
    
  }
  render() {
    
    var {productdetail} = this.props;
    return (
      <div className='ModalBuyProduct'>
        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header"> <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button> </div>
              <div className="modal-body p-0 row">
                <div className="col-12">
                  <h1 className="modal-title" id="exampleModalLabel">{productdetail.name}</h1>
                  <p><small className="para">{productdetail.description}</small></p>
                  <div className="form-group jkl"><input type="number" className="form-control inp" placeholder="Số Cuộn" onChange={(e)=>this.handleQuantity(e)}/></div>
                  <div className="form-group jkl"><input type="number" className="form-control inp" placeholder="Số mét" onChange={(e)=>this.handleMeter(e)}/></div>
                  <div className="mt-1"> <span className="fw-bold">Color</span>
                    <select onChange={(e) =>this.handlecolor(e)}>
                      <option value="RED">Đỏ</option>
                      <option value="PURPIL">Tím</option>
                      <option value="YELLOW">Vàng</option>
                      <option value="GREEN">Xanh Lục</option>
                      <option value="BLACK">Đen</option>
                      <option value="WHITE">Trắng</option>
                      <option value="PINK">Hồng</option>
                      <option value="BLUE">Xanh Dương</option>
                    </select>
                  </div>

                  <div className="form-group rty">
                    <button  type="button" className="btn btn-dark mt-3"
                      onClick ={() =>this.addtocart()}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    );
  }
}

export default withRouter(ModalBuyProduct)