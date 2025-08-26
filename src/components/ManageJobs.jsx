import React, { useEffect, useState } from 'react'
import Table from './Table'
import Delete from '../assets/Employee/Delete.png'
import Book from '../assets/Employee/Book.png'
import Linkedin from '../assets/Employee/linkedin.png'
import { MapPinPlusInside } from 'lucide-react';
import Search from "./Search";
import ExportPDF from "./pdf";
import Button from "./filter";
import share from "../assets/share.png";
import View from '../assets/Investors/View.png'

import { MdCancel } from "react-icons/md";
import Buttons from "./Buttons";
import Data from '../assets/date.png';


function Mangemployee() {
  const [data, setData] = useState([])
  const type = ["Women Career", "Early Carrer", "Professional",]
  const locations = ["location", "Hyderabad", "Bangalore", "Chennai", "Delhi", "Mumbai", "Pune", "Kolkata", "Guargon", "Trichy"]
  useEffect(() => {
    fetch("http://localhost:3000/job/displayjobs")
      .then(res => res.json())
      .then(data => setData(data.alljobs))
  }
    , [])

  console.log("....data", data)

  const handleDelete = async (id) => {
    try {
      const jobs = await fetch(`http://localhost:3000/job/deletejob/${id}`, {
        method: 'DELETE',
      });
      if (jobs.ok) {
        alert("are you sure")
        console.log('Item deleted successfully');
      } else {
        console.error('Failed to delete the details.');
      }
    } catch (error) {
      console.error('Error during deletion:', error);
    }
  };

  const columns =
    [
      { id: "jobName", header: "Job Name" },
      { id: "jobId", header: "Job Id" },
      { id: "currentDate", header: "Creation Date" },
      { id: "expiryDate", header: "Expiry Date" },
      { id: "location", header: "Job Location" },
      { id: "jobName", header: "Job Type" },




      {
        id: "actions",
        header: "Actions",
        cell: (row) => (
          <div className="flex gap-3">
            <button onClick={() => handleDelete(row._id)}>
              <img src={Delete} className="w-6 h-6 block" />
            </button>
            <button onClick={() => alert(View`${row.name}`)}>
              <img src={Book} />
            </button>
            <button onClick={() => alert(View`${row.name}`)}>
               <img src={View} alt="View" className='w-8 h-6'/>
            </button>
          </div>
        ),
      },
    ]
  return (
    <>
      <div className='bg-white w-[80vh] h-[90vh] fixed top-10 ' >
       <div className='flex items-center justify-between '>
        <h3>Creating a Job</h3>
        <MdCancel />
       </div>
       <div className=''>
        <div className='flex gap-10 m-5'>
        <input type="text" placeholder='Job ID' className=' border-1 outline rounded'/>
        <input type="text" placeholder='Job role name' className='border-1 outline rounded'/>
        </div>
        <div className='m-5 flex gap-10 '>
          <select className='border-1 outline w-[33vh] rounded'>
            {type.map(item=><option value={item}>{item}</option>)}
          </select >
           <select className='border-1 outline border-1 outline w-[33vh] rounded'>
            {locations.map(item=><option value={item}>{item}</option>)}
          </select>
          </div>
          <div className='flex flex-col gap-8 p-2'>
        <input type="text" placeholder='Experience' className=' border-1 outline rounded h-[7vh]'/>
        <input type="text" placeholder='Preferred Skills' className=' border-1 outline rounded h-[7vh]'/>
        <input type="text-area" placeholder='Job Description' className=' border-1 outline rounded h-[10vh] align-top'/>
          </div>
          <div className='flex justify-between items-center'> 
            <h3>Creation Date & Time</h3>

             <Buttons name="Expiry Date & Time " image={Data}/>
           
          </div>
       </div>
    </div>
      <div className="flex justify-between py-4 px-4">
        <div>
          <p>Manage Jobs</p>
        </div>
        <div className="flex gap-4">
          <Search />
          <ExportPDF elementId="prescription" fileName="prescriptions.pdf" />

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
        <Table data={data} columns={columns} />
      </div>
    </>
  )
}

export default Mangemployee