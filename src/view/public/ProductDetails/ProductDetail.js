import React, { Component } from "react";
import { connect } from "react-redux";
import { actFetchProductsRequest } from '../../../actions/index';
import ProductDetailItem from "./ProductDetailItem";
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        productdetail : []
    };
}
  componentDidMount(){
    this.props.fetchAllProducts();

  }
  render() {
    
    
    var { match } = this.props;
        if (match) {
            var id = match.params.productId;
            var { products } = this.props;
            
            for(var i=0;i<products.length;i++){
              if(products[i].id===id){
                return (
                  <ProductDetailItem  productdetail = {products[i]}/>
              );
                
              }
            }
        }
    
   
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);