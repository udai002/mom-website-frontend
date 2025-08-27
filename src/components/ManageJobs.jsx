import React, { useEffect, useState } from "react";
import Table from "./Table";
import Delete from "../assets/Employee/Delete.png";
import Book from "../assets/Employee/Book.png";
import Linkedin from "../assets/Employee/linkedin.png";
import Search from "./Search";
import ExportPDF from "./pdf";
import share from "../assets/share.png";
import JobForm from "./JobForm";
import apiClient from "../utils/apliClent";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

function Mangemployee() {
  const [data, setData] = useState([]);
  const [showform, setShowForm] = useState(false);
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);


  useEffect(() => {
   apiClient(`job/departments?search=${search}&page=${page}&limit=${limit}`)
    .then((res) => {
      const response = res.data || res;
      setData(response.departments); 
      setTotalPages(response.totalPages);
      setTotalResponses(response.total);
    })
    .catch((err) => console.error("Error fetching jobs:", err));
  }, [search, page, limit]);
  

  const handleDelete = async (deptId, jobId) => {
    try {
      if (!window.confirm("Are you sure you want to delete this job?")) return;

      await apiClient(`job/deletejob/${deptId}/${jobId}`, {
        method: "DELETE",
      });

   
      setData((prev) => prev.filter((job) => job._id !== jobId));
      setTotalResponses((prev) => prev - 1);
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const handleActiveJob = (data) => {
    setActive(data);
  };

  const columns = [
    { id: "jobName", header: "Job Name" },
    { id: "jobId", header: "Job Id" },
    { id: "createdAt", header: "Creation Date" },
    { id: "expiryDate", header: "Expiry Date" },
    { id: "location", header: "Job Location" },
    { id: "department_name", header: "Department" },
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-3">
          <button onClick={() => handleDelete(row.deptId, row._id)}>
            <img src={Delete} className="w-6 h-6 block" />
          </button>
          <button onClick={() => handleActiveJob(row)}>
            <img src={Book} />
          </button>
          <button onClick={() => alert(`View ${row.jobName}`)}>
            <img src={Linkedin} />
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
      {(showform || active) && (
        <>
          <div className="fixed h-screen w-screen bg-black/45 left-0 top-0 "></div>
          <JobForm setShowForm={setShowForm} data={active} setActive={setActive} />
        </>
      )}

      <div className="flex justify-between py-4 px-4">
        <div>
          <p onClick={() => setShowForm(true)}>Manage Jobs</p>
        </div>
        <div className="flex gap-4">
          <Search onChange={handleSearchChange} />
          <ExportPDF elementId="jobs" fileName="jobs.pdf" />
        </div>
      </div>

      <div className="flex justify-between px-5 py-3">
        <p>Total {totalResponses} Responses</p>
        <p>No filters applied</p>
        <button className="px-2 py-2 bg-white-500 text-red-800 rounded-lg flex gap-2 inline hover:bg-[#00a99a] border-red-800 group hover:text-white border">
          Delete Selections <img src={share} className="w-5 h-5" alt="export" />
        </button>
      </div>

      <div id="jobs">
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
      </div>
    </>
  );
}

export default Mangemployee;
