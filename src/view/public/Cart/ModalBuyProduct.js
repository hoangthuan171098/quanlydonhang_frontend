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
      quantity:0,
      color : "",
      quantity_m :0,
    }
  }

  handleMeter = (e) =>{
    this.setState({
      quantity_m : Number(e.target.value)
    })
  }
  handleQuantity = (e) =>{
    this.setState({
        quantity: Number(e.target.value)
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
    if(this.state.quantity === 0 && this.state.quantity_m === 0 ){
      alert('Xin hãy nhập số cuộn hoặc mét')
      return
    }
    let item = {
      product:
        {
          id:productdetail.id,
          name:productdetail.name,
          image: {url: productdetail.image.url},
          price : productdetail.price,
          description: productdetail.description
        },
      color: this.state.color,
      quantity: this.state.quantity,
      quantity_m : this.state.quantity_m
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
    console.log(productdetail.colors)
    return (
      <div className='ModalBuyProduct'>
        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content m-4">
              <div className="modal-header"> <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button> </div>
              <div className="modal-body p-0 row">
                <div className="col-12">
                  <h1 className="modal-title" id="exampleModalLabel">{productdetail.name}</h1>
                  <p><small className="para">{productdetail.description}</small></p>
                  <div className="form-group jkl pt-3"><input type="number" className="form-control inp" placeholder="Số Cuộn" onChange={(e)=>this.handleQuantity(e)}/></div>
                  <div className="form-group jkl pt-3"><input type="number" className="form-control inp" placeholder="Số mét" onChange={(e)=>this.handleMeter(e)}/></div>
                  <div className="mt-1"> <span className="fw-bold">Color</span>
                     <select onChange={(e) =>this.handlecolor(e)}> 
                      {productdetail.colors.map((item,index)=>{
                        return <option value={item}>{item}</option>
                      })}
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