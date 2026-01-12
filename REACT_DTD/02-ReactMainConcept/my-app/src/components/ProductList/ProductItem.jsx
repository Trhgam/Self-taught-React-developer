import React, { Component } from 'react'

export default class ProductItem extends Component {
  render() {
    const product = this.props.product;
    return (
      <div className="product-item" >
            <input />
            {product.name} - {product.avatar}
        </div>
    )
  }
}
