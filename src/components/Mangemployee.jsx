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

function Mangemployee() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const navigate = useNavigate();

 const fetchEmployees = () => {
  apiClient(
    `employee/allemployees?search=${search}&page=${page}&limit=${limit}`)
    .then((data) => {
      setData(data.data);
      setTotalPages(Math.ceil(data.total / limit));
      setTotalResponses(data.total);
    })
    .catch((err) => console.error("Error fetching employees:", err));
};


  useEffect(() => {
  fetchEmployees();
}, [search, page, limit]);



  const handleDelete = async (id, key) => {
    console.log(id)
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    console.log(id,key)

    try {
      const res = await apiClient(`employee/deleteemployee/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result) {
        setData((prev) => prev.filter((emp) => emp._id !== id));
        alert("Deleted successfully");
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
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

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowModal(true);
  };

  const columns = [
    { id: "employeeId", header: "Employee ID" },
    { id: "employeeName", header: "Employee Name" },
    { id: "employeedesignation", header: "Designation" },
     { id: "Aboutemployee", header: "Description" },
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-5 ml-5">
          <button onClick={() => handleDelete(row._id, row.Key)}>
            <img src={Delete} className="w-5 h-6" />
          </button>
          <button onClick={() => handleEdit(row)}>
            <img src={Book} alt="Edit" className="w-7 h-7" />
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

  return (
    <>
      <div className="flex justify-between p-4">
        <p className="text-2xl">Manage Employee</p>
        <div className="flex gap-3 mt-2 items-center flex-wrap">
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
            className={`p-2 bg-[#00a99d] rounded-full ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            <FaArrowLeftLong className="text-2xl text-white" />
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`p-2 bg-[#00a99d] rounded-full ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""
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

export default Mangemployee;
