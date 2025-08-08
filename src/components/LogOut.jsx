import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";



const LogOut=()=>{

    const navigate = useNavigate();
    const {setUser}= useContext(AuthContext)
    


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
                    navigate("/login");
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