import React from 'react';
import ReusableTable from "../components/Table"

function App() {
  const users = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 24 },
  ];

  const userColumns = [
    { id: 'id', header: 'ID' },
    { id: 'name', header: 'Name' },
    { id: 'age', header: 'Age' },
    {
      id: 'actions',
      header: 'Actions',
      cell: (row) => <button onClick={() => alert(`View ${row.name}`)}>View</button>,
    },
  ];

  return (
    <div>
      <h1>User List</h1>
      <ReusableTable data={users} columns={userColumns} />
    </div>
  );
}

export default App;