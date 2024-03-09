// UserBookings.js

import React, { useState, useEffect } from 'react';
import { API_URL } from '../utils/api';

const UserBookings = () => {
  const [cartData, setCartData] = useState([]);
  const firmId = localStorage.getItem('firmId');

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/firm/cart-details/${firmId}`);
        const data = await response.json();
        setCartData(data.cart);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };

    fetchCartDetails();
  }, []);

  return (
    <div>
      <h2>User Cart Details</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((cartItem) => (
            <tr key={cartItem._id}>
              <td>{cartItem.user ? cartItem.user.username : 'N/A'}</td>
              <td>
                <ul>
                  {cartItem.items.map((item) => (
                    <li key={item._id}>
                      <p>{item.product.name}</p>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {cartItem.items.map((item) => (
                    <li key={item._id}>
                      <p>{item.quantity}</p>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {cartItem.items.map((item) => (
                    <li key={item._id}>
                      <p>{item.product.price}</p>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBookings;
