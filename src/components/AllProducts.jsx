import React, { useState, useEffect } from 'react';
import { API_URL } from '../utils/api';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('loginToken');
        const response = await fetch(`${API_URL}/firm/single-firm`, {
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });
        const result = await response.json();

        console.log('API Response:', result);

        if (response.status === 200 && result.firm && result.firm.products) {
          console.log('First Product:', result.firm.products[0]);
          setProducts(result.firm.products);
        } else {
          console.error(`Failed to fetch firm products. Status: ${response.status}`);
          setError('Failed to fetch firm products');
        }
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('loginToken');
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
      });

      if (response.status === 200) {
        // Remove the deleted product from the state
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        console.log('Product deleted successfully');
        confirm("Are you sure? You want to delete the product?");
        alert("Product Deleted Successfully !")
      } else {
        console.error(`Failed to delete product. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (products.length === 0) {
    console.log('No products available');
  }

  return (
    <div className="all-products">
      <h1>All Products</h1>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Best Seller</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category ? product.category.join(', ') : ''}</td>
                <td>{product.description}</td>
                <td>{product.bestSeller ? 'Yes' : 'No'}</td>
                <td>
                  {product.image && (
                    <img
                      src={`${API_URL}/uploads/${product.image}`}
                      alt={product.name}
                      style={{ width: '50px', height: '50px' }}
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(product._id)}
                  className='pro-deleteBtn'
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
