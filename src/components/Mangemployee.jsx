import React, { useEffect, useState } from "react";
import Table from "./Table";
import Delete from "../assets/Employee/Delete.png";
import Book from "../assets/Employee/Book.png";
import TopComponent from "./TopComponent";
import Search from "./Search";
import ExportPDF from "./pdf";
import Button from "./filter";
import filter from "./Buttons";
import { Link } from "react-router-dom"
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

function Mangemployee() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:3000/employee/allemployees?search=${search}&page=${page}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
      setData(data.data);
      setTotalPages(Math.ceil(data.total / limit));
      setTotalResponses(data.total);
      })

    console.log(data);
  }, [search, page, limit]);
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

  const handleedit = (employee) => { };

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
    setPage(1);
  }

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <>
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
      <div className="flex justify-center items-center mt-10 gap-4 px-7 flex-row">
        <span className="text-lg flex-1 text-[#444444] font-medium sm:text-base md:text-lg sm:text-left"> Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          <button onClick={handlePrevious} disabled={page === 1} className={`p-2 bg-[#00a99d] rounded-full ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`} >
            <FaArrowLeftLong className="text-2xl text-white" />
          </button>
          <button onClick={handleNext} disabled={page === totalPages} className={`p-2 bg-[#00a99d] rounded-full ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`} >
            <FaArrowRightLong className="text-2xl text-white" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Mangemployee;
