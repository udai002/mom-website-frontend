import React,{useRef} from 'react'
import GetEarlyAccess from './GetEarlyAccess'

function Modal({onClose}) {
    const modalRef = useRef()
    const closeModal=(e)=>{
        if(modalRef.current === e.target){
            onClose()
        }
    }
  return (
    <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-end'>
        <div className='m-10 bg-white h-[80vh] overflow-y-auto fixed py-10 px-10 '>
            <GetEarlyAccess />
        </div>
        </div>
  )
}

export default Modal