import React, { useEffect, useState } from 'react'
import Table from './Table'
import Delete from '../assets/Employee/Delete.png'
import Book from '../assets/Employee/Book.png'
import Linkedin from '../assets/Employee/linkedin.png'
import { MapPinPlusInside } from 'lucide-react';




function Mangemployee() {
const [data,setData]=useState([])
 useEffect(()=>{
    fetch("http://localhost:3000/job/displayjobs")
    .then(res=>res.json())
    .then(data=>setData(data.alljobs)) }
 ,[]) 

  console.log("....data",data)


   const columns = 
   [
    {id:"jobName",header:"Job Name"},
    {id:"jobId",header:"Job Id"},
    {id:"currentDate",header:"Creation Date"},
    {id:"expiryDate",header:"Expiry Date"},
    {id:"location",header:"Job Location"},
    {id:"jobName",header:"Job Type"},
  



  {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-3">
          <button onClick={() => alert(View `${row.name}`)}>
    <MapPinPlusInside />
          </button>
          <button onClick={() => alert(View `${row.name}`)}>
            <img src={Book}/>
          </button>
          <button onClick={() => alert(View `${row.name}`)}>
            <img src={Linkedin}/>
          </button>
        </div>
      ),
    },
   ]
  return (
   
    <div className='mt-20'>
            <Table data={data} columns={columns}/>


    </div>
  )
}

export default Mangemployee