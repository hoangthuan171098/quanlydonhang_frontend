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
        <div className="container product-update">

        <div className="row">

            <div className="col-xl-10 offset-xl-1">

                <h1 style={{fontSize: 50+'px'}}>Cập nhật sản phẩm</h1>


                <form onSubmit={clickSubmit}>

                    <div className="controls">

                      <div className="row col-lg-12">
                        <div className="form-group">
                            <label>Hình ảnh :</label>
                            <input className='form-control' id="img_input" type="file" name="files"
                              onChange={e=>{this.setState({images:e.target.files})}}/>
                            {this.imagePreview()}
                        </div>
                      </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="form_name">Tên :</label>
                                    <input id="form_name" type="text" className="form-control" value={this.state.product.name} required="required" size="50"
                                      data-error="Name is required." onChange={(e)=>this.setState({product:{...this.state.product,name:e.target.value}})}/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="form_description"> Mô tả :</label>
                                    <input id="form_description" type="text" className="form-control" value={this.state.product.description} required="required"
                                        data-error="Description is required." onChange={(e)=>this.setState({product:{...this.state.product,description:e.target.value}})}/>
                                </div>
                            </div>
                        </div>

                        <label>Kích thước cuộn:</label>
                        <div className="row">
                            <div className="col-lg-4">
                              <div className="form-group">
                                  <input type="number" placeholder="Dài (m)" className="form-control" value={this.state.rollSize.lengt}
                                      onChange={(e)=>this.setState({rollSize:{...this.state.rollSize,lengt:Number(e.target.value)}})} />
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div className="form-group">
                                  <input type="number" placeholder="Rộng (m)" className="form-control" value={this.state.rollSize.width}
                                      onChange={(e)=>this.setState({rollSize:{...this.state.rollSize,width:Number(e.target.value)}})} />
                              </div>
                            </div>

                            <div className="col-lg-2">
                              <button className="btn btn-primary" onClick={(e) => {this.addRollSize(e)}}> Thêm</button>
                            </div>
                        </div>

                        <div className='container' style={{marginBottom:20+'px'}}>
                          <this.rollSizes />
                        </div>
                        
                        <label>Màu :</label>
                        <div className="row">
                            <div className="col-lg-3">
                              <div className="form-group">
                                  <input type="color" className="form-control" value={this.state.color}
                                    id="color-select"  onChange={(e)=>this.setState({color:e.target.value})} />
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <button className="btn btn-primary" onClick={(e) => {this.addColor(e)}}> Thêm</button>
                            </div>
                        </div>
                        
                        <div className="container" style={{marginBottom:20+'px'}}>
                          <this.colors />
                        </div>

                        <div className="row col-lg-12">
                            <div className="form-group">
                                <label>Giá (1 m2) :</label>
                                <input type="number" className="form-control" value={this.state.product.price}
                                    onChange={(e)=>this.setState({product:{...this.state.product,price:e.target.value}})} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="form_category">Loại :</label>
                                    <select id="form-category" className="form-control" value={this.state.product.category.name} 
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

                        <div id="result" style={{color:"red"}}>
                        </div>

                        <input type="submit" className="btn btn-primary" value="Update" />
                        <button className="btn btn-primary" onClick={(e)=>clickBack(e)} style={{marginLeft: 30+'px'}} > Back</button>
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