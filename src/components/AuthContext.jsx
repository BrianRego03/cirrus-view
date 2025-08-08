import { createContext,useEffect,useState } from "react";

const AuthContext = createContext();

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

        })
        .catch(()=>{
            setUser(null);
        })
        .finally(()=>{
            setLoading(false);
        });
    },[]);

    return (
        <AuthContext.Provider value={{user,setUser,loading}}>
            {children}
        </AuthContext.Provider>
    );
};

