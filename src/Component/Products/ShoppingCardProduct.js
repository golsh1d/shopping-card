import './ShoppingCardProduct.css'
import React from 'react'
import { CgMathPlus } from "react-icons/cg";
import { CgMathMinus } from "react-icons/cg";
import { FaTrash } from "react-icons/fa6";

export default function ShoppingCardProduct (props) {
  function removeItem(id) {
    props.onRemove(id)
  }  

  function increaseItem(id) {
    props.onIncrease(id)
  }
  
  function decreaseItem(id) {
    props.onDecrease(id)
  } 

  return (
    <div className='ShoppingCardProduct-wrapper'>
      <div className='ShoppingCardProduct-left-section'>
          <img src={props.img} alt="" />
          <div className='ShoppingCardProduct-title'>{props.title}</div>
          <CgMathPlus className='ShoppingCardProduct-cross-icon'/>
          <div className='ShoppingCardProduct-count'>{props.count}</div>
      </div>
      <div className='ShoppingCardProduct-right-section'>
          <CgMathPlus className='ShoppingCardProduct-plus-icon' onClick={() => increaseItem(props.id)}/>
          <div className='ShoppingCardProduct-count'>{props.count}</div>
          <CgMathMinus className='ShoppingCardProduct-minus-icon' onClick={() => decreaseItem(props.id)}/>
          <FaTrash className='ShoppingCardProduct-trash-icon' onClick={() => removeItem(props.id)}/>
      </div>
    </div>
  )
}