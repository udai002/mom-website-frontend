import React, { useEffect,useState } from 'react'
import Table from "../Table"
function ContactUs() {
    const[data,setData]=useState([])
    const[loading , setLoading]=useState(true)

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch("http://localhost:3001/contactus/allcontact")
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
        { id:"name" , header:"user name"},
        {id:"email" , header:"user email" },
        { id:"supportType" , header:"supportType" },
        { id:"description" , header:"Description"}
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

export default ContactUs