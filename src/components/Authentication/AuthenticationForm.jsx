import React, { useState } from 'react'
import { MdEmail  } from "react-icons/md";
import InputText from './InputText';
import LoginBtn from './LoginBtn';
import RequestOTP from './RequestOTP';
import useAdmin from '../../context/AuthContext';
import { useNavigate } from 'react-router';

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



  return (
    <div className='p-2'>
      <form className='flex flex-col items-center gap-2'>
        <h1 className=''>Hello Again!</h1>
        <h1 className='font-semibold text-2xl'>Login Here</h1>
        <div className='border-[#00A79B] border-2 p-4 rounded-xl w-80'>
            <InputText icon={<MdEmail  className='text-2xl text-[#00A79B]'/>} onChange={handleOnChange} value={email} type="email" placeholder="Enter Email"/>
            {otpSent ? <RequestOTP email={email}/>:<LoginBtn type="submit" onClick={handleSubmit} title={loading?"loading...":"Request OTP"} disabled={disabled}/>}
           
        </div>
      </form>
    </div>
  )
}

export default AuthenticationForm
