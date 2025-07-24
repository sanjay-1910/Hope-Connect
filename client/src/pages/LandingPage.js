// src/pages/LandingPage.js
import React from 'react';
import { Link } from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing">
      <header className="header">
        <h1>Found Your Loved Ones</h1>
      </header>

      <section className="hero">
        <h2>Reuniting<br />Families<br />with Hope</h2>
        <p>
          Using advanced AI technology and community support to help find missing
          loved ones and bring families back together.
        </p>
        <div className="buttons">
          <Link to="/Register">
            <button>Get Started Free</button>
          </Link>
          <button className="outline">View Gallery</button>
        </div>
        <div className="features">
          <p>✅ Free to use</p>
          <p>✅ AI-powered matching</p>
          <p>✅ 24/7 support</p>
        </div>
      </section>

      <section className="stats">
        <h3>Start Your Search</h3>
        <p>Join thousands of families</p>
        <div className="numbers">
          <div><strong>10K+</strong><br />Families Helped</div>
          <div><strong>2.5K+</strong><br />Reunions</div>
        </div>
        <div className="steps">
          <p>📤 Upload photos & details</p>
          <p>🤖 AI finds potential matches</p>
          <p>👪 Reunite with loved ones</p>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How Hope Connect Works</h2>
        <p>Our platform combines cutting-edge technology with human compassion to reunite families</p>
        <div className="features-grid">
          <div>
            <h4>📍 Report Missing Persons</h4>
            <p>Quickly upload photos and details of missing loved ones to start the search process.</p>
          </div>
          <div>
            <h4>🤖 AI-Powered Face Recognition</h4>
            <p>Our advanced AI system automatically matches photos to help reunite families faster.</p>
          </div>
          <div>
            <h4>💬 Community Support</h4>
            <p>Connect with a caring community of volunteers and families working together.</p>
          </div>
          <div>
            <h4>🔒 Secure & Private</h4>
            <p>Your data is protected with enterprise-grade security and privacy measures.</p>
          </div>
        </div>
      </section>

      <section className="stories">
        <h2>Stories of Hope & Reunion</h2>
        <p>Real families sharing their experiences with Hope Connect</p>
        <div className="story-cards">
          <div className="card">
            <h4>Maria Rodriguez</h4>
            <p>Los Angeles, CA</p>
            <blockquote>
              "Hope Connect helped us find my father who had been missing for 3 days. The community support was incredible."
            </blockquote>
          </div>
          <div className="card">
            <h4>James Wilson</h4>
            <p>Houston, TX</p>
            <blockquote>
              "Within hours of posting, we received leads that led to finding our missing daughter. Forever grateful."
            </blockquote>
          </div>
          <div className="card">
            <h4>Sarah Chen</h4>
            <p>Seattle, WA</p>
            <blockquote>
              "The AI matching system is amazing. It found connections we never would have seen ourselves."
            </blockquote>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Start Your Search Today</h2>
        <p>Every moment matters when someone you love is missing. Join our community and let us help you bring them home.</p>
        <div className="buttons">
          <button>Create Free Account</button>
          <button className="outline">View Resources</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
