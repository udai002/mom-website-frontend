const baseUrl = import.meta.env.VITE_BACKEND_URL

async function apiClient(url , options){
    try{
        const response = await fetch(`${baseUrl}/${url}` , options)
        const data = await response.json()
        console.warn("this is from api client" , data)
        if(response.ok){
            return data
        }else{
            console.log("Error in api Request" , data)
            return null    
        }
    }catch(err){
        console.log("error in Api request", err)
        return null
    }
}

export default apiClient