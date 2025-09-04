import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import { UserContext } from '../context/UserContext';

const UserCard = (props) => {
    const {name , gender , setActiveDeleteId , id} = props

    const navigate = useNavigate();
    
    
    return (
        <div>
            <div className='flex flex-col justify-center items-center p-4 border-2 w-[225px] rounded-lg border-gray-300 shadow-xl mr-6 mb-6'>
                {gender==="male"?<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw-K-ZRGsHZeNw-Dq8b1-uiyWFvWF9PRxyWA&s" className='w-20 ' alt="Profile pic" />:<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDqEqdBhhua-HhYDFyMhwudonvyM1ebbmqeQ&s" className='w-20 ' alt="Profile pic" />}
                <h1>{name}</h1>
                <div className='mt-4'>
                    <button className='bg-[#00a99d] px-4 py-1 rounded-md mr-4' onClick={()=>navigate(`/employe-details/${id}`)}>Details</button>
                    <button className='bg-red-400 px-4 py-1 rounded-md' onClick={()=>setActiveDeleteId(id)}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
