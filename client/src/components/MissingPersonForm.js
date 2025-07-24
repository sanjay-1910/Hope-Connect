// MissingPersonForm.tsx (Basic React + external CSS + backend integration)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MissingPersonForm.css';

const MissingPersonForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    lastSeenLocation: '',
    dateLastSeen: '',
    description: '',
    contactInfo: '',
    photo: null
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.photo) {
      alert('Photo is required.');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    setUploading(true);
    try {
      const response = await fetch('http://localhost:3001/report-missing', {
        method: 'POST',
        body: data
      });
      const result = await response.json();
      if (response.ok) {
        alert('Report submitted successfully.');
        navigate('/gallery');
      } else {
        alert(result.error || 'Something went wrong.');
      }
    } catch (error) {
      alert('Failed to submit. Try again later.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Report Missing Person</h2>
      <form onSubmit={handleSubmit} className="missing-form">
        <div className="form-group">
          <label>Photo *</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
          {photoPreview && <img src={photoPreview} alt="Preview" className="preview" />}
        </div>

        <div className="form-group">
          <label>Full Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Age *</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Last Seen Location *</label>
          <input type="text" name="lastSeenLocation" value={formData.lastSeenLocation} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Date Last Seen *</label>
          <input type="date" name="dateLastSeen" value={formData.dateLastSeen} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Contact Info *</label>
          <input type="email" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" disabled={uploading}>{uploading ? 'Submitting...' : 'Submit Report'}</button>
        </div>
      </form>
    </div>
  );
};

export default MissingPersonForm;
