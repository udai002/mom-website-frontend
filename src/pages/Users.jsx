import React, { useState } from 'react'
import ContactUs from '../components/Users.jsx/ContactUs'
import Modal from '../components/Users.jsx/Modal'
import ExportPDF from '../components/pdf'
import Filter from "../components/filter"
import Search from "../components/Search";
import { div } from 'framer-motion/client'
function Users() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='mt-10 '>
      <div className='flex flex-row justify-evenly items-center'>
        <div>
          <h2 className='text-lg'>User Response</h2>
        </div>
        {/* <ExportPDF elementId="users" fileName="Users.pdf" /> */}
         <Search />
          <Filter />
        
        <button onClick={() => setShowModal(true)} className='font-200  bg-[#00A79B] text-[#fff] border-2 rounded-xl border-[#00A79B] py-2 px-3 '>Early Access Responses</button>
        {showModal && <Modal onClose={() => setShowModal(false)} />}
      </div>
      <div id="users">
        <ContactUs />
      </div>
      
    </div>
  )
}

export default Users