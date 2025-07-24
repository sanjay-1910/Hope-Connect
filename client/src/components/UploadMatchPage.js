// client/src/components/UploadMatchPage.js
import React, { useState, useEffect } from "react";
// import "./UploadMatchPage.css"; // (optional, if you have CSS)
import io from "socket.io-client"; // only if you're using WebSocket

function UploadMatchPage() {
  const [uploadFile, setUploadFile] = useState(null);
  const [matchFile, setMatchFile] = useState(null);
  const [result, setResult] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001"); // adjust if deployed
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  const handleUploadChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleMatchChange = (e) => {
    setMatchFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!uploadFile) return alert("Select a file to upload.");

    const formData = new FormData();
    formData.append("image", uploadFile);

    const res = await fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.message);
    socket?.emit("message", `📤 Image uploaded: ${uploadFile.name}`);
  };

  const matchImage = async () => {
    if (!matchFile) return alert("Select a file to match.");

    const formData = new FormData();
    formData.append("image", matchFile);

    const res = await fetch("http://localhost:3001/match", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.message);
    socket?.emit("message", `🔍 Match request: ${matchFile.name}`);
  };

  return (
    <div className="container">
      <h2>Upload Image</h2>
      <input type="file" onChange={handleUploadChange} />
      <button onClick={uploadImage}>Upload</button>

      <h2>Match Image</h2>
      <input type="file" onChange={handleMatchChange} />
      <button onClick={matchImage}>Match</button>

      <p className="result">{result}</p>
    </div>
  );
}

export default UploadMatchPage;
