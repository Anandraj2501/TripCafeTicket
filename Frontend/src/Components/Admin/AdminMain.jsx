import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import MainSection from "./MainSection";
import AccessDenied from "./AccessDenied";
import FlightSection from "./FlightSection";

const AdminMain = ()=>{
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("tcuser"));
        if(user){
            // console.log(user)
            setIsAdmin(user?.isAdmin);
        }
        
    },[])

    if(!isAdmin){
        return(
            <AccessDenied/>
        )
    }

    return(
        <div className="bg-[#FAFAFB] flex">
            {/* <Dashboard/> */}
            <MainSection />
            {/* <FlightSection/> */}
        </div>
    )
}

export default AdminMain;