import React, { useState, useEffect } from "react";

const EditableRowForm = ({ row, headers, onChange, onSave, onCancel }) => {
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    // Initialize form values with the row data
    setFormValues(row);
  }, [row]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Special validation for "Load Applied"
    if (name === "Load_Applied (in KV)" && value > 200) {
      setError("Load Applied should not exceed 200 KV.");
      return;
    }

    setError("");
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    onChange(name, value);
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (error) {
      return; // Prevent saving if there are validation errors
    }
    onSave();
  };
  return (
    <div>
      <form
        className="editable-row-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        {headers.map((header) => (
          <div key={header}>
            <label>{header}:</label>
            <input
              type="text"
              name={header}
              value={row[header] || ""}
              onChange={handleChange}
              disabled={[
                "Date_of_Application",
                "GovtID_Type",
                "ID_Number",
              ].includes(header)}
            />
          </div>
        ))}
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditableRowForm;
