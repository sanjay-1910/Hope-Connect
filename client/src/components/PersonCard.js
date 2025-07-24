// // src/components/PersonCard.tsx

// import React from 'react';
// import './Gallery.css';

// const PersonCard = ({ person, type }: { person: any; type: 'missing' | 'found' }) => {
//   return (
//     <div className="card">
//       <img src={person.photoUrl} alt={person.name || 'Unknown'} />
//       <div className="card-info">
//         <h3>{person.name || 'Unknown'}</h3>
//         <p>Age: {person.age || person.approximateAge}</p>
//         <p>Location: {person.lastSeenLocation || person.locationFound}</p>
//         <p>Date: {new Date(person.dateLastSeen || person.dateFound).toLocaleDateString()}</p>
//         <p className={`status ${type}`}>{type.toUpperCase()}</p>
//       </div>
//     </div>
//   );
// };

// export default PersonCard;
import React from 'react';
import './Gallery.css';

const PersonCard = ({ person, type }: { person: any; type: 'missing' | 'found' }) => {
  return (
    <div className="card">
      <img
        src={person.photoUrl || 'https://via.placeholder.com/250'}
        alt={person.name || 'Unknown'}
      />
      <div className="card-info">
        <h3>{person.name || 'Unknown'}</h3>
        <p><strong>Age:</strong> {person.age || person.approximateAge || 'N/A'}</p>
        <p><strong>Location:</strong> {person.lastSeenLocation || person.locationFound || 'N/A'}</p>
        <p><strong>Date:</strong> {
          person.dateLastSeen || person.dateFound
            ? new Date(person.dateLastSeen || person.dateFound).toLocaleDateString()
            : 'N/A'
        }</p>
        <p><strong>Email:</strong> {person.contactInfo || 'Not provided'}</p>
        <p className={`status ${type}`}>{type.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default PersonCard;
