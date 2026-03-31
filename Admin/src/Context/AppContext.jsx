import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
import { useAuth } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) =>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [allCourses, setAllCourses] = useState([])
    const {getToken} = useAuth();

    // Fetching the all Courses 

    const fetchAllCourses = async () =>{
       try {
         const {data} = await axios.get(backendUrl + '/api/course/all');

        if(data.success){
            setAllCourses(data.courses)
        }
        else{
            toast.error(data.message)
        }
       } catch (error) {
        
            toast.error(error.message)
       }
        
    }

    useEffect(() =>{
        fetchAllCourses()
    }, [])

    const value = {
        backendUrl,
        fetchAllCourses,
        allCourses,
        setAllCourses,
        getToken
    }

 return <AppContext.Provider value={value}>
      {props.children}
 </AppContext.Provider>
}