import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FoundPersonForm.css';

const FoundPersonForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    approximateAge: '',
    locationFound: '',
    dateFound: '',
    description: '',
    contactInfo: '',
    photoUrl: '',     // Preview URL
    photoFile: null   // Actual image file
  });

  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }

    setUploading(true);

    const photoUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      photoUrl,
      photoFile: file,
    }));

    setUploading(false);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.photoFile) {
      alert('Please upload a photo');
      return;
    }

    const form = new FormData();
    form.append("approximateAge", formData.approximateAge);
    form.append("locationFound", formData.locationFound);
    form.append("dateFound", formData.dateFound);
    form.append("description", formData.description);
    form.append("contactInfo", formData.contactInfo);
    form.append("photo", formData.photoFile);
    form.append("submittedBy", "Anonymous");

    try {
      const response = await fetch("http://localhost:3001/report-found", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        if (result.match) {
          alert(
            `⚠️ Match Found!\n\n` +
            `Name: ${result.match.name || 'N/A'}\n` +
            `Age: ${result.match.age || 'N/A'}\n` +
            `Contact: ${result.match.contactInfo || 'N/A'}\n` +
            `Description: ${result.match.description || 'N/A'}`
          );
        } else {
          alert("✅ Found person report submitted successfully. No match found.");
        }

        navigate("/gallery");
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch (error) {
      alert("❌ Network error");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Report Found Person</h2>
      <p className="info-banner">
        Our system will check this photo with missing persons. If there's a match, we'll notify the concerned party.
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Photo *</label>
          <input type="file" accept="image/*" onChange={handleFileSelect} disabled={uploading} />
          {formData.photoUrl && (
            <img src={formData.photoUrl} alt="Preview" className="preview" />
          )}
        </div>

        <div className="form-group">
          <label>Approximate Age *</label>
          <input
            type="number"
            name="approximateAge"
            value={formData.approximateAge}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location Found *</label>
          <input
            type="text"
            name="locationFound"
            value={formData.locationFound}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date Found *</label>
          <input
            type="date"
            name="dateFound"
            value={formData.dateFound}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Contact Email *</label>
          <input
            type="email"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" disabled={uploading}>Submit Report</button>
        </div>
      </form>
    </div>
  );
};

export default FoundPersonForm;
