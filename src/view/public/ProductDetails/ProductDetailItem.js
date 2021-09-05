import React, { Component } from 'react'
import ModalBuyProduct from '../Cart/ModalBuyProduct';
import Category from '../components/Category';
import { Link } from 'react-router-dom';

export default class ProductDetailItem extends Component {
    render() {
        var {productdetail} = this.props;
        console.log(productdetail)
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
                  <span>Detail</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="product-shop spad page-details">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <Category />
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="product-pic-zoom">
                      <img
                        className="product-big-img"
                        src={process.env.REACT_APP_BACKEND_URL + productdetail.image.url}
                        alt=""
                      />
                      <div className="zoom-icon">
                        <i className="fa fa-search-plus" />
                      </div>
                    </div>
                    <div className="product-thumbs">
                      <div className="product-thumbs-track ps-slider owl-carousel">
                        <div
                          className="pt active"
                          data-imgbigurl="img/product-single/product-1.jpg"
                        >
                          <img src={process.env.REACT_APP_BACKEND_URL + productdetail.image.url} alt="" />
                        </div>
                        <div
                          className="pt"
                          data-imgbigurl="img/product-single/product-2.jpg"
                        >
                          <img src={process.env.REACT_APP_BACKEND_URL + productdetail.image.url} alt="" />
                        </div>
                        <div
                          className="pt"
                          data-imgbigurl="img/product-single/product-3.jpg"
                        >
                          <img src={process.env.REACT_APP_BACKEND_URL + productdetail.image.url} alt="" />
                        </div>
                        <div
                          className="pt"
                          data-imgbigurl="img/product-single/product-3.jpg"
                        >
                          <img src={process.env.REACT_APP_BACKEND_URL + productdetail.image.url} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="product-details">
                      <div className="pd-title">
                        
                        <h3>{productdetail.name}</h3>
                        <Link to="#" className="heart-icon">
                          <i className="icon_heart_alt" />
                        </Link>
                      </div>
                      <div className="pd-rating">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-o" />
                        <span>(5)</span>
                      </div>
                      <div className="pd-desc">
                        <p>
                         {productdetail.description}
                        </p>
                        <h4>
                          {productdetail.price}$ <span>{productdetail.price}$</span>
                        </h4>
                      </div>
                      <div className="quantity">
                        <div className="pro-qty">
                          <input type="text" defaultValue={0} />
                        </div>
                        <Link to="#" className="primary-btn pd-cart" data-toggle="modal" data-target="#exampleModal">
                          Add To Cart
                        </Link>
                        <ModalBuyProduct />
                      </div>
                      <ul className="pd-tags">
                        <li>
                          <span>CATEGORIES</span>: {productdetail.category.name}
                        </li>
                      </ul>
                      <div className="pd-share">
                        <div className="p-code">Sku : 00012</div>
                        <div className="pd-social">
                          <Link to="#">
                            <i className="ti-facebook" />
                          </Link>
                          <Link to="#">
                            <i className="ti-twitter-alt" />
                          </Link>
                          <Link to="#">
                            <i className="ti-linkedin" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
        )
    }
}
