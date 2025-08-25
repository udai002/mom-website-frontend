import React, { useState } from 'react'
import LoginBtn from './LoginBtn'
import useAdmin from '../../context/AuthContext'
import { useNavigate } from 'react-router'

const RequestOTP = ({email}) => {
    const [isDisabled, setIsDisabled] = useState(true)
    const [otp , setOtp] = useState("")
    const {verifyOtp , loading , error} = useAdmin()

    const navigate = useNavigate()

    function handleOnchangeOtp(e){
        setOtp(()=>e.target.value)
        if(e.target.value.trim()===""){
            setIsDisabled(true)
        }else{
            setIsDisabled(false)
        }
    }

    function handleVerify(){
        const result = verifyOtp({email , otp})
        if(result){
            navigate('/')
        }
    }

    return (
        <>
        <div className='flex flex-row gap-2 items-center w-full mt-3'>
            <div  className='text-sm w-[50%] px-2'>
            <p>Enter OTP sent to your email ID</p>
            </div>
            <input className='flex-grow w-[20%] px-2 py-2 border-[#00A79B] border-2 outline-none rounded-xl' type="text" placeholder='XXXX' onChange={handleOnchangeOtp}  />
        </div>
            <LoginBtn title={"Login"} disabled={isDisabled} onClick={handleVerify} />
        </>
    )
}

export default RequestOTP
