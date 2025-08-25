import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../utils/apliClent";


const AuthContext = createContext({
    adminDetails:null , 
    loading:false , 
    error:false , 
    loginViaEmail:()=>{} , 
    verifyOtp:()=>{} 
})

function AuthProvider({children}){
    const [adminDetails , setAdminDetails] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    
    useEffect(()=>{
        async function fetchAdminDetails(){
            
        }
    } , [])

    //login otp
    async function loginViaEmail(data){
        try{
            const options = {
                method:"POST", 
                headers:{
                    "Content-Type":"application/json" , 
                },
                body:JSON.stringify(data)
            }
            setLoading(true)
            const reponse = await apiClient("api/login-admin" , options)
            setLoading(false)
            if(reponse){
                return true 
            }else{
                return false
            }
        }catch(e){
            return false
        }
    }

    //verify otp
    async function verifyOtp(data){
          try{
            const options = {
                method:"POST", 
                headers:{
                    "Content-Type":"application/json" , 
                },
                body:JSON.stringify(data)
            }
            setLoading(true)
            const reponse = await apiClient("api/login-verfication" , options)
            setLoading(false)
            if(reponse){
                localStorage.setItem("jwt_token" , reponse.token)
                return true
            }else{
                return false
            }
        }catch(e){
            return false
        }
    }

    return <AuthContext.Provider value={{adminDetails , loginViaEmail , verifyOtp , loading , error}}>
        {children}
    </AuthContext.Provider>
}

function useAdmin(){
    const context = useContext(AuthContext)
    if(!context) throw new Error("Auth Context is not defined")
    return context
}

export {AuthProvider}
export default useAdmin