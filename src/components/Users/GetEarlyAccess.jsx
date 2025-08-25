import React, { useEffect,useState } from 'react'
import email from '../../assets/email.png';
function GetEarlyAccess() {
    const[data,setData]=useState([])
    const[loading , setLoading]=useState(true)

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch("http://localhost:3000/EarlyAccess/access")
               const result = await response.json()
               console.log(result)
                setData(result.data)
            }
            catch(error){
                console.log("error");
                
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[])
  return (
    <div>
      <div className="bg-white py-2 sticky -top-3 z-3">
        <h2 className="text-lg text-teal-500">Early Access Requests</h2>
        <div className="flex flex-row justify-between items-center mb-5">
          <p className="text-lg">
            {" "}
            <span>{data.length} </span>Requests
          </p>
          <a href={`mailto:${data.map((item) => item.email).join(",")}`}>
            <button className="bg-teal-500 rounded-lg text-white px-2 py-1 ">
              Reply To All
            </button>
          </a>
        </div>
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-row justify-between text-sm border-2 border-teal-500 mb-2 p-2 rounded-xl items-center"
        >
          <div>
            <h3 className="text-xs">Email ID</h3>
            <div className="text-lg">{item.email}</div>
          </div>
          <div>
            <a href={`mailto:${item.email}`} className="w-8 h-8 block mt-1">
              <img src={email} alt="email" className=" w-6 h-6" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetEarlyAccess