import React from 'react'

const InputText = ({icon , type  , value, onChange  , placeholder}) => {
  return (
    <div className='flex flex-row gap-2 items-center border-[#00A79B] border-2 w-72 px-2 rounded-xl'>
      {icon}
      <input className='px-2 py-2 outline-none w-full' type={type} value={value} onChange={onChange} placeholder={placeholder}  />
    </div>
  )
}

export default InputText
