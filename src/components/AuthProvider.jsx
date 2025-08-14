import { useEffect,useState,useMemo } from "react";

import { AuthContext } from "./AuthContext";


export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);


    useEffect(() => {
        (async () => {
          try {
            const res = await fetch("http://localhost:3000/userState", { credentials: "include" });
            const data = await res.json();
            setUser(data.loggedIn ? data : null);
          } catch {
            setUser(null);
          } finally {
            setLoading(false);
          }
        })();
      }, []);
    const value = useMemo(() => ({ user, setUser, loading }), [user, loading]);
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

