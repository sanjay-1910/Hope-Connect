import React, { useEffect, useState } from 'react';
import PersonCard from './PersonCard';
import './Gallery.css';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('missing');
  const [missingPersons, setMissingPersons] = useState([]);
  const [foundPersons, setFoundPersons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/missing')
      .then(res => res.json())
      .then(data => {
        console.log('👉 /api/missing data:', data);
        if (Array.isArray(data)) setMissingPersons(data);
        else console.error('Expected array, got:', data);
      });

    fetch('http://localhost:3001/api/found')
      .then(res => res.json())
      .then(data => {
        console.log('👉 /api/found data:', data);
        if (Array.isArray(data)) setFoundPersons(data);
        else console.error('Expected array, got:', data);
      });
  }, []);

  const displayedList = activeTab === 'missing'
    ? missingPersons
    : foundPersons;

  return (
    <div className="gallery-container">
      <h1>Missing & Found Gallery</h1>

      {/* Optional: You can remove or keep the search input, but it's non-functional now */}
      {/* <input
        className="search-box"
        type="text"
        placeholder="Search disabled..."
        disabled
      /> */}

      <div className="tabs">
        <button onClick={() => setActiveTab('missing')} className={activeTab === 'missing' ? 'active' : ''}>Missing</button>
        <button onClick={() => setActiveTab('found')} className={activeTab === 'found' ? 'active' : ''}>Found</button>
      </div>

      <div className="card-grid">
        {displayedList.length > 0 ? (
          displayedList.map((person: any) => (
            <PersonCard key={person._id} person={person} type={activeTab} />
          ))
        ) : (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
