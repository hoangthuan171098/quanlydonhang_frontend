import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class ProducItem extends Component {
    render() {
      var { product } = this.props;
     
        return (
            <div className="col-lg-4 col-sm-6"  >
              <div className="product-item">
                <div className="pi-pic">
                  <img
                    src={process.env.REACT_APP_BACKEND_URL + product.image.url}
                    alt=""
                  />
                  <div className="sale pp-sale">{product.category.name}</div>
                  <div className="icon">
                    <i className="icon_heart_alt" />
                  </div>
                  <ul>
                    <li className="w-icon active">
                      <Link to='#'>
                        <i className="icon_bag_alt" />
                      </Link>
                    </li>
                    <li className="quick-view">
                      <Link to={`/product/${product.id}`}>+ Quick View</Link>
                    </li>
                    <li className="w-icon">
                      <Link to='#'>
                        <i className="fa fa-random" />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="pi-text">
                  <div className="catagory-name">
                    {product.name}
                  </div>
                  <Link to='#'>
                    <h5>{product.description}</h5>
                  </Link>
                  <div className="product-price">
                    {product.price}
                    <span> {product.price}</span>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}
