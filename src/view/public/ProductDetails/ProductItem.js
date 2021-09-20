import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class ProductItem extends Component {
    render() {
        return (
            <div className="ProductItem">
                   <div className="breacrumb-section">
                        <div className="container">
                            <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-text product-more">
                                <Link to="/">
                                    <i className="fa fa-home" /> Home
                                </Link>
                                <Link to="">Shop</Link>
                                <span>Detail</span>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
        
            </div>
        )
    }
}
