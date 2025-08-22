import React, { useEffect, useState } from 'react'
import Table from './Table'
import Delete from '../assets/Employee/Delete.png'
import Book from '../assets/Employee/Book.png'
import Linkedin from '../assets/Employee/linkedin.png'




function Mangemployee() {
const [data,setData]=useState([])


 useEffect(()=>{
    fetch("http://localhost:3000/employee/allemployees")
    .then(res=>res.json())
    .then(data=>setData(data.data)) }
 ,[])  
  console.log("....data",data)
   const columns = [{id:"id",header:"Employee ID"},{id:"employeeName",header:"Employee Name"},{id:"employeedesignation",header:"Designation"},
{
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-3  ml-40 p-2">
          <button  onClick={() => alert(`View ${row.name}`)}>
            <img src={Delete}/>
          </button>
          <button onClick={() => alert(`View ${row.name}`)}>
            <img src={Book}/>
          </button>
          <button onClick={() => alert(`View ${row.name}`)}>
            <img src={Linkedin}/>
          </button>
        </div>
      ),
    },

   ]
  return (
   
    <Table data={data} columns={columns}/>
  )
}

export default Mangemployee



