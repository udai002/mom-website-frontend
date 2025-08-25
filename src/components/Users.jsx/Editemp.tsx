import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";

function Editemp() {

  
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    designation: "",
    email: "",
    linkedin: "",
    description: "",
    photo: null,
  });
    const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
   const handleReset = () => {
    setFormData({
      employeeId: "",
      employeeName: "",
      designation: "",
      email: "",
      linkedin: "",
      description: "",
      photo: null,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
   
  };
  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-2xl ">
    <div className=' flex flex-row justify-between gap-20'>
          <h2 className="text-xl font-semibold mb-4">Adding an Employee</h2>
       <RxCross2  className=" boder-2"size={30} color="#00a99d"  />
    </div>
     
      

      <form onSubmit={handleSubmit} className="space-y-4">
      
        <div className="flex items-center gap-3">
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Employee ID"
            className="w-1/2 border p-2 rounded-md border-[#00a99d]"
          />
          <label className="px-4 py-2 bg-[#00a99d] text-white rounded-md cursor-pointer">
            Upload Photo     
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-1/2 hidden border p-2 rounded-md border-[#00a99d]"
            />
          </label>
        </div>

   
        <input
          type="text"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          placeholder="Employee Name"
          className="w-full border p-2 rounded-md border-[#00a99d]"
        />

        <div className="flex gap-3">
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-1/2 border p-2 rounded-md border-[#00a99d]"
          >
            <option value="">Designation</option>
            <option value="Developer">Developer</option>
            <option value="Tester">Designer</option>
            <option value="HR">Manager</option>
          </select>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email ID"
            className="w-1/2 border p-2 rounded-md border-[#00a99d]"
          />
        </div>

        <input
          type="text"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn ID"
          className="w-full border p-2 rounded-md border-[#00a99d]"
        />

  
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded-md h-24 border-[#00a99d]"
        />

      
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Reset Form
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#00a99d] text-white rounded-md hover:bg-[#00a99d]"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
  
  


export default Editemp










 

