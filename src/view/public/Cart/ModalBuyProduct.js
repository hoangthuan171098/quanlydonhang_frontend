import axios from "axios";
import Cookie from "js-cookie";
import React, { Component } from "react";
import './styles/buycart.scss'

export default class ModalBuyProduct extends Component {
  constructor(props){
    super(props);
    this.state ={
      loading :true,
      authenticate: true,
      quantity:1,
      cart : 0,
      note: "",
      hadlecolor : "Red",
    }
  }
  handleQuantity = (e) =>{
    this.setState({
        quantity: e.target.value
    })
  }
  handlecolor = (e) =>{
    this.setState({
      handlecolor : e.target.value
    })
  }
  handlenote = (e) =>{
    this.setState({
      note: e.target.value
    })
  }
  addtocart = () =>{
    var {productdetail} = this.props;
      axios
        .post(process.env.REACT_APP_BACKEND_URL + '/orders',{
          status: "checking",
          productList :[
            {product:
              {
                id:productdetail.id,
                name:productdetail.name,
                image: productdetail.image.url,
                price : productdetail.price
              }
            
            ,color:this.state.handlecolor
            ,quantity:this.state.quantity}
          ]
          ,note:this.state.note,
          buyer:Cookie.get('id')
        },{
          headers:{
            
            'Authorization':'bearer '+ Cookie.get('token'),
          }
        })
        .then(response =>{
          Cookie.set('cart',)
          alert('thanh cong');
          window.location.href ='/shoppingcart';
        })
        .catch(err => {
          alert('loi!');
        })
  
  }
  render() {
    
    var {productdetail} = this.props;
    return (
      <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content m-4">
            <div className="modal-header"> <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button> </div>
            <div className="modal-body p-0 row">
              <div className="col-12 col-lg-6 p-0"> <img src={process.env.REACT_APP_BACKEND_URL + productdetail.image.url} width="100%" height="100%" /> </div>
              <div className="col-12 col-lg-6 pl-5">
                <h1 className="modal-title" id="exampleModalLabel">{productdetail.name}</h1>
                <p><small className="para">{productdetail.description}</small></p>
                <div className="form-group jkl pt-3"><input type="email" className="form-control inp" placeholder="Số Cuộn" onChange={(e)=>this.handleQuantity(e)}/></div>
                <div className="mt-1"> <span className="fw-bold">Color</span>
                <select name="cars" id="cars" onChange={(e) =>this.handlecolor(e)}>
                  <option value="volvo">Đỏ</option>
                  <option value="saab">Tím</option>
                  <option value="opel">Vàng</option>
                  <option value="audi">Xanh Lục</option>
                  <option value="audi">Đen</option>
                  <option value="audi">Trắng</option>
                  <option value="audi">Xám</option>
                  <option value="audi">Hồng</option>
                  <option value="audi">Nâu</option>
                  <option value="audi">Xanh Dương</option>
                </select>
                </div>
                
                <div className="form-group mt-1">
                  <label for="exampleFormControlTextarea3">ghi chu</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" onChange={(e) =>this.handlenote(e)}></textarea>
                </div>
                <div className="form-group rty">
                
                <button
                  type="button" 
                  className="btn btn-dark mt-3"
                  onClick ={() =>this.addtocart()}
                  >
                Thêm vào giỏ hàng</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}