import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed, ShieldAlert } from "lucide-react";
import Swal from "sweetalert2";

export default function SignIn(){
    const[formData,setFormData]=useState({
        email:'',
        password:''
    });
    const [cookies,setCookie,removeCookie]=useCookies(['loggedUser']);
    const[user,setUser]=useState(null);

    const[error,setError]=useState({
        email:'',
        password:''
    })
    const[viewPassword,setViewPassword]=useState(false);
    const navigate=useNavigate();

    function triggerAlert(){
        Swal.fire({
            position:"center",
            icon:'success',
            title:'Successfully logged In',
            showConfirmButton:false,
            timer:1500,
            customClass:{
                popup:'bg-zinc-900 rounded-xl p-2 w-[90%] lg:w-[30%] h-auto border border-zinc-800',
                title:'text-white font-semibold leading-none text-xs pb-5',
                icon:'scale-50'
            }
        })
    }

    function HandleChange(event){
        const {name,value} =event.target;

        setFormData((prevData)=>{
            return{
                ...prevData,
                [name]:value
            }
        })

        if(value==''){
            setError((prevErr)=>{
                return{
                    ...prevErr,
                    [name]:`${name} field cannot be empty`
                }
            })
        }
        else{
            setError((prevErr)=>{
                return{
                    ...prevErr,
                    [name]:''
                }
            })
        }
    }

    function handleSubmit(event){
        event.preventDefault();

       if(!formData.email){
        setError((prevErr)=>({...prevErr,email:'Email field cannot be empty'}));
        
        
       }

       if(!formData.password){
        setError((prevErr)=>({...prevErr,password:'Password field cannot be empty'}));
        return
       }

        console.log('entered password',formData.password)

        Axios.post('http://localhost:5000/login',{
            email:formData.email,
            password:formData.password
        })
        .then((res)=>{
            console.log('successfully logged',res.data.data);
            setUser(res.data.data);
            setCookie('loggedUser',res.data.data._id,{path:'/',maxAge:3600})
            triggerAlert()
            setFormData({email:'',password:''});

        }).catch((err)=>{
            console.log('there was an error in loggin',err);
            setError((prevErr)=>({...prevErr,email:'Invalid email or password'}));
        })

    }

    return(
        <div className="flex flex-col justify-center items-center w-full h-screen p-5">
            
            <form className="border border-zinc-800 rounded-[8px] w-full h-auto p-5 lg:w-[30%] lg:mt-16" onSubmit={handleSubmit}>
            <h5 className="text-white text-2xl font-medium text-left mb-1">Login</h5>
            <h5 className="text-zinc-400  text-sm mb-5">Enter your credentials to login!</h5>

                <label htmlFor="email" className="text-sm font-medium text-white p-1">Email Address</label><br/>
                <input type="email" name="email" value={formData.email} onChange={HandleChange} className="mb-5 mt-2 border relative border-zinc-800 bg-transparent w-full rounded-[8px] h-[3rem]  text-zinc-300 text-sm p-4 placeholder-zinc-400" placeholder="m@example.com"/>
                {error.email!=='' && <small className="text-sm font-semibold leading-none text-red-700 p-2 flex gap-2 justify-start items-center"><ShieldAlert color="red" size={15}/>{error.email}</small> }<br/>
                
                <label htmlFor="password" className="text-sm font-medium text-white p-1 ">Password</label><br/>
                <div className="flex justify-center items-center w-full relative mt-2">
                <input type={viewPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={HandleChange} className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[3rem]  text-zinc-300 text-sm p-4 placeholder-zinc-400" />
                {viewPassword ? <Eye color="white" size={18} className="absolute top-4 right-4" onClick={()=>setViewPassword((prev)=>!prev)}/> : <EyeClosed color="white" size={18} className="absolute top-4 right-4" onClick={()=>setViewPassword((prev)=>!prev)}/>}

                </div>
                {error.password!=='' && <small className="text-sm font-semibold leading-none text-red-700 p-2 flex justify-start items-center gap-2"><ShieldAlert color="red" size={15}/>{error.password}</small> }<br/>

                <button className="w-full bg-white text-black text-sm font-semibold rounded-[8px] h-[3rem] mt-5 mb-5">Login</button>
                <button className="w-full border border-zinc-700 text-white text-sm font-semibold rounded-[8px] h-[3rem] hover:bg-zinc-700">Login In with Google</button>
                <p className="text-sm text-center text-white mt-4">Still not registered? <span className="underline"> Sign up!</span></p>
            </form>
        </div>
    )
}