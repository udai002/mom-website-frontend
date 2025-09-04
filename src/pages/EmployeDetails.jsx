import React, { useContext, useEffect } from 'react'
// import Navbar from '../components/Navbar'
import { useState } from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import { UserContext, useUser } from '../context/UserContext';
import { Oval } from 'react-loader-spinner'
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

const apistatusList = {
  initial: "INITIAL",
  inProgess: "INPROGESS",
  sucess: "SUCCESS",
  failure: "FAILURE"
}
const EmployeDetails = () => {
  const dataNow = new Date().toISOString().split("T")[0]
  const [selectedDateData, setSelectedDate] = useState(dataNow);
  const [apiStatus, setApiStatus] = useState(apistatusList.initial)
  const [employeeDetails, setEmployeeDetails] = useState(null)

  const handleDateChange = (date) => {
    date.setDate(date.getDate() + 1)
    const dateSet = new Date(date)
    setSelectedDate(dateSet);
  };

  // const dateFormate = new Date(selectedDateData).toISOString().split("T")[0]
  const {id} = useParams()


  const fetchLearning = async () => {
    
      console.log("this is running")
      const dateFormate = new Date(selectedDateData).toISOString().split("T")[0]
      const response = await fetch(`http://localhost:3000/api/emplyee/${id}/${dateFormate}`)
      console.log(dateFormate)
      const data = await response.json()
      console.log("this is data ", data)
      if (response.ok) {
        setApiStatus(apistatusList.sucess)
        // const data = await response.json()
        setEmployeeDetails(data)
      } else {
        setEmployeeDetails(null)
        setApiStatus(apistatusList.failure)
      
    }
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = 10;
    let y = 10;

    const addSection = (title, content) => {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(title, 10, y);
        y += lineHeight;

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        const lines = doc.splitTextToSize(content, 180);
        lines.forEach((line) => {
            if (y + lineHeight > pageHeight - 10) {
                doc.addPage();
                y = 10;
            }
            doc.text(line, 10, y);
            y += lineHeight;
        });

        y += lineHeight;
    };

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Employee Details Summary", 10, y);
    y += lineHeight * 2;

    addSection(
        "Technical Learning:",
        employeeDetails.technicalDesc || "No technical description provided."
    );
    addSection(
        "Non-Technical Learning:",
        employeeDetails.nonTechnicalDesc ||
            "No non-technical description provided."
    );
    addSection("Remarks:", employeeDetails.review || "No remarks provided.");
    addSection(
        "Extra Curricular Activities:",
        employeeDetails.extraCarricular || "No extracurricular activities provided."
    );
    addSection(
        "Events:",
        employeeDetails.events || "No events listed."
    );
    addSection(
        "Posted on LinkedIn?",
        employeeDetails.posted_linkedin || "No post on LinkedIn."
    );
    addSection(
        "Innovation Idea",
        employeeDetails.innovativeIdea || "No post on LinkedIn."
    );

    if (y + lineHeight > pageHeight - 10) {
        doc.addPage();
        y = 10;
    }
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(
        `Date Added: ${new Date(employeeDetails.date).toLocaleDateString()}`,
        10,
        y
    );

    doc.save("EmployeeDetails.pdf");
};




  const onSuccess = () => {
    const { events,
      extraCarricular,
      nonTechnicalDesc,
      posted_linkedin,
      review,
      technicalDesc } = employeeDetails
    return <> <div className='p-3'>
      <h1 className='font-semibold mb-1'>Technical Learning</h1>
      <p>{technicalDesc}</p>
    </div>
      <div className='p-3'>
        <h1 className='font-semibold mb-1'>Non Technical Learning</h1>
        <p>{nonTechnicalDesc}</p>
      </div>
      <div className='p-3'>
        <h1 className='font-semibold mb-1'>Remark</h1>
        <p>{review}</p>
      </div>
      <div className='p-3'>
        <h1 className='font-semibold mb-1'>Extra Curricular</h1>
        <p>{extraCarricular}</p>
      </div>
      <div className='p-3'>
        <h1 className='font-semibold mb-1'>Events</h1>
        <p>{events}</p>
      </div>
      <div className='p-3'>
        <h1 className='font-semibold mb-1'>Post in Linkedin</h1>
        <p>{posted_linkedin}</p>
        <div className='flex justify-end'>
        <button className='px-4 py-2 bg-blue-400 text-white mt-4 rounded-lg ' onClick={()=>handleDownloadPDF()}>Download PDF</button>

        </div>
      </div>
    </>

  }

  // const { user } = useUser();

  useEffect(() => {
    fetchLearning()
  }, [ selectedDateData])



  return (
    <div>
      {/* <Navbar /> */}
      <div className='flex gap-10 items-start p-5 ml-8 mt-5'>
        <div className=' '>
          <h1 className='font-bold'>Search Calender</h1>
          <Calendar className='px-2 py-2 border-2  border-gray-300 rounded-lg w-[300px] ' selected={selectedDateData} onChange={handleDateChange} />
        </div>
        <div className='p-4  min-h-screen w-full border-l-2 border-gray-200 '>
          {apiStatus === apistatusList.failure && <h1 className='font-semibold'>No Data Available</h1>}
          {employeeDetails && onSuccess()}
          {apiStatus === apistatusList.inProgess && <div className="flex justify-center mt-40"><Oval color='#00a99d' /></div>}
        </div>
      </div>
    </div>
  )
}

export default EmployeDetails
