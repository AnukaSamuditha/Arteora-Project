import React,{useState}from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

export default function SignUp(){
    const [formData,setFormData]=useState({
        username:"",
        email:"",
        password:"",
        type:'regular'
    })
    const [cookies,setCookie,removeCookie]=useCookies(['loggedUser']);

    function HandleChange(event){
        setFormData((prevData)=>{
            const {name,value}=event.target;

            return{
                ...prevData,
                [name]:value
            }
        })
    }

    function triggerAlert(){
        Swal.fire({
            position:"center",
            icon:'success',
            title:'Account created successfully',
            showConfirmButton:false,
            timer:1500,
            customClass:{
                popup:'bg-zinc-900 rounded-xl p-2 w-[90%] lg:w-[30%] h-auto border border-zinc-800',
                title:'text-white font-semibold leading-none text-xs pb-5',
                icon:'scale-50'
            }
        })
    }

    function HandleSubmit(event){
        event.preventDefault()

        Axios.post('http://localhost:5000/create-user',{
            username:formData.username,
            email:formData.email,
            password:formData.password,
            type:formData.type || 'regular'

        }).then((res)=>{
            console.log("User created successfully",res.data.data._id);
            setCookie('loggedUser',res.data.data._id,{path:'/',maxAge:3600});
            //localStorage.setItem("loggedUser",res.data.data._id)
            //alert("Signup successfull");
            triggerAlert();
            setFormData({
                username:"",
                email:"",
                password:"",
                type:'regular'
            })
        }).catch((err)=>{
            console.error("Error creating the user",err);
        })
    }

    return(
        <div className="flex flex-col justify-center items-center w-full min-h-screen p-5 ">
            
            <form className="border border-zinc-800 rounded-[8px] w-full h-full p-5 lg:w-[30%] lg:mt-16" onSubmit={HandleSubmit}>
            <h5 className="text-white text-2xl font-medium text-left mb-1">Signup</h5>
            <h5 className="text-zinc-400  text-sm mb-2">Enter your email to get started!</h5>

                <label htmlFor="username" className="text-sm font-medium text-white  mb-5">Username</label><br/>
                <input type="text" name="username" value={formData.username} onChange={HandleChange} className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-sm p-4 placeholder-zinc-400" />

                <label htmlFor="email" className="text-sm font-medium text-white  mb-5">Email Address</label><br/>
                <input type="email" name="email" value={formData.email} onChange={HandleChange} className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-sm p-4 placeholder-zinc-400" placeholder="m@example.com"/>

                <label htmlFor="password" className="text-sm font-medium text-white mb-10">Password</label><br/>
                <input type="password" name="password" value={formData.password} onChange={HandleChange} className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-sm p-4 placeholder-zinc-400" />

                <div className="flex justify-center items-center w-full h-[3.5rem] mb-10">
                <label htmlFor="type" className="text-sm font-medium text-white min-w-[40%] h-full flex justify-start items-center">Sign Up As : </label><br/>
                <select type="text" name="type" value={formData.type} onChange={HandleChange} className=" bg-transparent w-full rounded-[8px] h-full text-zinc-300 text-sm p-4 placeholder-zinc-400 focus:border-none border border-zinc-800">
                    <option value='regular' className="text-white bg-black">Regular</option>
                    <option value='artist' className="text-white bg-black">Artist</option>
                </select>
                </div>

                <button className="w-full bg-white text-black text-sm font-semibold rounded-[8px] h-[3rem] mb-5">Submit</button>
                <button className="w-full border border-zinc-700 text-white text-sm font-medium rounded-[8px] h-[3rem] hover:bg-zinc-700">Sign up with Google</button>
                <p className="text-sm text-center text-white mt-4">Already have an account? <span className="underline">Log in</span></p>
            </form>
        </div>
    )
}