import React, { useEffect, useState } from "react";
import Table from "./Table";
import Delete from "../assets/Employee/Delete.png";
import Book from "../assets/Employee/Book.png";
import TopComponent from "./TopComponent";
import Search from "./Search";
import ExportPDF from "./pdf";
import { Link } from "react-router";



function Mangemployee() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      'http://localhost:3000/employee/allemployees'
    )
      .then((res) => res.json())
      .then((data) => setData(data.data));
   
    console.log(data);
  }, [search]);
  console.log("....data", data);

  const handleDelete = (id) => {
    fetch("http://localhost:", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setData(data.filter((emp) => emp.id !== id));
        alert(`deleted successfully`);
      })
      .catch((err) => console.error("Error deleting employee:", err));
  };

  const handleedit = (employee) => {};

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
  ];

  function handleOnChange(e) {
    setSearch(e.target.value);

  }

  return (
    <>
      <TopComponent />
      <div className="flex justify-between p-4">
        <p className="text-2xl font-medium">Manage Employee</p>
        <div className="flex gap-3 mt-2 items-center flex-wrap">
          <Search onChange={handleOnChange} />
          <ExportPDF elementId="invest" fileName="investors.pdf" />
           <Link to="/edit"><button className='font-200  bg-[#00A79B] text-[#fff] border-2 rounded-xl border-[#00A79B] py-2 px-3 '>Add Employee +</button></Link>
        </div>
       
      </div>
        <div className="flex justify-between px-5 py-3">
           <p>Total {data.length} Responses</p>
        <p>No filters applied</p>
         <button onClick={() => setShowModal(true)} className='font-200 flex gap-2 bg-[white] text-[#e71818] border-2 rounded-xl border-[#e71818] py-2 px-3 '>Delete Selections
          <img src={Delete} alt="delete" className="w-5 h-5" />
         </button>
        </div>
      
            <Table data={data} columns={columns} />
    </>
  );
}

export default Mangemployee;
