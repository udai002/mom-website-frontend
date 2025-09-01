import React, { useState } from 'react'
import { MdEmail  } from "react-icons/md";
import InputText from './InputText';
import LoginBtn from './LoginBtn';
import RequestOTP from './RequestOTP';
import useAdmin from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { Loader } from "lucide-react";

const AuthenticationForm = () => {
    const [email , setEmail ] = useState("")
    const [disabled , setDisable] = useState(true)
    const [otpSent , setOtpSent] = useState(false)

    const {loginViaEmail, verifyOtp , loading} = useAdmin()
    const navigate = useNavigate()

    function handleOnChange(e){
        let text = e.target.value 
        setEmail(()=>text)
        if(text.trim()===""){
            setDisable(true)
        }else{
            setDisable(false)
        }
    }

    async function handleSubmit(e){
        e.preventDefault()
        const result = await loginViaEmail({email})
        if(result){
            setOtpSent(true)
        }
    }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }


  return (
    <div className='p-2 flex flex-col items-center gap-3'>
        <h1 className=''>Hello Again!</h1>
        <h1 className='font-semibold text-2xl'>Login Here</h1>
        <div className='border-[#00A79B] border-2 p-4 rounded-xl w-80'>
      <form className='flex flex-col items-center gap-2'>
            <InputText icon={<MdEmail  className='text-2xl text-[#00A79B]'/>} onChange={handleOnChange} value={email} type="email" placeholder="Enter Email"/>
           {!otpSent && <LoginBtn type="submit" onClick={handleSubmit} title={loading?"loading...":"Request OTP"} disabled={disabled}/>}
      </form>
            {otpSent && <RequestOTP email={email}/>}
        </div>
    </div>
  )
}

export default AuthenticationForm
