import React, { useEffect, useState } from "react";
import Table from "./Table";
import Delete from "../assets/Employee/Delete.png";
import Book from "../assets/Employee/Book.png";
import View from '../assets/Investors/View.png'
import Search from "./Search";
import ExportPDF from "./pdf";
import share from "../assets/share.png";
import JobForm from "./JobForm";
import apiClient from "../utils/apliClent";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

function Mangemployee() {
  const [data, setData] = useState([]); // jobs + dept info
  const [showform, setShowForm] = useState(false);
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
      const [showData, setShowData] = useState(null);
      const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    apiClient(`job/departments?search=${search}&page=${page}&limit=${limit}`)
      .then((res) => {
        const response = res.data || res;
        setData(response.departments || []);
        setTotalPages(response.totalPages || 1);
        setTotalResponses(response.total || 0);
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, [search, page, limit]);

  const handleDelete = async (deptId, jobId) => {
    try {
      if (!window.confirm("Are you sure you want to delete this job?")) return;

      await apiClient(`job/department/${deptId}/job/${jobId}`, {
        method: "DELETE",
      });

      setData((prev) => prev.filter((job) => job._id !== jobId));
      setTotalResponses((prev) => prev - 1);
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const handleActiveJob = (job) => {
    setActive(job);
    setSelectedDepartmentId(job.deptId); // ✅ get deptId from job
  };

  const columns = [
    { id: "jobName", header: "Job Name" },
    {
      id: "jobId_vacancy",
      header: "JobId & Vacancy",
      cell: (row) => (
        <>
          <div>{row.jobId}</div>
          <div>{row.vacancy}</div>
        </>
      ),
    },
    { id: "createdAt", header: "Creation Date" },
    { id: "expiryDate", header: "Expiry Date" },
    { id: "location", header: "Job Location" },

    {
      id: "Location_employment_type",
      header: "Location & Type",
      cell: (row) => (
        <>
          <div>{row.location}</div>
          <div>{row.employment_type}</div>
        </>
      ),
    },
    {
      id: "experience",
      header: "Experience",
    },

    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => handleDelete(row.deptId, row._id)}>
            <img src={Delete} className="w-9 h-7 block" />
          </button>
          <button onClick={() => handleActiveJob(row)}>
            <img src={Book} className="w-9 h-7 block" />
          </button>
          <button className="w-10 h-10" onClick={() => {
            if (row.jobDescription) {
              setShowData(row.jobDescription);
              setShowModal(true);
            }
          }}>
            <img src={View} alt="View" className='w-8 h-6' />
          </button>
        </div>
      ),
    },
  ];

  const uniqueDepartments = Array.from(
    new Map(data.map(dept => [dept.deptId, dept])).values()
  );

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
          <JobForm
            setShowForm={setShowForm}
            data={active}
            department={uniqueDepartments}
            setActive={setActive}
            departmentId={selectedDepartmentId}
            setDepartmentId={setSelectedDepartmentId}
          />
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

        
                {showModal && showData && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full relative">
                            <button
                                className="absolute top-2 right-2 text-gray-600 text-xl"
                                onClick={() => setShowModal(false)}
                            >
                                ✕
                            </button>

                            <p className="mt-4"><strong>{showData}</strong></p>
                            <p className="text-gray-700">{showData?.jobDescription}</p>
                        </div>
                    </div>
                )
                }
      </div>
    </>
  );
}

export default Mangemployee;
