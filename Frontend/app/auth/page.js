
'use client';
import Image from "next/image"
import { useState } from "react"
export default function Auth() {
    const [isLogin,setLogin] = useState(true);
 
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

                <>

                    <div className="flex flex-row w-full justify-center">
                        <button onClick={() => setLogin(true)} className="btn border-none bg-menuvar-300 mr-2">Login</button>
                        <button onClick={() => setLogin(false)} className="btn border-none bg-menuvar-100 ml-2">Register</button>
                    </div>
                    
        
        
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Account Type</span>
                        </label>
                        <select className="select select-bordered text-center">
                            <option disabled selected>Select</option>
                            <option>TA</option>
                            <option>Student</option>
                            <option>Evaluator</option>
                        </select>
                    </div>
        
        
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                    </div>
        
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                    </div>
        
                    <button className="btn btn-xs my-10 btn-md lg:btn-lg">Login</button>


                    </>
            )}


            {!isLogin && (

            <>

                <div className="flex flex-row w-full justify-center">
                    <button onClick={() => setLogin(true)} className="btn border-none bg-menuvar-100 mr-2">Login</button>
                    <button onClick={() => setLogin(false)} className="btn border-none bg-menuvar-300 ml-2">Register</button>
                </div>
                


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Account Type</span>
                    </label>
                    <select className="select select-bordered text-center">
                        <option disabled selected>Select</option>
                        <option>TA</option>
                        <option>Student</option>
                        <option>Evaluator</option>
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Full Name</span>
                    </label>
                    <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Bilkent ID</span>
                    </label>
                    <input type="text" placeholder="ID" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                </div>

                <button className="btn btn-xs my-10 btn-md lg:btn-lg">Register</button>


                </>
            )}




            </div>

      
      </>
    )
  }
  