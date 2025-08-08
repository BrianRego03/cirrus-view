import { useEffect,useState,useMemo } from "react";

import { AuthContext } from "./AuthContext";


export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        fetch("http://localhost:3000/userState",{
            credentials:"include",
        })
        .then((res)=>{
            if(res.ok) return res.json();
            throw new Error("not logged in");
        })
        .then((data)=>{
            setUser(data);
            console.log(data);
        })
        .catch(()=>{
            setUser(null);
        })
        .finally(()=>{
            setLoading(false);
        });
    },[]);
    const value = useMemo(() => ({ user, setUser, loading }), [user, loading]);
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

