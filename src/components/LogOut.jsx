import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";



const LogOut=()=>{

    const navigate = useNavigate();
    const {setUser}= useAuth();
    


    useEffect(()=>{
        const handleLogout = async()=>{
            

            try{
                const res= await fetch("http://localhost:3000/logout",{
                    method: "POST",
                    credentials: "include",                   

                });

                const data = await res.json();
                console.log(res);

                if (res.ok) {
                    // alert("Logged in successfully!");
                    setUser(null);
                    navigate("/");
                } else {
                    alert(`Error: ${data.message || "Something went wrong"}`);
                }
            } catch (err){
                console.error(err);
                alert("Network error");
            }

            
        }

        handleLogout();
    },[]);




    return null;
};

export default LogOut;