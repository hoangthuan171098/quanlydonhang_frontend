import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookie from "js-cookie";
import axios from "axios";

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      categories: [],
      products: [],
      filter:{
          name: '',
          id: '',
          category: 'all'
      }
    }
  }

  async componentDidMount() {
    if(Cookie.get('role') === 'Admin'){
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/products",{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token')
        },
      });
      if (!response.ok) {
        return
      }let response2 = await fetch(process.env.REACT_APP_BACKEND_URL + "/product-categories",{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token')
        },
      });
      if (!response2.ok) {
        return
      }
      let products = await response.json();
      let categories = await response2.json();
      this.setState({ loading: false,authenticate: true, products: products,categories: categories });
      return
    }
    this.setState({authenticate: false});
  }

  HandleInfoClick = (id) =>{
    this.props.history.push('/admin/products/' + id)
  }


  render() {
    const clickUpdate = (id) =>{
      this.props.history.push('/admin/products/' + id + '/update')
    }

    const clickDestroy = (idProduct,idImage) =>{
      axios
        .delete(`http://localhost:1337/upload/files/`+idImage , {
          headers: { 'Content-Type': 'multipart/form-data','Authorization':'bearer '+ Cookie.get('token') },
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.response);
      });
      axios
        .delete(process.env.REACT_APP_BACKEND_URL + "/products/" + idProduct,{
          headers: {
            'Authorization':'bearer '+ Cookie.get('token'),
          },
        })
        .then(response => {
          alert('Destroy success.');
          window.location.href=('/admin/products')
        })
        .catch(error => {
          // Handle error.
          alert('Update failed !!!');
          console.log('An error occurred:', error.response);
        });
    }

    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="DataList product-list">
          <h2 className="DataList-title">Products ({this.state.products.length})</h2>
          <Link to="/admin/products/create"><button className="btn btn-primary"> Create A New Product</button></Link>
          <div className="DataList-container">
            <div className="DataList-filter">
              <form className="form-inline w-100">
                
              <div className='input-prepend'>
                <span className='add-on'>Name</span>
                <input
                  type="text"
                  onChange={e=>this.setState({filter:{...this.state.filter,name:e.target.value}})}
                />
              </div>

              <div className='input-prepend'>
                <span className='add-on'>ID</span>
                <input 
                  type="text"
                  onChange={e=>this.setState({filter:{...this.state.filter,id:e.target.value}})}
                />
              </div>

              <div className='input-prepend'>
                <span className='add-on'>Category</span>
                <select className='from-control'
                  onChange={e=>this.setState({filter:{...this.state.filter,category:e.target.value}})}
                >
                  <option value='all'>All</option>
                  {this.state.categories.map((category,index)=>{
                    return(
                      <option key={index} value={category.name}> {category.name} </option>
                    )
                  })}
                </select>
              </div>
                
              </form>
            </div>

            <table className="table">
              <thead>
              <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>createAt</th>
                  <th></th>
              </tr>
              </thead>
              <tbody>
                {this.state.products.filter(product=>
                  product.id.includes(this.state.filter.id)
                  && product.name.includes(this.state.filter.name)
                  &&
                  (this.state.filter.category==='all' ? true :  product.category.name===this.state.filter.category)
                ).map((product, index) => {
                  return (
                    <tr key={index}>
                      <td onClick={()=>this.HandleInfoClick(product.id)}>{product.id}</td>
                      <td onClick={()=>this.HandleInfoClick(product.id)}>{product.name}</td>
                      <td onClick={()=>this.HandleInfoClick(product.id)}>{product.category.name}</td>
                      <td onClick={()=>this.HandleInfoClick(product.id)}>{product.price}</td>
                      <td onClick={()=>this.HandleInfoClick(product.id)}>{product.createdAt.slice(0,10) + " " + product.createdAt.slice(11,16)}</td>
                      <td >
                        <i style={{fontSize:25 + "px",color:"blue",cursor:"pointer",marginRight:10 + "px"}} className="fa fa-edit" onClick={() =>clickUpdate(product.id)} ></i>
                        <i style={{fontSize:28 + "px",color:"red",cursor:"pointer"}} className="fa fa-remove" onClick={() =>clickDestroy(product.id,product.image.id)} ></i>
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
      return <h2 className="ProductList-title">You need to login</h2>
    }
    return (<h2 className="ProductList-title">Waiting for API...</h2>);
  }
}

export default ProductList;