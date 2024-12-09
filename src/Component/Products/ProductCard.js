import './ProductCard.css'
import React, { Component } from 'react'
import { MdAddShoppingCart } from "react-icons/md";

export default class ProductCard extends Component {
  render() {
    let {id , img , title , price} = this.props
    return (
      <div className='ProductCard-wrapper'>
        <div className='ProductCard-img-wrapper ProductCard-img-wrapper-max-500 ProductCard-img-wrapper-min-500
        ProductCard-img-wrapper-min-768 ProductCard-img-wrapper-min-1280'>
            <img src={img} alt="" />
        </div>
        <div className='ProductCard-details'>
            <div className='ProductCard-title'>{title}</div>
            <div className='ProductCard-price'>{price}$</div>
            <button className='ProductCard-btn'>
                <span>Add To Card</span>
                <MdAddShoppingCart />
            </button>
        </div>
      </div>
    )
  }
}