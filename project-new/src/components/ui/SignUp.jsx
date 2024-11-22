import React,{useState}from "react";
import Axios from "axios";

export default function SignUp(){
    const [formData,setFormData]=useState({
        username:"",
        email:"",
        password:""
    })

    function HandleChange(event){
        setFormData((prevData)=>{
            const {name,value,checked,type}=event.target;

            return{
                ...prevData,
                [name]:value
            }
        })
    }

    function HandleSubmit(event){
        event.preventDefault()

        Axios.post('http://localhost:5000/create-user',{
            username:formData.username,
            email:formData.email,
            password:formData.password
        }).then((res)=>{
            console.log("User created successfully");
            localStorage.setItem("loggedUser",res._id)
            setFormData({
                username:"",
                email:"",
                password:""
            })
        }).catch((err)=>{
            console.error("Error creating the user");
        })
    }

    return(
        <div className="flex flex-col justify-center items-center w-full h-screen">
            
            <form className="border border-zinc-800 rounded-[8px] w-[30%] p-5 " onSubmit={HandleSubmit}>
            <h5 className="text-white text-xl font-medium text-center mb-5"></h5>

                <label htmlFor="username" className="text-sm font-medium text-white  mb-5">Username</label><br/>
                <input type="text" name="username" value={formData.username} onChange={HandleChange} className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-xs p-4 placeholder-zinc-600" placeholder="Enter your name"/>

                <label htmlFor="email" className="text-sm font-medium text-white  mb-5">Email Address</label><br/>
                <input type="email" name="email" value={formData.email} onChange={HandleChange} className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-xs p-4 placeholder-zinc-600" placeholder="Enter your email address"/>

                <label htmlFor="password" className="text-sm font-medium text-white mb-10">Password</label><br/>
                <input type="password" name="password" value={formData.password} onChange={HandleChange} className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-xs p-4 placeholder-zinc-600" placeholder="Enter a strong password"/>

                <button className="w-full bg-white text-black text-sm font-medium rounded-[8px] h-[2.5rem]">Submit</button>

            
            </form>
        </div>
    )
}