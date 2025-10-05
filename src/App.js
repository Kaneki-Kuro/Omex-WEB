import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [serverId, setServerId] = useState("YOUR_GUILD_ID");
  const [prefix, setPrefix] = useState("");

  useEffect(() => {
    axios.get(`https://your-backend-url/api/server/${serverId}`)
      .then(res => setPrefix(res.data.prefix))
      .catch(() => setPrefix("!"));
  }, [serverId]);

  const handleUpdate = () => {
    axios.post(`https://your-backend-url/api/server/${serverId}`, { prefix })
      .then(() => alert("Prefix updated!"))
      .catch(err => alert("Error updating prefix"));
  };

  return (
    <div className="container">
      <h1>Omex Dashboard</h1>
      <div className="settings">
        <label>Bot Prefix:</label>
        <input
          value={prefix}
          onChange={e => setPrefix(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}

export default App;
