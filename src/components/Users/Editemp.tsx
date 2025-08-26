import React, { useState, useRef, useEffect } from "react";

function Editemp({ employee, onClose, onSubmit }) {
  const isEditMode = Boolean(employee);

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

  useEffect(() => {
    if (employee) {
      setFormData({
        employeeName: employee.employeeName || "",
        employeedesignation: employee.employeedesignation || "",
        email: employee.email || "",
        linkedin: employee.linkedin || "",
        Aboutemployee: employee.Aboutemployee || "",
        employeeUrl: null,
      });
      setPhotoPreview(employee.employeeUrl || null);
    }
  }, [employee]);

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
    fileInputRef.current && (fileInputRef.current.value = "");
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("employeeName", formData.employeeName);
    form.append("employeedesignation", formData.employeedesignation);
    form.append("email", formData.email);
    form.append("linkedin", formData.linkedin);
    form.append("Aboutemployee", formData.Aboutemployee);
    if (formData.employeeUrl) {
      form.append("employeeUrl", formData.employeeUrl);
    }

    try {
      let response;
      if (isEditMode) {
        response = await fetch(`http://localhost:3000/employee/update/${employee._id}`, {
          method: "PUT",
          body: form,
        });
      } else {
        response = await fetch("http://localhost:3000/employee/uploademployee", {
          method: "POST",
          body: form,
        });
      }

   if (!response.ok) {

      throw new Error("Failed to submit data");
    }

      const result = await response.json();
      onSubmit(result.data || result); 
      console.log("jh",result)
      handleReset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {isEditMode ? "Edit Employee" : "Add Employee"}
        </h2>
        <button
          onClick={onClose}
          className="text-2xl font-bold text-gray-500 hover:text-black"
        >
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="items-center gap-3">
          <button
            type="button"
            onClick={handlePhotoClick}
            className="px-4 py-2 bg-[#00a99d] text-white rounded-md"
          >
            {isEditMode && photoPreview ? "Change Photo" : "Upload Photo"}
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
          <p className="text-[#00a99d] -mt-2 ml-1">Image uploaded</p>
        )}

        <input
          type="text"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          placeholder="Employee Name"
          className="w-full border p-2 rounded-md border-[#00a99d]"
          required
        />

        <div className="flex gap-3">
          <select
            name="employeedesignation"
            value={formData.employeedesignation}
            onChange={handleChange}
            className="w-1/2 border p-2 rounded-md border-[#00a99d]"
            required
          >
            <option value="">Select Designation</option>
            <option value="Developer">Developer</option>
            <option value="HR">HR</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Tester">Tester</option>
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
          placeholder="LinkedIn Profile"
          className="w-full border p-2 rounded-md border-[#00a99d]"
        />

        <textarea
          name="Aboutemployee"
          value={formData.Aboutemployee}
          onChange={handleChange}
          placeholder="About Employee"
          className="w-full border p-2 rounded-md h-24 border-[#00a99d]"
        />

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#00a99d] text-white rounded-md hover:opacity-90"
          >
            {isEditMode ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editemp;
