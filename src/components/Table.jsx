import React from 'react';

const Table = ({ data, columns, emptyMessage = "No data available." }) => {
  if (!data || data.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div className='flex w-full justify-center align-center'>
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.id}>{col.header}&nbsp;&nbsp;&nbsp;</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col) => (
              <td key={`${rowIndex}-${col.id}`}>
                {col.cell ? col.cell(row) : row[col.id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;