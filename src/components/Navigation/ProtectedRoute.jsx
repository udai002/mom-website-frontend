import React, { useEffect } from 'react'
import useAdmin from '../../context/AuthContext'
import { Outlet, Route, useNavigate } from 'react-router'

const ProtectedRoute = (props) => {

    const navigate= useNavigate()

    const {adminDetails} = useAdmin()

    useEffect(()=>{
        function allowAcces(){
            const token = localStorage.getItem("jwt_token")
            
            if(!token && !adminDetails){
                navigate("/auth")
            }
        }

        allowAcces()
    } , [adminDetails])

  return <Outlet />;
}

export default ProtectedRoute
