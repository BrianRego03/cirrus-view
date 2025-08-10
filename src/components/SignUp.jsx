import { useState } from "react";
import { useNavigate } from "react-router-dom";



const SignUp=()=>{

    const [formData,setFormData] = useState({username:"",password:""});

    const navigate=useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            const res= await fetch("http://localhost:3000/register",{
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),

            });

            const data = await res.json();
            console.log(res);

            if (res.ok) {
                alert("User registered successfully!");
                navigate("/login")
            } else {
                alert(`Error: ${data.message || "Something went wrong"}`);
            }
        } catch (err){
            console.error(err);
            alert("Network error");
        }

        
    }



    return (
      <>
        <div>
          <span>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Dashboard
            </button>
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div>Sign up</div>
          <div>Enter username</div>
          <input type="text" name="username" value={formData.username} onChange={handleChange}></input>
          <div>Enter password</div>
          <input type="text" name="password" value={formData.password} onChange={handleChange}></input>
          <button type="submit">Submit</button>
        </form>
      </>
    );
};

export default SignUp;