import React, { useContext, useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
import UserCard from '../components/UserCard'
import EntryForm from '../components/EntryForm'
import CustomeLoader from '../components/CustomeLoader'
// import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const apiStatusList = {
  initial: "INITIAL",
  inProgess: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE"
}

const AdminPortal = () => {

  const [teammate, setTeammate] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusList.initial)
  const [activeDeleteId, setActiveDeleteId] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    getUsers()
  }, [])



 const navigate =  useNavigate()


  //user created
  const getUsers = async () => {
    console.log("this is running")
    setApiStatus(apiStatusList.inProgess)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      setApiStatus(apiStatusList.success)
      setTeammate(data.data)
    } else {
      setApiStatus(apiStatusList.failure)
    }

  }

//   if(user && !user.isAdmin){
//     navigate('/user')
//   }


  //delete user
  const deleteUser = async(id)=>{
    const options = {
      method:"DELETE",
      headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lbGVsZTEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3NDM0MTc4NDZ9.-YEG-oCMCaYjDzWBSnmtags83RxH27RvCN9XVaOOK9g"
      }
    }
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`  ,options)
    console.log(response)
    const updatedTeammates = teammate.filter(item=>item._id!=id)
    setTeammate(updatedTeammates)
    setActiveDeleteId(null)
  }


  const OnFailure = () => {
    return <div className='h-[80vh] w-full flex justify-center'>
      <div>
        <h1 className='text-6xl text-gray-400 font-bold text-center mt-56 mb-3'>404</h1>
        <h1 className='font-bold text-3xl text-gray-400 text-center'>The servers are getting their medicine. Please check back in a bit!</h1>
      </div>
    </div>
  }

  const filteredTeammates = teammate.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) // Filter based on search
  );

  const onSuccess = () => {
    return <>{openModal && <EntryForm setOpenModal={setOpenModal} teammate={teammate} setTeammate={setTeammate} />}
      {activeDeleteId && <div className='fixed w-full h-screen top-0 flex justify-center items-center bg-black/75'>
        <div className='bg-white p-10 rounded-lg'>
          <h1 className='font-semibold '>Are your sure? want to delete the user.</h1>
          <div className='flex justify-around mt-5'>
            <button className='bg-red-400 px-4 py-1 rounded-md'  onClick={()=>deleteUser(activeDeleteId)}>Yes</button>
            <button className='bg-green-400 px-4 py-1 rounded-md' onClick={() => setActiveDeleteId(null)}>No</button>
          </div>
        </div>
      </div>}
      <div>
        <h1 className='font-bold text-2xl text-center mt-5'>Hi There, Here is your team</h1>
        <div className='pl-30 flex items-center flex-wrap'>
          <div className='flex items-center mt-10'>
          {/* <span className='mr-2 font-semibold'>Search</span> */}
        <input type='text' className='mr-4  rounded-full border-2 border-gray-400 py-1 px-4 outline-none' value = {search} placeholder='search..' onChange={(e)=>setSearch(e.target.value)} />
          </div>
        <button className='absolute right-10 bg-green-300 px-4 py-2 rounded-xl font-semibold' onClick={() => setOpenModal(true)}>Add Employee</button>
        </div>
      </div>
      <div className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4  overflow-y-auto h-[70vh] pt-4 '>
        {filteredTeammates.map(item => <UserCard id={item._id} setActiveDeleteId={setActiveDeleteId} key={item._id} name={item.username} gender={item.gender} />)}
      </div>
    </>
  }

  const renderFunction = () => {
    switch (apiStatus) {
      case apiStatusList.inProgess:
        return <CustomeLoader />
      case apiStatusList.success:
        return onSuccess()
      case apiStatusList.failure:
        return OnFailure()
    }
  }



  return (
    <div>
      {/* <Navbar search={search} setSearch={setSearch} /> */}
      {renderFunction()}
    </div>
  )
}

export default AdminPortal
