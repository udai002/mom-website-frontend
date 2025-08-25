import React, { useState, useRef } from "react";
import { RxCross2 } from "react-icons/rx";

function Editemp() {
  const [formData, setFormData] = useState({
    employeeName: "",
    employeedesignation: "",
    email: "",
    linkedin: "",
    Aboutemployee: "",
    employeeUrl: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [employee, setEmployee] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "employeeUrl") {
      const file = files[0];
      setFormData({ ...formData, employeeUrl: file });
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleReset = () => {
    setFormData({
      employeeName: "",
      employeedesignation: "",
      email: "",
      linkedin: "",
      Aboutemployee: "",
      employeeUrl: null,
    });
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("employeeName", formData.employeeName);
      form.append("employeedesignation", formData.employeedesignation);
      form.append("email", formData.email);
      form.append("linkedin", formData.linkedin);
      form.append("Aboutemployee", formData.Aboutemployee);

      if (formData.employeeUrl) {
        form.append("employeeUrl", formData.employeeUrl);
      }

      const response = await fetch(
        "http://localhost:3000/employee/uploademployee",
        {
          method: "POST",
          body: form,
        }
      );

      if (!response.ok) throw new Error("Failed to post data");

      const data = await response.json();
      setEmployee((prev) => [...prev, data]);
      handleReset();
      console.log("Data posted successfully:", data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-2xl">
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Adding an Employee</h2>
        <RxCross2 size={30} color="#00a99d" className="cursor-pointer" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePhotoClick}
            className="px-4 py-2 bg-[#00a99d] text-white rounded-md cursor-pointer hover:opacity-80 transition-opacity"
          >
            Upload Photo
          </button>
          <input
            type="file"
            name="employeeUrl"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
          />
        </div>

        {photoPreview && (
          <div className="mt-2 text-center">
            <img
              src={photoPreview}
              alt="Employee Preview"
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          </div>
        )}

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
            name="employeedesignation"
            value={formData.employeedesignation}
            onChange={handleChange}
            className="w-1/2 border p-2 rounded-md border-[#00a99d]"
          >
            <option value="">Designation</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
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
          name="Aboutemployee"
          value={formData.Aboutemployee}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded-md h-24 border-[#00a99d]"
        />

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
          >
            Reset Form
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#00a99d] text-white rounded-md hover:bg-[#00a99d] transition-colors"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editemp;
