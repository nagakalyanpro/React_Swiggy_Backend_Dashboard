import React, { useState } from 'react';
import { API_URL } from '../utils/api';

const AddFirm = () => {
  const [firmName, setFirmName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState('');
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((reg) => reg !== value));
    } else {
      setRegion([...region, value]);
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
      if (!token) {
        console.error('User not authenticated');
        return;
      }

      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      category.forEach((value) => {
        formData.append('category', value);
    });

    region.forEach((value) => {
        formData.append('region', value);
    });
      formData.append('offer', offer);
      formData.append('image', file);

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          'token': `${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if(response.ok){
        console.log(data);
        const firmId = data.firmId;
        localStorage.setItem('firmId', firmId);
        alert('firm added successfully');
        setFirmName('');
        setArea('');
        setCategory('');
        setRegion('');
        setOffer('');
        setFile('');
      }else if(data.message === "Vendor can have only one Firm"){
          alert("Firm Exists 🍩. Only 1 firm can be added to Vendor")
      }else {
        console.error('Failed to add product:', data.message || 'Unknown error');
        alert('Failed to add product');
      }
      
    } catch (error) {
      console.error(error);
      alert('failed in adding firm');
    }
  };

  return (
    <div className='addFirmSection'>
      <h2>Add Firm</h2>
      <form className="formSection firm" onSubmit={handleSubmit}>
        <div className="inp">
          <label>Firm Name:</label>
          <input type="text" value={firmName} onChange={(e) => setFirmName(e.target.value)} />
        </div>
        <div className="inp">
          <label>Area:</label>
          <input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
        </div>
        <div className="check-inp">
          <label>
            <strong>Category:</strong>
          </label>
          <div className="checkbox-container">
            <label className="checkbox-label">Veg</label>
            <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} />
          </div>
          <div className="checkbox-container">
            <label className="checkbox-label">Non-Veg</label>
            <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} />
          </div>
        </div>
        <div className="check-inp region">
          <label>
            <strong>Region:</strong>
          </label>
          <div className="checkbox-container">
            <label>South Indian</label>
            <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange} />
          </div>
          <div className="checkbox-container">
            <label>North Indian</label>
            <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange} />
          </div>
          <div className="checkbox-container">
            <label>Chinese</label>
            <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange} />
          </div>
          <div className="checkbox-container">
            <label>Bakery</label>
            <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange} />
          </div>
        </div>
        <div className="inp offer">
          <label>Offer:</label>
          <input type="text" value={offer} onChange={(e) => setOffer(e.target.value)} />
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
}

export default AddFirm;
