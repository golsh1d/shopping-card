import './ShoppingCardProduct.css'
import React, { Component } from 'react'
import { CgMathPlus } from "react-icons/cg";
import { CgMathMinus } from "react-icons/cg";
import { FaTrash } from "react-icons/fa6";

export default class ShoppingCardProduct extends Component {
  removeItem(id) {
      this.props.onRemove(id)
  }  

  increaseItem(id) {
      this.props.onIncrease(id)
  }
  
  decreaseItem(id) {
     this.props.onDecrease(id)
  } 

  render() {
    let {id , img , title , count } = this.props
    return (
      <div className='ShoppingCardProduct-wrapper'>
        <div className='ShoppingCardProduct-left-section'>
            <img src={img} alt="" />
            <div className='ShoppingCardProduct-title'>{title}</div>
            <CgMathPlus className='ShoppingCardProduct-cross-icon'/>
            <div className='ShoppingCardProduct-count'>{count}</div>
        </div>
        <div className='ShoppingCardProduct-right-section'>
            <CgMathPlus className='ShoppingCardProduct-plus-icon' onClick={this.increaseItem.bind(this , id)}/>
            <div className='ShoppingCardProduct-count'>{count}</div>
            <CgMathMinus className='ShoppingCardProduct-minus-icon' onClick={this.decreaseItem.bind(this , id)}/>
            <FaTrash className='ShoppingCardProduct-trash-icon' onClick={this.removeItem.bind(this , id)}/>
        </div>
      </div>
    )
  }
}