import React, { useEffect, useState } from "react";
import Table from "./Table";
const PrescriptionOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/UploadPrescription/Prescription"
        );
        console.log(response)
        const result = await response.json();
        console.log("data fetching" ,result)
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
    { id: "address", header: "location" },
    { id: "additionaldetails", header: "Description" },
  ];

  return (
    <div>
      <div>
        {loading ? <p>loading...</p> : <Table data={data} columns={columns} />}
      </div>
    </div>
  );
};

export default PrescriptionOrder;
