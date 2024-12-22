import './Products.css'
import React , {useEffect, useState} from 'react'
import { CiSearch } from "react-icons/ci";
import ProductCard from './ProductCard';
import ShoppingCardProduct from './ShoppingCardProduct';

export default function Products () {

  const [productsData , setProductsData] = useState([
    {id : 1 , img : "./image/iphone13.webp" , title : "Iphone 13" , price : 1200, count: 1 , popularity : 2 , selling : 3} ,
    {id : 2 , img : "./image/iphone13pro.webp" , title : "Iphone 13 Pro Max" , price : 2000, count: 1 , popularity : 4 , selling : 5} ,
    {id : 3 , img : "./image/iphone16.webp" , title : "Iphone 16" , price : 2500, count: 1 , popularity : 1 , selling : 4} ,
    {id : 4 , img : "./image/iphone16pro.webp" , title : "Iphone 16 Pro Max" , price : 3500, count: 1 , popularity : 3 , selling : 6} ,
    {id : 5 , img : "./image/s23fe.webp" , title : "Samsung S23 FE" , price : 500, count: 1 , popularity : 5 , selling : 1} ,
    {id : 6 , img : "./image/s23ultra.webp" , title : "Samsung S23 Ultra" , price : 1000, count: 1 , popularity : 6 , selling : 2} ,
  ])
  const [searchInput , setSearchInput] = useState("")
  const [searchedProduct , setSearchedProduct] = useState([])
  const [shoppingCardProducts , setShoppingCardProducts] = useState([])
  const [sum , setSum] = useState(0)

  useEffect(() => {
    console.log('products.js => shoppingCardProducts did update');
    
    const newSum = shoppingCardProducts.reduce(
        (previousValue, currentValue) => {
            return previousValue + currentValue.count * currentValue.price;
        }
    , 0);

    setSum(newSum)

  } , [shoppingCardProducts])

  let changeSelectHandler = (event) => {
    if (event.nativeEvent.target.value === 'The-Cheapest') {
        setProductsData(prevState => {
            return [...prevState.sort((a, b) => a.price - b.price)]
        })
    } else if (event.nativeEvent.target.value === 'The-Most-Expensive') {
        setProductsData(prevState => {
            return [...prevState.sort((a, b) => b.price - a.price)]
        })
    } else if (event.nativeEvent.target.value === 'Most-Popular') {
        setProductsData(prevState => {
            return [...prevState.sort((a, b) => a.popularity - b.popularity)]
        })
    } else if (event.nativeEvent.target.value === 'Best-Selling') {
        setProductsData(prevState => {
            return [...prevState.sort((a, b) => a.selling - b.selling)]
        })
    } else {
        setProductsData(prevState => {
            return [...prevState.sort((a, b) => a.id - b.id)]
        })
    }
  }

  let changeInputHandler = (event) => {
    setSearchInput(event.nativeEvent.target.value)
  }

  let searchHandler = () => {
    let searchedProduct = searchInput

    if(searchInput) {
        let mainProduct = productsData.filter(productData => {
            return productData.title.toLowerCase().includes(searchedProduct.toLowerCase())
        })

        setSearchedProduct(mainProduct)
    } else {
        let mainProduct = []
        setSearchedProduct(mainProduct)
    }
  }

  let keyDownInputHandler = (event) => {
    if(event.key === 'Enter') {
       searchHandler()
    }
  }

  let addToCardHandler = (productId) => {
    productsData.forEach(product => {
        if (product.id === productId) {

            let isInShoppingCard = shoppingCardProducts.some(item => {
                return item.id === productId
            })

            if (!isInShoppingCard) {
                setShoppingCardProducts(prevState => {
                    return [...prevState , product]
                }
              )
            }
        }
    })
  }

  let removeProductHandler = (productId) => {
    let mainProducts = shoppingCardProducts.filter(shoppingCardProduct => {
        return shoppingCardProduct.id !== productId
    })

    setShoppingCardProducts(mainProducts)
  }

  let increaseCount = (id) => {

    let productIndex = shoppingCardProducts.findIndex(shoppingCardProduct => {
        return shoppingCardProduct.id === id
    })

    const shoppingCardProductsCopy = [...shoppingCardProducts];
    
    ++shoppingCardProductsCopy[productIndex].count

    setShoppingCardProducts(shoppingCardProductsCopy)

  }

  let decreaseCount = (id) => {
    let productIndex = shoppingCardProducts.findIndex(shoppingCardProduct => {
        return shoppingCardProduct.id === id
    })

    const shoppingCardProductsCopy = [...shoppingCardProducts];
    
    if (shoppingCardProductsCopy[productIndex].count > 1) {
        --shoppingCardProductsCopy[productIndex].count
    }

    setShoppingCardProducts(shoppingCardProductsCopy)
  }

  return (
    <div className='Products-wrapper'>
      <div className='Products-selecting-wrapper'>
          <select onChange={(event) => changeSelectHandler(event)}>
              <option value="">Sort By ...</option>
              <option value="Most-Popular">Most Popular</option>
              <option value="Best-Selling">Best Selling</option>
              <option value="The-Cheapest">The Cheapest</option>
              <option value="The-Most-Expensive">The Most Expensive</option>
          </select>
          <div className='Products-search-input-wrapper'>
              <input type="text" placeholder='Search Here' value={searchInput} onChange={(event) => changeInputHandler(event)}
              onKeyDown={(event) => keyDownInputHandler(event)}/>
              <CiSearch className='Products-search-icon' onClick={searchHandler}/>
          </div>
      </div>
      <div className='Products-cards-wrapper Products-cards-wrapper-col-max-500 Products-cards-wrapper-col-min-500
      Products-cards-wrapper-col-min-768 Products-cards-wrapper-col-min-1280'>
          {searchedProduct.length === 0 ? 
          productsData.map(productData => (
              <ProductCard key={productData.id} {...productData} onClick={addToCardHandler}/>
          )) : 
          searchedProduct.map(productData => (
              <ProductCard key={productData.id} {...productData} onClick={addToCardHandler}/>
          ))
          }
      </div>
      <div className='Shopping-card-wrapper'>
          <div className='Shopping-card-title'>Shopping Card</div>
          {shoppingCardProducts.map(product => (
              <ShoppingCardProduct key={product.id} {...product} onDecrease={decreaseCount} onIncrease={increaseCount} onRemove={removeProductHandler}/>
          ))}
      </div>
      <div className='Shopping-card-total-price'>
          Total Price : {sum}$
      </div>
    </div>
  )
}