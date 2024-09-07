import React, { useState } from "react";

const TabDisplay = ({ onRowSelect, data }) => {
  if (data.length === 0) return <p>No data available</p>;

  const headers = Object.keys(data[0]);

  const [searchVal, setSearchVal] = useState();

  return (
    <>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} onClick={() => onRowSelect(index)}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TabDisplay;
