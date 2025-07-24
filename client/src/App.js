// // client/src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// // import UploadMatchPage from "./components/UploadMatchPage";
// import Dashboard from "./components/Dashboard";
// import Layout from "./components/Layout";
// import MissingPersonForm from "./components/MissingPersonForm";
// import FoundPersonForm from "./components/FoundPersonForm";
// import Gallery from "./components/Gallery";
// import Resources from "./components/Resources";
// import Register from "./components/Register";
// import VerifyOtp from "./components/VerifyOtp";
// import Login from "./components/Login";
// import { Navigate } from 'react-router-dom';

// const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/upload-match" element={<MissingPersonForm/>} />
//         <Route path="/Found-match" element={<FoundPersonForm/>} />
//         <Route path="/gallery" element={<Gallery/>} />
//         <Route path="/Resources" element={<Resources/>} />
//         <Route path="/Layout" element={<Layout/>} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard/>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import MissingPersonForm from "./components/MissingPersonForm";
import FoundPersonForm from "./components/FoundPersonForm";
import Gallery from "./components/Gallery";
import Resources from "./components/Resources";
import Register from "./components/Register";
import VerifyOtp from "./components/VerifyOtp";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Pages under Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="report-missing" element={<MissingPersonForm />} />
          <Route path="report-found" element={<FoundPersonForm />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="resources" element={<Resources />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
