import React, { useEffect, useState } from "react";
import { API_URL } from '../utils/api';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [collectFirmId, setCollectFirmId] = useState('')
  
  const firmIdHandler = async () => {
    try {
        const token = localStorage.getItem('loginToken');
        const response = await fetch(`${API_URL}/firm/single-firm`, {
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
        });
        const newFirm = await response.json();

        if (response.ok && newFirm.firm) {
            const firmRecordId = newFirm.firm._id;
            console.log(firmRecordId);
            localStorage.setItem('firmId', firmRecordId);
            setCollectFirmId(firmRecordId);
        } else {
            console.error(`Failed to fetch firm record. Status: ${response.status}`);
            alert('Failed to fetch firm record');
        }
    } catch (error) {
        console.error(error);
        alert('Failed to fetch firm record');
    }
};

useEffect(() => {
    firmIdHandler();
}, []);


  const handleBestSellerChange = (event) => {
    const value = event.target.value === 'true';
    setBestSeller(value);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((reg) => reg !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');

      if (!token || !firmId) {
        console.error('User not authenticated or firmId not found in local storage');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('bestSeller', bestSeller);
      category.forEach((value) => {
        formData.append('category', value);
      });
      formData.append('discount', discount);
      formData.append('description', description);
      formData.append('image', file);

      const response = await fetch(`${API_URL}/products/${firmId}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        alert('Product added successfully');
        setName('');
        setPrice('');
        setCategory([]);
        setBestSeller(false);
        setDiscount('');
        setDescription('');
        setFile(null)
      } else {
        console.error('Failed to add product:', data.message || 'Unknown error');
        alert('Failed to add product');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };


  return (
    <div className="addFirmSection">
      <h2>Add Product</h2>
      <form className="formsection firm" onSubmit={handleSubmit}>
        <div className="inp">
          <label>Product Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="inp">
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="check-inp">
          <label>
            <strong>Best Seller:</strong>
          </label>
          <div className="radio-container">
            <label className="radio-label">
              Yes
              <input
                type="radio"
                value="true"
                checked={bestSeller === true}
                onChange={handleBestSellerChange}
              />
            </label>
          </div>
          <div className="radio-container">
            <label className="radio-label">
              No
              <input
                type="radio"
                value="false"
                checked={bestSeller === false}
                onChange={handleBestSellerChange}
              />
            </label>
          </div>
        </div>
        <div className="check-inp region">
          <label>
            <strong>Category:</strong>
          </label>
          <div className="checkbox-container">
            <label>Break-fast</label>
            <input type="checkbox" value="break-fast" checked={category.includes('break-fast')} onChange={handleCategoryChange} />
          </div>
          <div className="checkbox-container">
            <label>Lunch</label>
            <input type="checkbox" value="lunch" checked={category.includes('lunch')} onChange={handleCategoryChange} />
          </div>
          <div className="checkbox-container">
            <label>Snacks</label>
            <input type="checkbox" value="snacks" checked={category.includes('snacks')} onChange={handleCategoryChange} />
          </div>
          <div className="checkbox-container">
            <label>Dinner</label>
            <input type="checkbox" value="dinner" checked={category.includes('dinner')} onChange={handleCategoryChange} />
          </div>
        </div>
        <div className="inp">
          <label>Discount:</label>
          <input type="text" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </div>
        <div className="inp text">
          <label>Description:</label>
          <textarea rows="3" cols="50" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className="file">
          <label>Image:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="inp firm">
          <button type="submit" className='btn-submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
