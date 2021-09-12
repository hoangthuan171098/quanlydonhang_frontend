import React, { Component } from 'react';
import Cookie from "js-cookie";
import axios from "axios";

class ProductUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      rollSize:{lengt:"",width:""},
      color: "#000000",
      files: [],
      product: {}
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
      this.setState({ loading: false, authenticate: true, product: data});
      return
    }
    this.setState({authenticate: false});
  }

  addRollSize = (event) =>{
    event.preventDefault();
    if(this.state.rollSize.lengt<1 || this.state.rollSize.width<1){
      alert("Chiều dài và rộng phải lớn hơn 0!");
      return;
    }
    for(const index in this.state.product.rollSizes){
      let value=this.state.product.rollSizes[index];
      if(value.width===this.state.rollSize.width && value.lengt===this.state.rollSize.lengt){
        alert("Kích thước cuộn đã tồn tại!");
        return;
      }
    }
    let list = this.state.product.rollSizes;
    list.push(this.state.rollSize);
    this.setState({product:{...this.state.product,rollSizes:list},rollSize:{lengt:"",width:""}});
  }

  addColor = (event) =>{
    event.preventDefault();
    let list = this.state.product.colors;
    list.push(this.state.color);
    this.setState({product:{...this.state.product,colors:list},color:"#000000"});
  }

  destroyRollSize = (event,indexDestroy) =>{
    event.preventDefault();
    let list = this.state.product.rollSizes;
    list.splice(indexDestroy,1);
    this.setState({product:{...this.state.product,rollSizes: list}});
  }

  destroyColor = (event,indexDestroy) =>{
    event.preventDefault();
    let list = this.state.product.colors;
    list.splice(indexDestroy,1);
    this.setState({product:{...this.state.product,colors: list}});
  }

  rollSizes = () =>{
    let returnList = [];
    this.state.product.rollSizes.map((item,index)=>{
      returnList.push(
        <button className="destroy-rollSize" onClick={(e)=>{this.destroyRollSize(e,index)}}
          key={index}>{item.lengt}x{item.width}</button>
      );
      return 1;
    })
    return (
      <>
      {returnList}<br/>
      </>
    );
  }

  colors = () =>{
    let returnList = [];
    this.state.product.colors.map((item,index)=>{
      returnList.push(
        <button className="destroy-color" onClick={(e)=>{this.destroyColor(e,index)}}
          style={{backgroundColor:item}}  key={index}>{item}</button>
      );
      return 1;
    })
    return (
      <>
      {returnList}<br/>
      </>
    );
  }

  imagePreview = () =>{
    if(this.state.files.length === 0){
      return(
        <img className='image-preview' src={process.env.REACT_APP_BACKEND_URL + this.state.product.image.url} alt=""></img>
      )
    }
    return(
      <img className='image-preview' src={URL.createObjectURL(this.state.images[0])} alt=""></img>
    )
  }

  render() {
    const clickSubmit = async (event) =>{
      event.preventDefault();
      if(Number(this.state.product.price) < 1 && Number(this.state.product.price2) < 1){
        alert("You must input at least 1 price value");
        return
      }

      await axios
        .delete(`http://localhost:1337/upload/files/`+this.state.product.image.id , {
          headers: { 'Content-Type': 'multipart/form-data','Authorization':'bearer '+ Cookie.get('token') },
        })
        .then(res => {
        })
        .catch(err => {
          console.log(err.response);
      });

      axios
        .put(process.env.REACT_APP_BACKEND_URL + '/products/' + this.state.product.id, {
          description: this.state.product.description,
          name: this.state.product.name,
          category: this.state.product.category,
          price: this.state.product.price,
          colors: this.state.product.colors,
          rollSizes: this.state.product.rollSizes
        },{
          headers: {
            'Authorization':'bearer '+ Cookie.get('token'),
          },
        })
        .then(async (response) => {
          console.log(this.state.images)
          const formData = new FormData();
          Array.from(this.state.images).forEach(image => {
            formData.append('files', image);
            console.log(image);
          });

          formData.append('ref','product');
          formData.append('refId',response.data.id);
          formData.append('field','image');
          await axios
            .post(`http://localhost:1337/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data','Authorization':'bearer '+ Cookie.get('token') },
            })
            .then(res => {
            console.log(res);
            alert("Create product success!!")
            })
            .catch(err => {
              alert('cannot create product !!!');
              console.log(err.response);
          });
          this.props.history.push('/admin/products')
        })
        .catch(error => {
          alert('Update failed !!!');
          console.log('An error occurred:', error.response);
        });
      return;
    }

    const clickBack = (event) =>{
      event.preventDefault();
      this.props.history.push('/admin/products')
    }

    const handleChangeCategory = async (categoryName) =>{
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + '/product-categories?name=' + categoryName ,{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token'),
        },
      });
      if (!response.ok) {
        return;
      }
      let data = await response.json();
      this.setState({ product: {...this.state.product,category: data[0]}});
    }


    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="product-update">

        <div className="module">
            <div className='module-head'>
              <h2>Update product</h2>
            </div>

            <div className="module-body">


                <form onSubmit={clickSubmit}>

                    <div className="controls">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Name :</label>
                                    <input type="text" className="row-fluid" value={this.state.product.name} required="required" size="50"
                                      data-error="Name is required." onChange={(e)=>this.setState({product:{...this.state.product,name:e.target.value}})}/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label> Description:</label>
                                    <input type="text" className="row-fluid" value={this.state.product.description} required="required"
                                        data-error="Description is required." onChange={(e)=>this.setState({product:{...this.state.product,description:e.target.value}})}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                          <div className='col-6'>
                            <div className="form-group">
                                <label>Price (1 m2) :</label>
                                <input type="number" value={this.state.product.price} className='row-fluid'
                                    onChange={(e)=>this.setState({product:{...this.state.product,price:e.target.value}})} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                              <div className="form-group">
                                  <label>Loại :</label>
                                  <select value={this.state.product.category.name} className='row-fluid'
                                    onChange={(e)=>handleChangeCategory(e.target.value)}>
                                      <option value="none">select category</option>
                                      <option value="cotton"> cotton</option>
                                      <option value="kaki"> kaki</option>
                                      <option value="kate"> kate</option>
                                      <option value="jean"> jean</option>
                                      <option value="denim"> denim</option>
                                  </select>
                              </div>
                          </div>
                        </div>

                        <div className="row col-lg-12">
                          <div className="form-group">
                              <label>Image :</label>
                              <input type="file" name="files" class='img-input'
                                onChange={e=>{this.setState({images:e.target.files})}}/>
                              {this.imagePreview()}
                          </div>
                        </div>

                        <div class='row'>
                          <div class='col-2'>
                            <button className="btn btn-primary" onClick={(e)=>clickSubmit(e)} > Update</button>
                          </div>
                          <button className="btn btn-primary" onClick={(e)=>clickBack(e)} > Back</button>
                        </div>
                    </div>
                </form>
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

export default ProductUpdate;