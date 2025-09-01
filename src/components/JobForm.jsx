import { React, useState } from "react";
import apiClient from "../utils/apliClent";
import Buttons from "./Buttons";
import Data from "../assets/date.png";
import { AnimatePresence, motion } from "framer-motion";
import Departments from "./departments";

const JobForm = ({ setShowForm, data, setActive, departmentId, setDepartmentId, department }) => {

  console.log("department",department)
  console.log("departmentjId", department._id)
  // Job type & locations
  const type = ["Women Career", "Early Career", "Professional"];
  const locations = [
    "Hyderabad",
    "Bangalore",
    "Chennai",
    "Delhi",
    "Mumbai",
    "Pune",
    "Kolkata",
    "Guargon",
    "Trichy",
  ];

  const date = new Date();
  const newdate = date.toLocaleString("en-us", {
    hour: "2-digit",
    hour12: true,
  });

  const [showModal, setShowModal] = useState(false)

  const handleModel = () => {
    setShowModal(true)
  }

  // Initial form state
  const [formdata, setFormData] = useState({
    jobName: data?.jobName,
    jobId: data?.jobId || "",
    location: data?.location || "",
    type: data?.type || null,
    skills: data?.skills || "",
    jobDescription: data?.jobDescription || "",
    experience: data?.experience || "",
    CurrentDate: data?.CurrentDate || date.toISOString(),
    expiryDate: data?.expiryDate || "",
  });

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // reset
  const handleReset = () => {
    setFormData({
      jobId: "",
      jobName: "",
      type: "",
      location: "",
      experience: "",
      skills: "",
      jobDescription: "",
      expiryDate: "",
    });
  };

  // update job
  const updateFunction = async () => {
    console.log("Updating job:", departmentId, data?._id);

    try {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      };

      const response = await apiClient(
        `job/department/${departmentId}/job/${data?._id}`,
        options
      );

      if (response) {
        alert("Job updated successfully");
        setShowForm(false);
        setActive(null);
      }
    } catch (e) {
      console.error("Update job error", e);
    }
  };

  // create job
  const createFunction = async () => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      };

      const response = await apiClient(
        `job/department/job/${departmentId}`,
        options
      );

      if (response) {
        alert("Job created successfully");
        setShowForm(false);
      }
    } catch (e) {
      console.error("Create job error", e);
    }
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data) {
      await updateFunction();
    } else {
      await createFunction();
    }
  };


  return (
    <AnimatePresence mode="wait">
      <motion.div className="flex items-center justify-center h-screen w-screen fixed left-0 top-0">
        <div className="bg-[white] z-10 p-5 w-[600px]">
          <div className="flex items-center justify-between">
            <h3 className="text-xl">{data ? "Update Job" : "Create Job"}</h3>
            <button
              className="text-xl border border-teal-500 px-2 rounded-xl text-teal-500"
              onClick={() => {
                setShowForm(false);
                setActive(null);
              }}
            >
              X
            </button>
          </div>

          {/* Department dropdown */}
          <div className="flex gap-10 px-4">
            <div className="">
              <select
                className="border border-teal-500 py-2 px-10 rounded-xl mb-4"
                value={departmentId || ""}
                onChange={(e) => setDepartmentId(e.target.value)}
                disabled={!!data} 
              >
                <option value="">Select Department</option>
                {department.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.department_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <button className="bg-teal-500 p-2 w-full text-white rounded-xl text-lg" onClick={handleModel}>Create Department</button>
              {showModal &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-4 rounded-lg shadow-lg relative">
                    <button
                      className="absolute top-2 right-2 text-gray-600 text-xl"
                      onClick={() => setShowModal(false)}
                    >
                      ✕
                    </button>
                    <Departments setShowModal={setShowModal}/>
                  </div>
                </div>
              }
            </div>
          </div>

          {/* Job ID + Name */}
          <div className="flex gap-10 m-5">
            <input
              type="text"
              placeholder="Job ID"
              className="border p-2 border-teal-500 rounded-xl"
              name="jobId"
              value={formdata.jobId}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Job role name"
              className="border border-teal-500 p-2 rounded-xl"
              name="jobName"
              value={formdata.jobName}
              onChange={handleChange}
            />
          </div>

          {/* Type + Location */}
          <div className="m-5 flex gap-10">
            <select
              className="border border-teal-500 p-2 w-[33vh] rounded-xl"
              value={formdata.type}
              name="type"
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              {type.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              className="border border-teal-500 p-2 w-[33vh] rounded-xl"
              name="location"
              value={formdata.location}
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              {locations.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Experience, Skills, Description */}
          <div className="flex flex-col gap-8 p-2">
            <input
              type="text"
              placeholder="Experience"
              className="border border-teal-500 p-1 rounded-xl"
              name="experience"
              value={formdata.experience}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Preferred Skills"
              className="border p-1 border-teal-500 rounded-xl"
              name="skills"
              value={formdata.skills}
              onChange={handleChange}
            />
            <textarea
              placeholder="Job Description"
              className="border px-1 border-teal-500 rounded-xl"
              name="jobDescription"
              value={formdata.jobDescription}
              onChange={handleChange}
            />
          </div>

          {/* Dates */}
          <div className="flex justify-between items-center mt-5">
            <div>
              <p className="text-gray-400">Creation Date & Time</p>
              <h1 className="text-black">
                {date.toDateString()} | {newdate}
              </h1>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Expiry Date & Time</label>
              <input
                type="date" // allows calendar + time selection
                className="border border-teal-500 p-2 rounded-xl"
                name="expiryDate"
                value={formdata.expiryDate}
                onChange={handleChange}
              />
            </div>
          </div>


          {/* Buttons */}
          <div className="flex justify-between m-2 mt-6">
            <button
              type="reset"
              className="border-2 border-teal-500 p-1 text-teal-500 rounded"
              onClick={handleReset}
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="bg-teal-500 text-white px-3 py-1 rounded-xl"
              onClick={handleSubmit}
            >
              {data ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JobForm;
