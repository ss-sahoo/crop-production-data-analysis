import React from "react";

// Define the props for the TableDisplay component
interface TableDisplayProps {
  headers: string[];
  rows: { [key: string]: string | number }[]; // This will allow the rows to be an array of objects with string keys and number/string values
}

// TableDisplay component
const TableDisplay: React.FC<TableDisplayProps> = ({ headers, rows }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableDisplay;
