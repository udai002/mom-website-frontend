import React, { useState } from 'react'

const EntryForm = ({setOpenModal , teammate , setTeammate}) => {

    const [username , setUsername] = useState("")
    const [email , setEmail] = useState("")
    const [password  , setPassword] = useState("")
    const [isAdmin , setIsAdmin] = useState("false")
    const [gender , setGender] = useState("male")

    const [errorMsg , setErrorMsg] = useState(false)

    const createUsers = async ()=>{
      
        const options= {
            method:"POST",
            headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lbGVsZTEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3NDM0MTc4NDZ9.-YEG-oCMCaYjDzWBSnmtags83RxH27RvCN9XVaOOK9g",
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({username , email , password , isAdmin , gender})
        }
        
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user` , options)
        if(response.ok){
            const data = await response.json()
            const newData = data.data
            const teamData = [...teammate , newData]
            setTeammate(teamData)
            setOpenModal(false)
        }else{
            // console.log(error)
        }

    }

    const handleOnSubmit = e=>{
        e.preventDefault();

        if(!username || !password || !email ){
            setErrorMsg(true)
        }else{
            setErrorMsg(false)
            createUsers()
        }
    }


    return (
        <div className='fixed bg-black/75 w-full top-0 z-10 h-screen flex justify-center items-start'>
            <div className='bg-white p-4 w-[350px] mt-10'>
                <form onSubmit={handleOnSubmit}>
                    <h1 className='text-center font-bold text-xl mb-5'>Add Employee</h1>
                    <div>
                        <label htmlFor="username">Username</label> <br />
                        <input type="text" id='username' name='username' className='w-full border-2 border-gray-200 outline-none px-2 py-2 mb-4 rounded-lg' value={username} onChange={e=>(setUsername(e.target.value))} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label> <br />
                        <input type="email" id='email' name='email' className='w-full border-2 border-gray-200 outline-none px-2 py-2 mb-4 rounded-lg' value={email} onChange={e=>setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label> <br />
                        <input type="password" id='password' name='password' className='w-full border-2 border-gray-200 outline-none px-2 py-2 mb-4 rounded-lg' value={password} onChange={e=>setPassword(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="">Gender</label> <br />
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    className="h-5 w-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                                    checked={gender==="male"}
                                    onChange={e=>{setGender(e.target.value)}}
                                />
                                <label htmlFor="male" className="ml-2 text-gray-700">
                                    Male
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    className="h-5 w-5 text-pink-500 border-gray-300 focus:ring-pink-500"
                                    checked={gender==="female"}
                                    onChange={e=>{setGender(e.target.value)}}
                                />
                                <label htmlFor="female" className="ml-2 text-gray-700">
                                    Female
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="">Admin</label> 
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="yes"
                                name="isAdmin"
                                value="true"
                                className="h-5 w-5 text-green-500 border-gray-300 focus:ring-green-500"
                                onChange={(e)=>{setIsAdmin(e.target.value)}}
                                checked={isAdmin=="true"}
                            />
                            <label htmlFor="yes" className="ml-2 text-gray-700">
                                Yes
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="no"
                                name="isAdmin"
                                value={false}
                                className="h-5 w-5 text-red-500 border-gray-300 focus:ring-red-500"
                                checked={isAdmin=="false"}
                                onChange={(e)=>{setIsAdmin(e.target.value)}}
                            />
                            <label htmlFor="no" className="ml-2 text-gray-700">
                                No
                            </label>
                        </div>
                    </div>
                    </div>
                    {errorMsg && <p className='text-red-500 mb-4'>All Fields are Mandatory</p>}
                    <button className='bg-green-300 px-4 py-2 w-full' type='submit'>Submit</button>
                    <button className='bg-red-300 px-4 py-2 w-full mt-3' onClick={()=>setOpenModal(false)}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default EntryForm
