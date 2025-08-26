import React from 'react'
import refresh from '../assets/refresh.png'
import bell from '../assets/bell.png'
import user from '../assets/user.png'
import useAdmin from '../context/AuthContext'
const TopComponent = () => {

  const {adminDetails} = useAdmin()
  return (
    <div className="p-2 flex justify-between">
      <div className="flex gap-2">
        <button className="border-2 border-teal-500 px-1 rounded-lg h-8">
          Admin
        </button>
        <p className="text-[#444444] flex pt-1">Last update: 30 min ago</p>
        <img src={refresh} alt="refresh" className="w-4 h-4 mt-2" />
      </div>

      <div className='flex gap-2'>
        <div>
        <img
          src={bell}
          alt="notify"
          className="bg-teal-500 w-10 h-10 p-1 rounded-lg"
        />
        </div>
<div>
        <img
          src={user}
          alt="user"
          className="bg-teal-500 w-10 h-10 p-2 rounded-lg"
        />
        </div>

        <div>
            <p className='text-xl text-[#444444]'>{adminDetails?.name}</p>
            <p className='text-sm text-[#444444]'>Admin</p>

        </div>
      </div>
    </div>
  );
}

export default TopComponent
