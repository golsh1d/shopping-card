import './App.css';
import React, { Component } from 'react'
import Header from './Component/Header/Header'
import Products from './Component/Products/Products';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Products />
      </div>
    )
  }
}