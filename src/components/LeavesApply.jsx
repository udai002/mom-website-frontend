import React, { useEffect, useState } from "react";
import Table from "./Table";
import Delete from "../assets/Employee/Delete.png";
import Book from "../assets/Employee/Book.png";
import { FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {ColorRing} from 'react-loader-spinner'

import Search from "./Search";
import ExportPDF from "./pdf";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Editemp from "./Users/Editemp";
import { useNavigate } from "react-router";
import apiClient from "../utils/apliClent";
import toast from "react-hot-toast";
import { FcApproval } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { body } from "framer-motion/client";
import DateFormater from "../utils/DateFormatter";

const statusColors  = {
  Pending:'#F5C983' , 
  Approved:"#A8F583" , 
  Cancelled:"#F08080"
}


function LeavesApply() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const[colorstate , setColor]=useState("")
  const[disabled,setDisabled]=useState(false)
  const [renderer, setRenderer] = useState('')

  const [leaveReason , setLeaveReason] = useState({
    name:"",
    reason:""
  })
  const [activeLeaveId , setActiveLeaveId] = useState(null)

  const[status, setStatus]=useState('')
  const[statusDtata  , setStatusData]=useState([])


  const navigate = useNavigate();
    //   employee/allemployees?search=${search}&page=${page}&limit=${limit}

  const fetchEmployees = () => {
    apiClient(`api/leaves?search=${search}&page=${page}&limit=${limit}`)
    
      .then((data) => { 
        setData(data.data);
        setTotalPages(Math.ceil(data.total / limit));
        setTotalResponses(data.total);
      })
      .catch((err) => console.error("Error fetching employees:", err));
  };

  console.log(".........getLeaves are",data)

  useEffect(() => {
    fetchEmployees();

  }, [ ]);



  useEffect(()=>
  {
    try{
      apiClient(`api/status?status=${status}&page=${page}&limit=${limit}`)
      .then((data)=>{
        setData(data.data)
        
        console.log("....status data is.........................",data.data)
      }) 
    } catch (error) {
      console.log(error)
      
    }

  },[status,page,limit])

  const handleAproved = async (id,email,from,to,name) => {
    console.log(id,email);

    if (!window.confirm("Are you sure you want to Approve leave for this employee?"))
      return;
    console.log(id);

// http://localhost:3000/api/leave/approve/68b842634ccee244e2a18e34
    try {
      setActiveLeaveId(id)
      const res = await apiClient(`api/leave/approve/${id}`, {
        method: "PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,name,from,to})
      });
      setActiveLeaveId(null)
      // const result = await res.json();
      if (res) {
        // setData((prev) => prev.filter((emp) => emp._id !== id));
        // alert("Deleted successfully");
        toast.success("Approved successfully");
        console.log("this is approved leave" , data)
        setData(prev=>prev.map(item=>item._id==id?{...item , status:"Approved"}:item))
        setRenderer(Date.now())
        setDisabled(true)
      } else {
        alert("Failed to Approve");
      }
    } catch (err) {
      console.error("Error Approving employee leave:", err);
    }
  };

  const handleCheckboxDelete = async () => {
    if (selectedRows.length === 0) {
      alert("No rows selected");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete the all responses"
    );
    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedRows.map((id) =>
          apiClient(`employee/deleteemployee/${id}`, {
            method: "DELETE",
          })
        )
      );
      setData((prevData) =>
        prevData.filter((item) => !selectedRows.includes(item._id))
      );
      setSelectedRows([]);
      alert("Selected responses deleted successfully.");
    } catch (error) {
      console.error("Error deleting selected rows:", error);
      alert("Failed to delete some or all selected responses.");
    }
  };

  const handleFormSubmit = (newData) => {
    if (editingEmployee) {
      setData((prev) =>
        prev.map((emp) => (emp._id === newData._id ? newData : emp))
      );
    } else {
      setData((prev) => [newData, ...prev]);
    }
    setShowModal(false);
    setEditingEmployee(null);
    fetchEmployees();
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  async function handleRemove(id,email,name,from,to)
  {
       if (!window.confirm("Are you sure you want to cancel?"))
        return
                      setDisabled(true)


       console.log("id n key",id)
      setActiveLeaveId(id)
        try {
      const res = await apiClient(`api/leave/cancel/${id}`, {
        method: "PUT",
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({email,from,to,name})
      });
     setActiveLeaveId(null)
      // const result = await res.json();
      if (res) {
        
        // setData((prev) => prev.filter((emp) => emp._id !== id));
        // alert("Deleted successfully");
        console.log(data)
        setData((prev)=>prev.map(item=>item._id===id?{...item , status:"Cancelled"}:item))
        setRenderer(Date.now())
        toast.success("Cancele successfully");

      } else {
        alert("Failed to Cancel");
      }
    } catch (err) {
      console.error("Error cancel employee leave:", err);
    }
  }

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowModal(true);
  };

  function handleChange(e)
  {
     const {name,value}=e.target
     setStatus(value)
     console.log(".......... value status is ...",name,value)

  }

  const columns = [
    { id: "leaveType", header: "Leave Type" },
    // { id: "employeeId", header: "Emp_Id" },
    { id: "name", header: "Name" },
    // { id: "_id", header: "Leave Id" },
    { id: "from", header: "From" , 
      cell:(row)=><p>{DateFormater(row.from)}</p>
     },
    { id: "to", header: "To" , 
      cell:(row)=><p>{DateFormater(row.to)}</p>
    },
    { id: "status", header: "Status"  , 
      cell:(row)=><p style={{
        backgroundColor:statusColors[row.status] , 
        padding:4 , 
        paddingRight:8 , 
        padddingLeft:8 , 
        fontWeight:"bold",
        borderRadius:12
      }}>{row.status}</p>

    },

      {
           id: "actions",
           header: "Actions",
           cell: (row) => {
            
            const isDisabled = row.status==="Approved" || row.status==="Cancelled"
            
            return(
              <>
              {activeLeaveId===row._id?<ColorRing height={20} width={20} colors={["#A009ad"]} />:<div className="flex gap-5">
               <button disabled={isDisabled} onClick={() => handleAproved(row._id,row.email,row.from,row.name,row.to)} > 
                <FcApproval className={`w-6 h-6 ${isDisabled && "text-green-200 opacity-25"}`} />

                 {/* <img src={Delete} className="w-5 h-6" /> */}
               </button>
               <button disabled={isDisabled} onClick={() => handleRemove(row._id,row.email,row.from,row.name,row.to)} >
                <MdCancel className={`w-6 h-6 ${isDisabled?"text-red-300" :"text-red-600"} `}></MdCancel>

                 {/* <img src={Book} alt="Edit" className="w-7 h-7" /> */}
               </button>
             </div>}
             
             </>
           )},
         },
         {
          id:"View",
          header:"View",
          cell:(row)=><button onClick={()=>{setLeaveReason({name:row.name , reason:row.reason})}}>
            <FaEye />
          </button>
         }


   
  ];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };


  // function setColors(col)
  // {
  //   setColor(col)

  // console.log("..............",colorstate)

  // }

  return (
    <>
   {leaveReason.name && leaveReason.reason && <div className="h-screen w-screen fixed top-0 left-0 bg-black/45 z-10 flex justify-center items-center rounded-xl">
    <div className=" p-4 bg-white flex flex-col ">
      <button className="self-end absolute mt-1" onClick={()=>{
        setLeaveReason({name:"" , reason:""})
      }}>
        <IoClose/>
      </button>
      <h1 className="font-bold mr-10">Leave Reason for {leaveReason.name}</h1>
      <p>{leaveReason.reason}</p>
    </div>
    </div>} 
      <div className="flex justify-between p-4">
        <p className="text-2xl">Manage Employee</p>
        <div className="flex gap-3 mt-2 items-center flex-wrap">
               <select
        onChange={handleChange}
        name="leavstatus"
        className={`border-2 rounded-lg p-2 border-[#00A99D] text-${colorstate}`}>
            <option value="">Leave status</option>
            <option value="Pending" className="text-orange-500" >Pending</option>
            <option value="Approved" className="text-green-600">Approved</option>
            <option value="Cancelled" className="text-red-600">Cancelled</option>
            

        </select>
          <Search onChange={handleSearchChange} />
     
        </div>
      </div>

      <div className="flex justify-between px-5 py-1">
        <p>Total {totalResponses} Responses</p>

      </div>

      <Table data={data} columns={columns} />

      <div className="flex justify-center items-center  gap-4 px-7 flex-row">
        <span className="text-lg flex-1 text-[#444444] font-medium">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className={`p-2 bg-[#00a99d] rounded-full ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaArrowLeftLong className="text-2xl text-white" />
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`p-2 bg-[#00a99d] rounded-full ${
              page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaArrowRightLong className="text-2xl text-white" />

          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-[500px] relative">
            <Editemp
              employee={editingEmployee}
              onClose={() => {
                setShowModal(false);
                setEditingEmployee(null);
              }}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default LeavesApply;