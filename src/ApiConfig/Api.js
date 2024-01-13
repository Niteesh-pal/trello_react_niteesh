
import api from "../ApiConfig/axiosConfig"


const getApiData = async(url,setData,setLoading,setError)=>{
    try {
        setLoading(true)
        setError(false)
        const response = await api.get(url)
        setData(response.data)
        setLoading(false)
    } catch (error) {
        setError(error)
        setLoading(false)
    }
}

const postApiData= async(url)=>{
    try{

        const response = await api.post(url)
        return response.data
    }
    catch(error){
        console.log({error:{...error}})
    }
}

const archiveApiData = async(url)=>{
    try {
        const response = await api.put(url)
        return response.data
    } catch (error) {
        console.log({error:{...error}})
    }
}

export {getApiData, postApiData,archiveApiData}