import React, { useEffect,useState } from 'react'
import email from '../../assets/email.png';
function GetEarlyAccess() {
    const[data,setData]=useState([])
    const[loading , setLoading]=useState(true)

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch("http://localhost:3001/EarlyAccess/access")
               const result = await response.json()
               console.log(result)
                setData(result)
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
    <div >
        <div className='bg-white py-2 sticky -top-3 z-3'>
            <h2 className='text-lg'>Early Access Requests</h2>
        <div className='flex flex-row justify-between items-center mb-5' >
            <h2 className='text-md'>Requests</h2>
            <button className='bg-black rounded-lg text-white px-2 py-1'>Reply To All</button>
        </div>
        </div>
            {data.map((item, index) => (
                <div key={index} className='flex flex-row justify-between border border-black mb-2 p-2 rounded-xl items-center'>
                   <div>
                     <h3 className='text-xs'>Email ID</h3>
                   <div className='text-lg'>{item.email}</div>
                   </div>
                   <div>
                    <img src={email} alt="email" />
                   </div>
                </div>
            ))}
            
        
    </div>
  )
}

export default GetEarlyAccess