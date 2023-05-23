'use client'
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "@/firebase/config";
import signUp from "@/firebase/auth/signup";
import signIn from "@/firebase/auth/signin";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";



export default function Auth() {
    const [isLogin,setLogin] = useState(true);
    const router = useRouter()
    const { user } = useAuthContext()

    


    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        if(isLogin) {
            const { result, error } = await signIn(data.email, data.password);

            if (error) {
                return console.log(error)
            }

            // else successful
            console.log(result.user.uid)
            return router.push("/profile")
        }
        else {
            const { result, error } = await signUp(data.email, data.password);

            if (error) {
                return console.log(error)
            }

            // else successful
            var isApproved = false
            if(data.type=="Student") {
                isApproved=true
            }
            const docRef = await setDoc(doc(db, "Users", result.user.uid), {
                type: data.type, ///student, TA, evaluator
                name: data.name,
                bilkent_id: data.bilkent_id,
                email:data.email,
                uid:result.user.uid,
                process:0, //0-initial 1-both reports uploaded, 2-preevaluated, 3-evaluated, 4-done
                studentReport:"",
                interReport:"",
                isApproved: isApproved,
                studentGrade:0,
                internGrade:0,
                feedback1:"",
                feedback2:"",
                department:data.department
              });
            return router.push("/profile")

        }
        
    }

    React.useEffect(() => {
        if (user != null) router.push("/profile")

    }, [user])
    
   
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

                <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex flex-row w-full justify-center mb-5">
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

            <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-row w-full justify-center">
                    <button onClick={() => setLogin(true)} className="btn border-none bg-menuvar-100 mr-2">Login</button>
                    <button onClick={() => setLogin(false)} className="btn border-none bg-menuvar-300 ml-2">Register</button>
                </div>
                


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Account Type</span>
                    </label>
                    <select defaultValue={"Select"} {...register("type", { required: true })} className="select select-bordered text-center">
                        <option disabled >Select</option>
                        <option>Student</option>
                        <option>Evaluator</option>
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Department</span>
                    </label>
                    <select defaultValue={"Select"} {...register("department", { required: true })} className="select select-bordered text-center">
                        <option disabled >Select</option>
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
                    <input {...register("bilkent_id")} type="text" placeholder="ID" className="input input-bordered w-full max-w-xs" />
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

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input {...register("confirmPassword")} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                </div>

                <button type="submit" className="btn btn-xs my-10 btn-md lg:btn-lg">Register</button>


                </form>
            )}




            </div>

      
      </>
    )
  }
  