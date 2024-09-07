import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FileDisplay from "./components/FileDisplay";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  return (
    <>
      <div className="App">
        <h2>Electricity Board case study</h2>
        <FileDisplay />
      </div>
    </>
  );
}

export default App;
