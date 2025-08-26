import React, { useEffect } from 'react'
import AuthenticationForm from '../../components/Authentication/AuthenticationForm'
import { useNavigate } from 'react-router'
import useAdmin from '../../context/AuthContext'

const Authentication = () => {

  const {adminDetails} = useAdmin()
    const navigate = useNavigate()
  
    useEffect(()=>{
      function checkLogin(){
        const token = localStorage.getItem("jwt_token")
        console.log(token , adminDetails)
        if(token && adminDetails){
          console.log("this is running")
          navigate('/')
        }
      }
  
      checkLogin()
    } , [adminDetails])


  return (
    <div className='grid grid-cols-1 h-screen w-screen md:grid-cols-2'>
      <div className='bg-[#00A79B] flex flex-col gap-3 justify-center items-center'>
        <img src="/Authentication/dashboard-logo.png" alt="mompharmacy" />
        <h1 className='text-3xl text-white font-bold'>mom </h1>
        <h1 className='text-3xl text-white font-bold'>landing dashboard</h1>
      </div>
      <div className='flex flex-row justify-center items-center'>
          <AuthenticationForm/>
      </div>
    </div>
  )
}

export default Authentication
