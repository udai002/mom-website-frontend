import {React,useEffect,useState} from 'react'
import apiClient from '../utils/apliClent'
import { MdCancel } from "react-icons/md";
import Buttons from "./Buttons";
import Data from '../assets/date.png'
import { AnimatePresence,motion} from 'framer-motion';

const JobForm = ({setShowForm , data, setActive}) => {


const type=["Type","Women Career","Early Carrer","Professional",]
const locations=["location","Hyderabad","Bangalore","Chennai","Delhi","Mumbai","Pune","Kolkata","Guargon","Trichy"];
const date= new Date();


const newdate= date.toLocaleString('en-us',{
  hour:'2-digit',
  hour12:true
})



 const[formdata,setFormData]= useState({
  jobName:data?.jobName || "",
  jobId:data?.jobId || "",
  location:data?.location || "",
  type:'',
  skills:data?.skills,
  jobDescription:data?.jobDescription || "",
  experience:data?.experience || "",
  CurrentDate:date
  // ExpiryDate:'', 
})
//form data handling
const handleChange= async (e)=>{
    const {name,value}= e.target;
    setFormData((prev)=>({
      ...prev,
      [name]: value
    }))
}

//handle reset
const handleReset= async()=>{
  setFormData({
  jobId: "",
  jobName: "",
  type:"",
  location:"",
  experience:"",
  skills:"",
  jobDescription:"",
  // creationTime:"",
  // ExpiryDate:"", 
  })
}


const updateFunction= async()=>{
    console.log("this is update" , formdata)
    try{
    const options={
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formdata)
    }
    const response= apiClient(`job/updatejob/${data?._id}`,options)
    if(response){
      console.log("jobs updated successfully");
      alert('jobs updated successfully')
      setShowForm(false)  
      setActive(null)    
    }
  }
  catch(e){
      console.log("Internal Server Error",e);      
  }
}

const createFunction =async()=>{
  try{
      const options={
        method:'POST',
        headers:{
          "Content-Type":'application/json'
        },             
        body:JSON.stringify(formdata)
      }
      const response= await apiClient('job/jobDetails',options)
      if(response){
        console.log("job has been successfully created");    
        alert('job updated successfully')    
        setShowForm(false)
      }
      else{
        console.log("unable to post the job to the db");        
      }
  }
  catch(e){
        console.log("Internal Server Error",e);
        
  }
}
//handle submit

const handleSubmit= async(e)=>{
   e.preventDefault()
   if(data){
     await updateFunction()
   }
   else{
    await createFunction()
   }
}
  return (
<>
<AnimatePresence mode='wait'>    
        <motion.div         
        className='flex items-center justify-center h-screen w-screen fixed left-0 top-0'>
     
<div className='bg-[white] z-10 ' >
       <div className='flex items-center justify-between '>
        <h3>Creating a Job</h3>
        <MdCancel onClick={()=>{
            setShowForm(false) 
            setActive(null)
        }}/>
       </div>
       <div className=''>
        <div className='flex gap-10 m-5'>
        <input type="text" placeholder='Job ID' className=' border-1 outline rounded' name='jobId' value={formdata.jobId} onChange={handleChange}/>
        <input type="text" placeholder='Job role name' className='border-1 outline rounded' name='jobName' value={formdata.jobName} onChange={handleChange}/>
        </div>
        <div className='m-5 flex gap-10 '>
          <select className='border-1 outline w-[33vh] rounded' value={formdata.type} name='type' onChange={handleChange}>
            {type.map(item=><option value={item}>{item}</option>)}
          </select >
           <select className='border-1 outline border-1 outline w-[33vh] rounded' name='location' value={formdata.location} onChange={handleChange}>
            {locations.map(item=><option value={item}>{item}</option>)}
          </select>
          </div>
          <div className='flex flex-col gap-8 p-2'>
        <input type="text" placeholder='Experience' className=' border-1 outline rounded h-[7vh]' name='experience' value={formdata.experience} onChange={handleChange}/>
        <input type="text" placeholder='Preferred Skills' className=' border-1 outline rounded h-[7vh]' name='skills' value={formdata.skills} onChange={handleChange}/>
        <input type="text-area" placeholder='Job Description' className=' border-1 outline rounded h-[10vh] align-top' name='jobDescription' value={formdata.jobDescription} onChange={handleChange}/>
          </div>
          <div className='flex justify-between items-center'> 
            <h3 value={formdata.creationTime} name='creationTime' onChange={handleChange}>Creation Date & Time<br></br>{date.toDateString()}|{newdate}</h3>
             <Buttons name="ExpiryDate" image={Data} value={formdata.expiryDate} onChange={handleChange}/>        
          </div>
        <div className='flex justify-between m-2 '> 
          <button type="reset" className='border-1 outline rounded' onClick={handleReset}>Reset</button>
          <button type="submit" className='border-1 outline rounded' onClick={handleSubmit}>Create</button>
      </div>
       </div>
    </div>
       </motion.div>
    
    </AnimatePresence>
</>
  )
}

export default JobForm