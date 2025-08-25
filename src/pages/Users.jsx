import React ,{useState} from 'react'
import ContactUs from '../components/Users.jsx/ContactUs'
import GetEarlyAccess from '../components/Users.jsx/GetEarlyAccess'
import Modal from '../components/Users.jsx/Modal'
import ExportPDF from '../components/pdf'
function Users() {
const[showModal , setShowModal] = useState(false)

  return (
    <div >
        <button onClick={()=>setShowModal(true)} className='font-bold text-[red] bg-black py-2 px-3 items-end float-right'  >getEarly aceess</button>
        {showModal && <Modal onClose={()=>setShowModal(false)}/>}
             <ExportPDF elementId="users" fileName="Users.pdf" /> 
            <div id="users">
        <ContactUs />
</div>
    </div>
  )
}

export default Users