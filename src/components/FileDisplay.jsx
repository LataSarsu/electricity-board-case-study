import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import TabDisplay from "./TabDisplay";
import SearchField from "./SearchField";
import DateRangePicker from "./DateRangePicker";
import EditableRowForm from "./EditableRowForm";

const FileDisplay = () => {
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [editableRow, setEditableRow] = useState({});

  useEffect(() => {
    // Fetch the Excel file from the public directory
    fetch("./electr_board_data.xlsx")
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
          type: "array",
        });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        // Convert the worksheet to JSON and handle dates
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false, // Ensure dates are treated as strings
          dateNF: "MM/DD/YYYY", // Date format you want
        });
        // const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
      })
      .catch((error) => console.error("Error fetching the Excel file:", error));
  }, []);

  // useEffect(() => {
  //   // Filter data based on the search term
  //   const results = data.filter(
  //     (row) =>
  //       row["ID_Number"] && row["ID_Number"].toString().includes(searchVal)
  //   );
  //   setFilteredData(results);
  // }, [searchVal, data]);

  // Filter data based on date range
  useEffect(() => {
    if (data.length > 0) {
      const results = data.filter((row) => {
        const applicantIdMatch =
          row["ID_Number"] && row["ID_Number"].toString().includes(searchVal);

        const dateOfApplication = new Date(row["Date_of_Application"]);
        const dateInRange =
          (!startDate || dateOfApplication >= startDate) &&
          (!endDate || dateOfApplication <= endDate);

        return applicantIdMatch && dateInRange;
      });
      setFilteredData(results);
    }
  }, [searchVal, startDate, endDate, data]); // Re-filter when any of these change

  const handleRowSelect = (index) => {
    setSelectedRowIndex(index);
    setEditableRow({ ...filteredData[index] });
  };

  const handleChange = (name, value) => {
    setEditableRow((prevRow) => ({ ...prevRow, [name]: value }));
  };

  const handleSave = () => {
    const updatedData = filteredData.map((row, index) =>
      index === selectedRowIndex ? editableRow : row
    );
    setFilteredData(updatedData);
    setData(updatedData); // Optional: Update the original data state
    setSelectedRowIndex(null);
  };

  const handleCancel = () => {
    setSelectedRowIndex(null);
  };

  return (
    <div>
      <SearchField search={searchVal} setSearch={setSearchVal} />
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      {selectedRowIndex !== null ? (
        <EditableRowForm
          row={editableRow}
          headers={Object.keys(data[0] || {})}
          onChange={handleChange}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <TabDisplay data={filteredData} onRowSelect={handleRowSelect} />
      )}
    </div>
  );
};

export default FileDisplay;
