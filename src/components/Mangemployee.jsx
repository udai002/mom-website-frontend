
import React, { useEffect, useState } from 'react'
import Table from './Table'
import Delete from '../assets/Employee/Delete.png'
import Book from '../assets/Employee/Book.png'


function Mangemployee() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/employee/allemployees")
      .then(res => res.json())
      .then(data => setData(data.data))
    console.log(data)
  }, [])
  console.log("....data", data)

  const handleDelete = (id) => {
    fetch("http://localhost:", {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => {
        setData(data.filter(emp => emp.id !== id)) 
        alert(`deleted successfully`)
      })
      .catch(err => console.error("Error deleting employee:", err))
  }


  const handleedit = (employee) => {

  }



  const columns = [
    { id: "employeeId", header: "Employee ID" },
    { id: "employeeName", header: "Employee Name" },
    { id: "employeedesignation", header: "Designation" },
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-3  ml-40 p-2">
          <button onClick={() => handleDelete(row.id)}>
            <img src={Delete} />
          </button>
          <button onClick={() => handleedit(row)}>
            <img src={Book} />
          </button>
         
        </div>
      ),
    },
  ]

  return (
      
    <>
      <div className="flex justify-between p-4">
        <p className='text-2xl font-medium'>Manage Employee</p>
        </div>
      <Table data={data} columns={columns} />
     
    </>
  )
}

export default Mangemployee