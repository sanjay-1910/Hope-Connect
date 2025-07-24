import React from 'react';
import './Resources.css';

const Resources = () => {
  const emergencyContacts = [
    {
      name: 'India Emergency Helpline',
      number: '112',
      description: 'For all types of emergencies (Police, Fire, Ambulance)',
      icon: '🚨',
      colorClass: 'red'
    },
    {
      name: 'Missing Child Helpline',
      number: '1098',
      description: '24x7 helpline for reporting missing children',
      icon: '👶',
      colorClass: 'blue'
    },
    {
      name: 'Women Helpline',
      number: '181',
      description: 'Support for women in distress',
      icon: '❤️',
      colorClass: 'pink'
    },
    {
      name: 'Cyber Crime Helpline',
      number: '1930',
      description: 'Report online crimes including missing persons',
      icon: '🛡️',
      colorClass: 'purple'
    }
  ];

  const onlineResources = [
    {
      name: 'TrackChild Portal',
      url: 'https://trackthemissingchild.gov.in',
      description: 'Government portal to track missing children across India'
    },
    {
      name: 'KhoyaPaya',
      url: 'https://khoyapaya.gov.in',
      description: 'Citizen-centric platform to report and search for missing children'
    },
    {
      name: 'Delhi Police Missing Persons',
      url: 'https://delhipolice.gov.in/missing-persons',
      description: 'Delhi Police initiative for tracing missing persons'
    },
    {
      name: 'India Child Protection Portal',
      url: 'https://ncpcr.gov.in',
      description: 'Resources and support for child safety and missing children'
    }
  ];

  const guidanceSteps = [
    {
      step: 1,
      title: 'Report to Police',
      description: 'Immediately file an FIR at the local police station. No waiting period is needed.',
      icon: '📞'
    },
    {
      step: 2,
      title: 'Gather Information',
      description: 'Collect recent photos, physical details, and last known location.',
      icon: '📍'
    },
    {
      step: 3,
      title: 'Inform Family & Friends',
      description: 'Reach out to close contacts and share on social media.',
      icon: '👥'
    },
    {
      step: 4,
      title: 'Use Online Portals',
      description: 'Register missing person details on official government portals.',
      icon: '🌐'
    }
  ];

  const supportOrganizations = [
    {
      name: 'Childline India Foundation',
      description: 'Support for children in distress and missing child cases.',
      services: ['24x7 helpline', 'Rescue operations', 'Family counselling', 'Legal aid']
    },
    {
      name: 'Bachpan Bachao Andolan',
      description: 'NGO working to rescue missing and trafficked children.',
      services: ['Rescue missions', 'Rehabilitation', 'Advocacy', 'Support services']
    },
    {
      name: 'National Commission for Protection of Child Rights (NCPCR)',
      description: 'Government body for child protection and safety.',
      services: ['Helpline', 'Case monitoring', 'Public awareness', 'Coordination with police']
    }
  ];

  return (
    <div className="resources-container">
      <h1 className="title">Resources for Missing Families in India</h1>
      <p className="subtitle">Find guidance, emergency contacts, and organizations to support your efforts in locating a missing loved one.</p>

      <section className="section">
        <h2><span className="icon">📞</span> Emergency Contacts</h2>
        <div className="grid">
          {emergencyContacts.map((c, i) => (
            <div key={i} className={`card ${c.colorClass}`}>
              <div className="icon-badge">{c.icon}</div>
              <h3>{c.name}</h3>
              <p className="number">{c.number}</p>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2><span className="icon">⏱️</span> What to Do First</h2>
        <div className="grid four">
          {guidanceSteps.map((step) => (
            <div key={step.step} className="card step">
              <div className="step-number">{step.step}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2><span className="icon">🌐</span> Online Resources</h2>
        <div className="grid">
          {onlineResources.map((res, i) => (
            <div key={i} className="card">
              <h3>{res.name}</h3>
              <p>{res.description}</p>
              <a href={res.url} target="_blank" rel="noopener noreferrer">Visit Website</a>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2><span className="icon">🤝</span> Support Organizations</h2>
        <div className="grid">
          {supportOrganizations.map((org, i) => (
            <div key={i} className="card">
              <h3>{org.name}</h3>
              <p>{org.description}</p>
              <ul>
                {org.services.map((srv, j) => (
                  <li key={j} className="badge">{srv}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="final-message">
        <div className="message-box">
          <div className="message-icon">❤️</div>
          <h2>You Are Not Alone</h2>
          <p>
            The journey to find a missing loved one is incredibly difficult. Remember, there are dedicated
            people and organizations here to help you.
          </p>
          <div className="button-group">
            <a href="tel:112" className="btn light">Emergency Call: 112</a>
            <a href="mailto:help@childline.in" className="btn dark">Contact Support</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
