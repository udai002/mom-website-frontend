import React, { useEffect, useState } from "react";
import Table from "./Table";
import presciption from "../assets/presciption.png";
import share from "../assets/share.png";
import Search from "./Search";
import ExportPDF from "./pdf";
import Button from "./filter";
import sendEmail from "./sendEmail"; 
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import TopComponent from "./TopComponent";

const PrescriptionOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImage, setShowImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10); 
  const [totalPages, setTotalPages] = useState(0);



  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/UploadPrescription/Prescription?search=${search}&page=${page}&limit=${limit}`
        );
        const result = await response.json();
        console.log("data fetching", result);
        setData(result.data);
        setTotalPages(Math.ceil(result.total / limit));
        setTotalResponses(result.total);
      } catch (error) {
        console.log("error in fetching prescriptions");
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  }, [search, page, limit]);

  const handleSearch = (e) =>{
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

  const columns = [
    { id: "name", header: "User Name" },
    { id: "contact", header: "Mobile Number" },
    { id: "age", header: "Age" },
    { id: "gender", header: "Gender" },
    { id: "address", header: "Location" },
    { id: "additionaldetails", header: "Description" },
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (row.imageurl) {
                setShowImage(row.imageurl);
                setShowModal(true);
              }
            }}
          >
            <img src={presciption} alt="View Prescription" className="w-5 h-6" />
          </button>

          <button onClick={() => sendEmail(row)}>
            <img src={share} alt="Share" className="w-5 h-5"/>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <TopComponent />
      <div className="flex justify-between py-4 px-4">
        <div>
        <p>Prescription Orders</p>
        </div>
<div className="flex gap-4">
        <Search onChange={handleSearch}/>
        <Button />
        <ExportPDF elementId="prescription" fileName="prescriptions.pdf" />
        </div>
      </div>

      <div className="flex justify-between px-5 py-3">
        <p>Total {data.length} Responses</p>
        <p>No filters applied</p>
        <button
          className="px-2 py-2 bg-white-500 text-[#00a79b] rounded-lg flex gap-2 inline hover:bg-[#00a99a] border-[#00a79b] group hover:text-white border"
        >
          Forward Selections{" "}
          <img src={share} className="w-5 h-5 hover:text-white" alt="export" />
        </button>
      </div>
      <div id="prescription">
        {loading ? <p>loading...</p> : 
        <>
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
        }

        {showModal && showImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-600 text-xl"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>

              <img
                src={showImage}
                alt="Prescription"
                className="max-h-[80vh] w-auto mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionOrder;
