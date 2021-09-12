import React, { Component } from 'react';
import Cookie from "js-cookie";
import axios from "axios";
import * as XLSX from 'xlsx';

class ProductCreate extends Component {
  constructor(props) {
    super(props);

    
    this.inputRef= React.createRef();

    this.state = {
      loading: true,
      authenticate: true,
      imagePreviewUrl: '',
      categories:{},
      images: [],
      files: [],
      rollSize:{lengt:"",width:""},
      color: "#000000",
      product: {
        name: "",
        description: "",
        category: {name: "none"},
        price: "",
        rollSizes: [],
        colors: []
      },
    }
  }

  async componentDidMount() {
    if(Cookie.get('role') === 'Admin'){     
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/product-categories",{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token')
        },
      });
      if (!response.ok) {
        return
      }

      let categoryList = await response.json();
      this.setState({ loading: false, authenticate: true, categories: categoryList });
      return
    }
    this.setState({authenticate: false});
  }



  // create many products throungh excel file
  handleUpload = (e) => {
    e.preventDefault();
    var files = this.state.files, f = files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
        var data = e.target.result;
        let readedData = XLSX.read(data, {type: 'binary'});
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];

        /* Convert array to csv*/
        const dataParse = XLSX.utils.sheet_to_csv(ws, {header:1});
        let dataLine = dataParse.split('\n');
        for(let i=1; i<dataLine.length-1; i++){
          let productData = dataLine[i].split(',');
          let rollSizes = productData[2].split(' ');
          let colorList = productData[3].split(' ');
          let filePath = productData[6]
          let rollSizeList=[];
          for(let index in rollSizes){
            let lengtRoll = Number(rollSizes[index].split('x')[0]);
            let widthRoll = Number(rollSizes[index].split('x')[1]);
            let data = {lengt: lengtRoll, width: widthRoll};
            rollSizeList.push(data);
          }
          let category = this.state.categories.filter((i)=>i.name===productData[5])[0];

          let pathList = filePath.split('\\')
          let fileName = pathList[pathList.length-1]

          axios
            .post(process.env.REACT_APP_BACKEND_URL + '/products/', {
              name: productData[0],
              description: productData[1],
              category: category,
              price: productData[4],
              rollSizes: rollSizeList,
              colors: colorList
            },{
              headers: {
                'Authorization':'bearer '+ Cookie.get('token'),
              },
            })
            .then(async (response) => {
              await axios
                .post(`http://localhost:1337/product-upload`, {
                  fileName: fileName,
                  filePath: filePath,
                  productId: response.data.id
                }, {
                  headers: {'Authorization':'bearer '+ Cookie.get('token') },
                })
                .then(res => {
                  console.log( i+ '.Create product '+ productData[0]  +' success!!');
                })
                .catch(err => {
                  console.log(i+'.Cannot upload image of product'+ productData[0] + '!!!');
              })
            })
            .catch(error => {
              console.log(i+ '.Cannot create product '+ productData[0], error.response);
            })
        }
    };
    reader.readAsBinaryString(f);
    return;
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
    if(this.state.images.length === 0){
      return
    }
    return(
      <img className='image-preview' src={URL.createObjectURL(this.state.images[0])} alt=""></img>
    )
  }

  render() {
    const clickSubmit = (event) =>{
      event.preventDefault();
      if(Number(this.state.product.price) < 1){
        alert("You must fill the price");
        return
      }
      axios
        .post(process.env.REACT_APP_BACKEND_URL + '/products/', {
          description: this.state.product.description,
          name: this.state.product.name,
          category: this.state.product.category,
          price: this.state.product.price,
          rollSizes: this.state.product.rollSizes,
          colors: this.state.product.colors
        },{
          headers: {
            'Authorization':'bearer '+ Cookie.get('token'),
          },
        })
        .then(async (response) => {
          const formData = new FormData();
          Array.from(this.state.images).forEach(image => {
            formData.append('files', image);
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
          alert('cannot create product !!!');
          console.log('An error occurred:', error.response);
        });

      return;
    }

    const clickBack = async (event) =>{
      event.preventDefault()
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

    const handleChangeImage = (e) =>{
      e.preventDefault()
      this.setState({images:e.target.files})
    }


    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="product-create">

        <div className="module">
          <div className='module-head'>
            <h2>Create product</h2>
          </div>

            <div className="module-body">
                <form>
                    <div className="form-group">
                      <label> Upload file excel: </label>
                      <div className='d-flex'>
                        <input className='excel-input' type='file' onChange={(e)=>this.setState({files: e.target.files})} accept=".xls,.xlsx,.csv" />
                        <button className='btn-upload-excel btn btn-primary' onClick={(e)=>this.handleUpload(e)} > Upload </button>
                      </div>
                    </div>

                    <hr/>

                    <div className="controls">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Name :</label>
                                    <input type="text" className="row-fluid" value={this.state.product.name} required="required" size="50"
                                      data-error="Name is required." onChange={(e)=>{this.setState({product:{...this.state.product,name:e.target.value}})}}/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label> Description :</label>
                                    <input type="text" className="row-fluid" value={this.state.product.description} required="required"
                                        data-error="Description is required." onChange={(e)=>this.setState({product:{...this.state.product,description:e.target.value}})}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                          <div className='col-lg-6'>
                            <div className="form-group">
                                <label>Price (1 m2) :</label>
                                <input type="number" className="row-fluid" value={this.state.product.price}
                                    onChange={(e)=>this.setState({product:{...this.state.product,price:e.target.value}})} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Category :</label>
                                    <select className="row-fluid" value={this.state.product.category.name} 
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
                        <div className="row">
                        </div>

                        <div className="row">
                          <div className='col-8'>
                            <div className="form-group">
                                <label>Image :</label>
                                <input ref={this.inputRef} class='img-input' type="file" required
                                  onChange={e=>{handleChangeImage(e)}}/>
                                {this.imagePreview()}
                            </div>
                          </div>
                        </div>
                        
                      <div class='row'>
                        <div class='col-2'>
                          <button className="btn btn-primary" onClick={(e)=>clickSubmit(e)} > Submit</button>
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

export default ProductCreate;