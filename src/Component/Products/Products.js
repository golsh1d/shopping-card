import './Products.css'
import React, { Component } from 'react'
import { CiSearch } from "react-icons/ci";
import ProductCard from './ProductCard';

export default class Products extends Component {
  constructor(props) {
    super(props)

    this.state = {
        productsData : [
            {id : 1 , img : "./image/iphone13.webp" , title : "Iphone 13" , price : 1200, popularity : 2 , selling : 3} ,
            {id : 2 , img : "./image/iphone13pro.webp" , title : "Iphone 13 Pro Max" , price : 2000, popularity : 4 , selling : 5} ,
            {id : 3 , img : "./image/iphone16.webp" , title : "Iphone 16" , price : 2500, popularity : 1 , selling : 4} ,
            {id : 4 , img : "./image/iphone16pro.webp" , title : "Iphone 16 Pro Max" , price : 3500, popularity : 3 , selling : 6} ,
            {id : 5 , img : "./image/s23fe.webp" , title : "Samsung S23 FE" , price : 500, popularity : 5 , selling : 1} ,
            {id : 6 , img : "./image/s23ultra.webp" , title : "Samsung S23 Ultra" , price : 1000, popularity : 6 , selling : 2} ,
        ] ,
        searchInput : "" ,
        searchedProduct : [] ,
    }

    this.changeSelectHandler = this.changeSelectHandler.bind(this)
    this.changeInputHandler = this.changeInputHandler.bind(this)
    this.searchHandler = this.searchHandler.bind(this)
    this.keyDownInputHandler = this.keyDownInputHandler.bind(this)

  }

  changeSelectHandler(event) {
    if (event.nativeEvent.target.value === 'The-Cheapest') {
        this.setState(prevState => {
            return {productsData : prevState.productsData.sort((a, b) => a.price - b.price)}
        })
    } else if (event.nativeEvent.target.value === 'The-Most-Expensive') {
        this.setState(prevState => {
            return {productsData : prevState.productsData.sort((a, b) => b.price - a.price)}
        })
    } else if (event.nativeEvent.target.value === 'Most-Popular') {
        this.setState(prevState => {
            return {productsData : prevState.productsData.sort((a, b) => a.popularity - b.popularity)}
        })
    } else if (event.nativeEvent.target.value === 'Best-Selling') {
        this.setState(prevState => {
            return {productsData : prevState.productsData.sort((a, b) => a.selling - b.selling)}
        })
    } else {
        this.setState(prevState => {
            return {productsData : prevState.productsData.sort((a, b) => a.id - b.id)}
        })
    }
  }

  changeInputHandler(event) {
    this.setState({
        searchInput : event.nativeEvent.target.value
    })
  }

  searchHandler() {
    let searchedProduct = this.state.searchInput

    if(this.state.searchInput) {
        let mainProduct = this.state.productsData.filter(productData => {
            return productData.title.toLowerCase().includes(searchedProduct.toLowerCase())
        })

        this.setState(prevState => {
            return {searchedProduct : mainProduct}
        })
    } else {
        let mainProduct = []
        this.setState(prevState => {
            return {searchedProduct : mainProduct}
        })
    }
  }

  keyDownInputHandler(event) {
    if(event.key === 'Enter') {
        this.searchHandler()
    }
  }

  render() {
    return (
      <div className='Products-wrapper'>
        <div className='Products-selecting-wrapper'>
            <select onChange={(event) => this.changeSelectHandler(event)}>
                <option value="">Sort By ...</option>
                <option value="Most-Popular">Most Popular</option>
                <option value="Best-Selling">Best Selling</option>
                <option value="The-Cheapest">The Cheapest</option>
                <option value="The-Most-Expensive">The Most Expensive</option>
            </select>
            <div className='Products-search-input-wrapper'>
                <input type="text" placeholder='Search Here' value={this.state.searchInput} onChange={(event) => this.changeInputHandler(event)}
                onKeyDown={(event) => this.keyDownInputHandler(event)}/>
                <CiSearch className='Products-search-icon' onClick={this.searchHandler}/>
            </div>
        </div>
        <div className='Products-cards-wrapper Products-cards-wrapper-col-max-500 Products-cards-wrapper-col-min-500
        Products-cards-wrapper-col-min-768 Products-cards-wrapper-col-min-1280'>
            {this.state.searchedProduct.length === 0 ? 
            this.state.productsData.map(productData => (
                <ProductCard key={productData.id} {...productData}/>
            )) : 
            this.state.searchedProduct.map(productData => (
                <ProductCard key={productData.id} {...productData}/>
            ))
            }
        </div>
      </div>
    )
  }
}