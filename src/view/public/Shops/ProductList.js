import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProducItem from "./ProducItem";
import { connect } from "react-redux";
import { actFetchProductsRequest } from '../../../actions/index';
import Category from "../components/Category";
import ShopBar from "../components/ShopBar";
import '../style/productlist.css';
class ProductList extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      search : "",
      sort: 'asc'
    }
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }
  onSort = sortType =>{
    this.setState({sortType})
  }
  render() {
    var { products } = this.props;
    const {sortType} = this.state;
    const filterItem = products.filter(item => {
      if(item.description){
        return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || item.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || item.price.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      }
      return 1
    })

    const sorted = products.sort((a,b)=>{
      const isReversed = (sortType === 'asc') ? 1 : -1;
      return isReversed * a.name.localeCompare(b.name)
    })
    return (

      <div className='shops'>
        <div className="breacrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-text">
                  <Link to="/">
                    <i className="fa fa-home" /> Home
                  </Link>
                  <span>Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ShopBar />

        {/* Breadcrumb Section Begin */}
        {/* Product Shop Section Begin */}
        <section className="product-shop spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
                
                <Category />

                <div className="filter-widget">
                  <h4 className="fw-title">Color</h4>
                  <div className="fw-color-choose">
                    <div className="cs-item">
                      <input type="radio" id="cs-black" />
                      <label className="cs-black" htmlFor="cs-black">
                        Black
                      </label>
                    </div>
                    <div className="cs-item">
                      <input type="radio" id="cs-violet" />
                      <label className="cs-violet" htmlFor="cs-violet">
                        Violet
                      </label>
                    </div>
                    <div className="cs-item">
                      <input type="radio" id="cs-blue" />
                      <label className="cs-blue" htmlFor="cs-blue">
                        Blue
                      </label>
                    </div>
                    <div className="cs-item">
                      <input type="radio" id="cs-yellow" />
                      <label className="cs-yellow" htmlFor="cs-yellow">
                        Yellow
                      </label>
                    </div>
                    <div className="cs-item">
                      <input type="radio" id="cs-red" />
                      <label className="cs-red" htmlFor="cs-red">
                        Red
                      </label>
                    </div>
                    <div className="cs-item">
                      <input type="radio" id="cs-green" />
                      <label className="cs-green" htmlFor="cs-green">
                        Green
                      </label>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                <div className="product-show-option">
                  <div class="blog-sidebar">
                    <div class="search-form">
                      <h4>Search</h4>
                      <form>
                        <input
                          type="text"
                          placeholder="Search . . .  "
                          onChange={(e) =>
                            this.setState({ search: e.target.value })
                          }
                        />
                        <button type="submit">
                          <i class="fa fa-search"></i>
                        </button>
                        
                      </form>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-7 col-md-7">
                    
                    <div className="dropdown">
                      <Link className="btn btn-secondary dropdown-toggle" to="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Sort<i class="fas fa-filter"></i>
                      </Link>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink  ">
                        
                        <Link className="dropdown-item" onClick={() =>this.onSort('asc')}>ASC</Link>
                        <Link className="dropdown-item" onClick={() =>this.onSort('desc')}>DESC</Link>
                        
                      </div>
                    </div>
                    {/* <label for="cars">Choose a car:</label>
                      <button onClick={() =>this.onSort('asc')}>asc</button>
                      <button onClick={() =>this.onSort('desc')}>desc</button> */}
                      {/* <select name="cars" id="cars">
                        <option value="volvo" onClick={() =>this.onSort('asc')}>asc</option>
                        <option value="saab" onClick={() =>this.onSort('desc')}>desc</option>
                      </select> */}
                    </div>
                    <div className="col-lg-5 col-md-5 text-right">
                      <p>Show 01- 09 Of 36 Product</p>
                    </div>
                  </div>
                </div>
                <div className="product-list">
                  <div className="row">
                   
                   {
                    sorted&&filterItem.map((product,index) =>{
                      return(
                        <ProducItem
                            key={index}
                            product={product}
                            
                        />
                      )
                    })
                   }
                  </div>
                </div>
                <div className="loading-more">
                  <i className="icon_loading" />
                  <Link to='#'>Loading More</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      products: state.products
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
      fetchAllProducts : () => {
          dispatch(actFetchProductsRequest());
      },
      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
