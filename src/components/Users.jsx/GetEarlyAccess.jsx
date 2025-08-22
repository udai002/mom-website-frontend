import React, { useEffect,useState } from 'react'
import Table from "../Table"
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

    const columns =[
        {id:"email" , header:"user email" }
    ]
  return (
    <div>
        {loading?
        (<p>loading...</p>):
        (<Table data ={data} columns={columns}/>)
        }
    </div>
  )
}

export default GetEarlyAccess