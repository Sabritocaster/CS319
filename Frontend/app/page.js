'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthContext } from "@/context/AuthContext";

export default function Auth() {
    const [isLogin,setLogin] = useState(true);
    const { register, handleSubmit } = useForm();
    const router = useRouter()

    const [password1, setPassword1] = useState('');

    const [password2, setPassword2] = useState('');


    const { user } = useAuthContext()

    React.useEffect(() => {
        if (user != null) router.push("/profile")
    }, [user])
 
    const handleForm = async (value) => {
        if(isLogin) {
            var { result, error } = await signIn(value.email, value.password);
        }
        else{
            var { result, error } = await signUp(value.email, value.password);
            console.log(result.user.uid)
            var approved = false;
            if(value.type=="Student") {
                approved = true;
            }
            await setDoc(doc(db, "Users", result.user.uid),{
                        name:value.name,
                        bilkent_id:value.id,
                        department:value.department,
                        email:value.email,
                        feedback:"",
                        internReport:"",
                        internGrade:"",
                        isApproved:approved,
                        process:0,
                        studentGrade:0,
                        studentReport:"",
                        type:value.type,
                        uid:result.user.uid,
                        assigned_reports:[]
                        })

        }
        

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/profile")
    }

    const handlePassChange1 = (event) => {
        setPassword1(event.target.value);
    };

    const handlePassChange2 = (event) => {
        setPassword2(event.target.value);
    };

    const controlPassword = (e) => {

        if(password1 !== password2){
            
            e.preventDefault();
            alert("Password does not match!")
            return;
        }
    }

    return (
      <>
        <div className="flex flex-col items-center"> 
            <Image className="px-5 my-10"
                src="/images/bilkent_yazi.png"
                width={500}
                height={500}
                alt="Bilkent Logo"
                />

            {isLogin && (

                <form className="flex flex-col items-center" onSubmit={handleSubmit((value) => handleForm(value))}>

                    <div className="flex flex-row w-full justify-center">
                        <button onClick={() => setLogin(true)} className="btn border-none bg-menuvar-300 mr-2">Login</button>
                        <button onClick={() => setLogin(false)} className="btn border-none bg-menuvar-100 ml-2">Register</button>
                    </div>
                    
        
        
                   
        
        
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email")} type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                    </div>
        
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password")} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                    </div>
        
                    <button type="submit" className="btn btn-xs my-10 btn-md lg:btn-lg">Login</button>


                    </form>
            )}


            {!isLogin && (

            <form className="flex flex-col items-center" onSubmit={handleSubmit((data) => handleForm(data))}>

                <div className="flex flex-row w-full justify-center">
                    <button onClick={() => setLogin(true)} className="btn border-none bg-menuvar-100 mr-2">Login</button>
                    <button onClick={() => setLogin(false)} className="btn border-none bg-menuvar-300 ml-2">Register</button>
                </div>
                


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Account Type</span>
                    </label>
                    <select {...register("type")} className="select select-bordered text-center">
                        <option disabled selected>Select</option>
                        <option>Student</option>
                        <option>Evaluator</option>
                        <option>Teaching Assistant</option>
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Account Type</span>
                    </label>
                    <select {...register("department")} className="select select-bordered text-center">
                        <option disabled selected>Select</option>
                        <option>CS</option>
                        <option>EE</option>
                        <option>ME</option>
                        <option>IE</option>
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Full Name</span>
                    </label>
                    <input {...register("name")} type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Bilkent ID</span>
                    </label>
                    <input {...register("id")} type="text" placeholder="ID" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input {...register("email")} type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input {...register("password")} type="password" value={password1} onChange={handlePassChange1} placeholder="Password" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input type="password" value={password2} onChange={handlePassChange2} placeholder="Confirm Password" className="input input-bordered w-full max-w-xs" />
                </div>

                <button type="submit " onClick= {controlPassword} className="btn btn-xs my-10 btn-md lg:btn-lg">Register</button>


                </form>
                
            )}

            </div>
      </>
    )
  }
  