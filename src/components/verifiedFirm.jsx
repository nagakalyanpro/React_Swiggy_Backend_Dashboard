import React, { useState } from 'react';
import { API_URL } from '../utils/api';

const AddFirm = () => {
  const [firmName, setFirmName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');
  const [offer, setOffer] = useState('');
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    setRegion(value);
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
      formData.append('category', category);
      formData.append('region', region);
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
      console.log(data);
      alert('firm added successfully');
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
            <input type="checkbox" value="veg" checked={category === 'veg'} onChange={handleCategoryChange} />
          </div>
          <div className="checkbox-container">
            <label className="checkbox-label">Non-Veg</label>
            <input type="checkbox" value="non-veg" checked={category === 'non-veg'} onChange={handleCategoryChange} />
          </div>
        </div>
        <div className="check-inp region">
          <label>
            <strong>Region:</strong>
          </label>
          <div className="checkbox-container">
            <label>South Indian</label>
            <input type="checkbox" value="south-indian" checked={region === 'south-indian'} onChange={handleRegionChange} />
          </div>
          <div className="checkbox-container">
            <label>North Indian</label>
            <input type="checkbox" value="north-indian" checked={region === 'north-indian'} onChange={handleRegionChange} />
          </div>
          <div className="checkbox-container">
            <label>Chinese</label>
            <input type="checkbox" value="chinese" checked={region === 'chinese'} onChange={handleRegionChange} />
          </div>
          <div className="checkbox-container">
            <label>Bakery</label>
            <input type="checkbox" value="bakery" checked={region === 'bakery'} onChange={handleRegionChange} />
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
