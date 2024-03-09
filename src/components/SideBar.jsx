import React, { useState } from 'react'
import AddFirm from './AddFirm'
import AddProduct from './AddProduct';
import AllProducts from './AllProducts';
import UserBookings from './UserBookings';

const SideBar = () => {
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [allProducts, setAllProducts] = useState(false);
  const [showBookings, setShowBookings] = useState(false);

  
  const firmHandler =()=>{
    setShowFirm(true)
    setShowProduct(false)
    setAllProducts(false)
    setShowBookings(false)
  }

  const productHandler=()=>{
    setShowProduct(true)
    setShowFirm(false)
    setAllProducts(false)
    setShowBookings(false)

  }
  const firmProductsHandler=()=>{
    setShowProduct(false)
    setShowFirm(false)
    setAllProducts(true)
    setShowBookings(false)

  }
const userBookingHandler =()=>{
  setShowProduct(false)
  setShowFirm(false)
  setAllProducts(false)
  setShowBookings(true)
}

  return (
  <>
    <div className='sideBarSection'>
        <ul>
            <li onClick={firmHandler}>Add Firm</li>
            <li onClick={productHandler}>Add Product</li>
            <li onClick={firmProductsHandler}>All Products</li>
            <li onClick={userBookingHandler}>User Booking</li>
        </ul>
    </div>
    <div className="main-collection side">
      {showFirm && <AddFirm />}
      {showProduct && <AddProduct />}
      {allProducts && <AllProducts />}
      {showBookings && <UserBookings />} 
    </div>
  </>
  )
}

export default SideBar