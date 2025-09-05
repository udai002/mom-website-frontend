import React, { useEffect, useState } from "react";
import Table from "./Table";
import Delete from "../assets/Employee/Delete.png";
import Book from "../assets/Employee/Book.png";

import Search from "./Search";
import ExportPDF from "./pdf";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Editemp from "./Users/Editemp";
import { useNavigate } from "react-router";
import apiClient from "../utils/apliClent";
import toast from "react-hot-toast";
import { FcApproval } from "react-icons/fc";
import { MdCancel } from "react-icons/md";


function LeavesApply() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const[colorstate , setColor]=useState("")

  const navigate = useNavigate();
    //   `employee/allemployees?search=${search}&page=${page}&limit=${limit}`

  const fetchEmployees = () => {
    apiClient("api/leaves")
    
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
  }, [search, page, limit]);

  const handleAproved = async (id, key) => {
    console.log(id);
    if (!window.confirm("Are you sure you want to Approve leave for this employee?"))
      return;
    console.log(id, key);
// http://localhost:3000/api/leave/approve/68b842634ccee244e2a18e34
    try {
      const res = await apiClient(`api/leave/approve/${id}`, {
        method: "PUT",
      });
      const result = await res.json();
      if (result) {
        setData((prev) => prev.filter((emp) => emp._id !== id));
        // alert("Deleted successfully");
        toast.success("Approved successfully");
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

  async function handleRemove(id,key)
  {
       if (!window.confirm("Are you sure you want to cancel?"))
        return

       console.log("id n key",id,key)

        try {
      const res = await apiClient(`api/leave/cancel/${id}`, {
        method: "PUT",
      });
      const result = await res.json();
      if (result) {
        setData((prev) => prev.filter((emp) => emp._id !== id));
        // alert("Deleted successfully");
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

  }

  const columns = [
    {
      id: "select",
      header: (
        <input
          type="checkbox"
          className="w-5 h-5 rounded border-2 border-[#00a99d] peer-checked:bg-[#e0f7f5] flex items-center justify-center"
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows(data.map((row) => row._id));
            } else {
              setSelectedRows([]);
            }
          }}
          checked={data.length > 0 && selectedRows.length === data.length}
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row._id)}
          className="w-5 h-5 rounded border-2 border-[#00a99d] peer-checked:bg-[#e0f7f5] flex items-center justify-center"
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows([...selectedRows, row._id]);
            } else {
              setSelectedRows(selectedRows.filter((id) => id !== row._id));
            }
          }}
        />
      ),
    },
    { id: "leaveType", header: "Leave Type" },
    { id: "reason", header: "Reason" },
    { id: "employeeId", header: "Emp_Id" },
    { id: "name", header: "Name" },
    { id: "_id", header: "Leave Id" },
    { id: "from", header: "From" },
    { id: "to", header: "To" },
    { id: "status", header: "Status" },
    { id: "Aboutemployee", header: "Approved By" },
    { id: "Aboutemployee", header: "Approved At" },
      {
           id: "actions",
           header: "Actions",
           cell: (row) => (
             <div className="flex gap-5 ml-2">
               <button onClick={() => handleAproved(row._id, row.Key)}>
                <FcApproval className="w-6 h-6" />

                 {/* <img src={Delete} className="w-5 h-6" /> */}
               </button>
               <button onClick={() => handleRemove(row._id,row.Key)}>
                <MdCancel className="w-6 h-6 text-red-600"></MdCancel>

                 {/* <img src={Book} alt="Edit" className="w-7 h-7" /> */}
               </button>
             </div>
           ),
         },

   
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


  // function Color(col)
  // {
  //   setColor(col)


  // }

  return (
    <>
      <div className="flex justify-between p-4">
        <p className="text-2xl">Manage Employee</p>
        <div className="flex gap-3 mt-2 items-center flex-wrap">
               <select
        onChange={handleChange}
        name="leavstatus"
        className="border-2 rounded-lg p-2 border-[#00A99D] text-">
            <option value="">Leave status</option>
            <option value="Pending" className="text-orange-500" >Pending</option>
            <option value="Approved" className="text-green-600">Approved</option>
            <option value="Cancle" className="text-red-600">Cancle</option>
            

        </select>
          <Search onChange={handleSearchChange} />
          <ExportPDF elementId="employee" fileName="employees.pdf" />
          <button
            onClick={handleAdd}
            className="font-200 bg-[#00A79B] text-white border-2 rounded-xl border-[#00A79B] py-2 px-3"
          >
            Add Employee +
          </button>
        </div>
      </div>

      <div className="flex justify-between px-5 py-3">
        <p>Total {totalResponses} Responses</p>
        <p>No filters applied</p>
     
        <button
          onClick={handleCheckboxDelete}
          className="font-200 flex gap-2 bg-white text-[#e71818] border-2 rounded-xl border-[#e71818] py-2 px-3"
        >
          Delete Selections
          <img src={Delete} alt="delete" className="w-5 h-5" />
        </button>
      </div>

      <Table data={data} columns={columns} />

      <div className="flex justify-center items-center mt-10 gap-4 px-7 flex-row">
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
