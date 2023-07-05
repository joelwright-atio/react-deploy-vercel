import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.magicobject.de/magic");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>I have been changes to this application.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="card">
          <button onClick={fetchData}>Fetch Data</button>
          <p>{data && <p>{data}</p>}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
