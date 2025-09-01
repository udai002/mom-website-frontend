import React, { useState } from 'react'
import apiClient from '../utils/apliClent';
import toast from 'react-hot-toast';

const Departments = ({setShowModal}) => {
    const [formData, setFormData] = useState({
        department_name: ""
    })

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }))

    }

    const CreateFunction=async()=>{
        try {
            const options = {
                 method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
            }

            const response = await apiClient(
                `job/department`,options
            )

            if(response){
                // alert("job updated succesfully")
                toast.success("Job updated succesfully")
                setShowModal(false)
            }
            
        } catch (error) {
            console.log("update job error", error)
            
        }

    }
  return (
    <div>
        <p className='p-2 text-xl'>Add departments</p>
        <div className='p-2 flex gap-3'>
        <input type="text"
        placeholder='add department'
        className='border border-teal-500 p-2 rounded-lg'
        value={formData.department_name}
        name="department_name"
        onChange={handleChange}
         />
        <button className='bg-teal-500 p-2 rounded-lg text-white' onClick={CreateFunction}>Add</button>
        </div>
    </div>
    
  )
}

export default Departments