// frontend/src/components/VerifyOtp.js
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/verify-otp', { email, otp });
      alert(res.data.message);
      // Save login flag
      sessionStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard'); // or '/home'
    } catch (err) {
      alert(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Verify Email</h2>
      <p>OTP sent to {email}</p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <button type="submit">Verify</button>
    </form>
  );
}

export default VerifyOtp;
