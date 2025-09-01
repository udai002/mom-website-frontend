import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../utils/apliClent";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";


const AuthContext = createContext({
    adminDetails:null , 
    loading:false , 
    error:false , 
    loginViaEmail:()=>{} , 
    verifyOtp:()=>{} , 
    logout:()=>{},
    login:false
})

function AuthProvider({children}){
    const [adminDetails , setAdminDetails] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const [login, setLogin]=useState(false)
    const navigate = useNavigate()
    
    useEffect(()=>{
        async function fetchAdminDetails(){
            try{
                const token = localStorage.getItem("jwt_token")
                const parsedToken = JSON.parse(token)
                console.log(parsedToken)
                const options = {
                    method:"GET", 
                    headers:{
                        "Authorization":`Bearer ${parsedToken}`
                    }
                }
                const response = await apiClient("api/getDetails" , options)
                setAdminDetails(response.data)
            }catch(err){
                console.log("Error in fetching Admin details", err)
            }
        }
        fetchAdminDetails()
    } , [])

    //login otp
    async function loginViaEmail(data){
        try{
            const options = {
                method:"POST", 
                credentials: "include",
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
                credentials: "include",
                headers:{
                    "Content-Type":"application/json" , 
                },
                body:JSON.stringify(data)
            }
            setLoading(true)
            const reponse = await apiClient("api/login-verfication" , options)
            setLoading(false)
            if(reponse){
                const JSONToken= JSON.stringify(reponse.token)
                localStorage.setItem("jwt_token" , JSONToken)
                navigate("/")
                toast.success("Login Successfull")
                setLogin(true)
                console.log("..........login..........",login)
                return true
            }else{
                return false
            }
        }catch(e){
            return false
        }
    }
console.log(",..........login at AuthContext......",login)
    //logout
    function logout(){
        localStorage.removeItem("jwt_token")
        setLogin(false)
        navigate("/auth")
        toast.success("Logout Successfull")

        
    }

    return <AuthContext.Provider value={{adminDetails , loginViaEmail , verifyOtp , loading , error , logout,login,setLogin}}>
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