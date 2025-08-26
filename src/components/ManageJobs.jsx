import React, { useEffect, useState } from 'react'
import Table from './Table'
import Delete from '../assets/Employee/Delete.png'
import Book from '../assets/Employee/Book.png'
import Linkedin from '../assets/Employee/linkedin.png'
import { MapPinPlusInside } from 'lucide-react';
import TopComponent from './TopComponent'
import Search from "./Search";
import ExportPDF from "./pdf";
import share from "../assets/share.png";
import CreateJob from './createJob'
import JobForm from './JobForm'
import { form } from 'framer-motion/client'
import apiClient from '../utils/apliClent'

function Mangemployee() {
    const [data,setData]=useState([])
    const[showform,setShowForm]=useState(false)
    const [active , setActive] = useState(null)


 useEffect(()=>{
    fetch("http://localhost:3000/job/displayjobs")
    .then(res=>res.json())
    .then(data=>setData(data.alljobs)) }
 ,[data]) 

  function handleActiveJob(data){
    console.log(data)
    setActive(data)
   }

   const columns = 
   [
    {id:"jobName",header:"Job Name"},
    {id:"jobId",header:"Job Id"},
    {id:"CurrentDate",header:"Creation Date"},
    {id:"expiryDate",header:"Expiry Date"},
    {id:"location",header:"Job Location"},
    // {id:"jobName",header:"Job Type"},
  
  {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-3">
          <button onClick={() => alert(View `${row.name}`)}>
    <MapPinPlusInside />
          </button>
          <button onClick={()=>handleActiveJob(row)}>
            <img src={Book} />
          </button>
          <button onClick={() => alert(View `${row.name}`)}>
            <img src={Linkedin}/>
          </button>
        </div>
      ),
    },
   ]

   
  return (
    <>
     {/* for form */}
    <>
      {(showform || active) && (<>
        <div className='fixed h-screen w-screen  bg-black/45 left-0 top-0 '></div>
        <JobForm setShowForm={setShowForm} data={active} setActive={setActive} />
      </>
      )}
    </>
   <div className="flex justify-between py-4 px-4">
        <div>
        <p onClick={()=>setShowForm(true)}>Manage Jobs</p>
        </div>
<div className="flex gap-4">
        <Search/>
        <ExportPDF elementId="prescription" fileName="prescriptions.pdf" />
        <CreateJob/>
        </div>
      </div>
      <div className="flex justify-between px-5 py-3">
              <p>Total {data.length} Responses</p>
              <p>No filters applied</p>
              <button
                className="px-2 py-2 bg-white-500 text-red-800 rounded-lg flex gap-2 inline hover:bg-[#00a99a] border-red-800 group hover:text-white border"
              >
                Delete Selections{" "}
                <img src={share} className="w-5 h-5 hover:text-white" alt="export" />
              </button>
            </div>
    <div className=''>
            <Table data={data} columns={columns}/>
    </div>
    </>
  )
}

export default Mangemployee