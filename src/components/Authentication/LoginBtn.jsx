import React from 'react'

const LoginBtn = ({title ,type ,  disabled , onClick}) => {
  return (
   <button className={`px-3 py-2 bg-[#00A79B] text-white w-full rounded-xl mt-4 hover:bg-[#018D83] transition-all ease-in-out ${disabled?"opacity-45":""}`} type={type} disabled={disabled} onClick={onClick} >
    {title}
   </button>
  )
}

export default LoginBtn
