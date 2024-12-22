import './ProductCard.css'
import React from 'react'
import { MdAddShoppingCart } from "react-icons/md";

export default function ProductCard (props) {
  function clickHandler(id) {
    props.onClick(id)
  }
  
  return (
    <div className='ProductCard-wrapper'>
      <div className='ProductCard-img-wrapper ProductCard-img-wrapper-max-500 ProductCard-img-wrapper-min-500
      ProductCard-img-wrapper-min-768 ProductCard-img-wrapper-min-1280'>
          <img src={props.img} alt="" />
      </div>
      <div className='ProductCard-details'>
          <div className='ProductCard-title'>{props.title}</div>
          <div className='ProductCard-price'>{props.price}$</div>
          <button className='ProductCard-btn' onClick={() => clickHandler(props.id)}>
              <span>Add To Card</span>
              <MdAddShoppingCart />
          </button>
      </div>
    </div>
  )
}