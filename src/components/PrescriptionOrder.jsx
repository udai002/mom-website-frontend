import React, { useEffect, useState } from "react";
import Table from "./Table";
import presciption from "../assets/presciption.png";
import share from "../assets/share.png";

const PrescriptionOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImage, setShowImage] = useState(null);
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/UploadPrescription/Prescription"
        );
        const result = await response.json();
        console.log("data fetching", result);
        setData(result.data);
      } catch (error) {
        console.log("error in fetching prescriptions");
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  }, []);

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
            <img src={presciption} alt="View Prescription" />
          </button>

          <button onClick={() => alert(`Share ${row.name}`)}>
            <img src={share} alt="Share" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {loading ? <p>loading...</p> : <Table data={data} columns={columns} />}

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
  );
};

export default PrescriptionOrder;
