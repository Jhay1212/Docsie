import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { AtSign, KeyRound, User } from 'lucide-react'
import { Link } from 'react-router'
import type { ReactFormState } from 'react-dom/client'

interface UserFormData {
    username: string,
    email: string,
    password: string
        
}
const SignupModal = () => {
    const [formData, setFormData] = useState<UserFormData>({
        username: '',
        email: '',
        password: ''
    });


    const resetForm = () => {
        setFormData({
            username: "",
            email: "",
            password: ""
        })
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/signup/", formData)
            console.log(response.data)
            alert("successful")
            
        } catch (error) {
            console.log(error)
        } finally {
            resetForm();
        }
        

       
    }
  return (
      <div className="modal w-[400px] h-[720px] bg-violet-900/10 
    rounded-md border-white border-5 shadow-2xl
    ">
          <div className="flex-center-col">
              <form action="" method="post" className='form-control' onSubmit={handleSubmit}>
                  <h1 className="text-center text-2xl font-extrabold tracking-wide mt-5 text-white">Signup</h1>
                  <div className=" py-5">
                      <label htmlFor="username" className='text-2xl flex gap-5 ml-2 text-white text-semibold'>
                          <User />
                          Username
                      </label>
                      <input
                          required
                          type="text"
                          name="username"
                          id="username" 
                          value={formData.username}
                          onChange={handleChange}
                          className="w-full max-w-xs mt-2 px-4 py-3 
                        bg-linear-to-br from-amber-50 to-amber-100 
                        text-gray-800 font-medium
                        border-2 border-amber-200
                        rounded-xl
                        shadow-sm hover:shadow-md
                        transition-all duration-300 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                        focus:border-transparent focus:bg-white
                        placeholder:text-amber-400/60
                        hover:border-amber-300"
                      
                      />
                  </div>

                  <div className="relative py-5">
                      <label htmlFor="email" className='text-2xl flex gap-5 ml-2 items-center text-white text-semibold'>
                          <AtSign />
                          Email
                      </label>
                      <input
                          required
                          type="email"
                          name="email"
                          id="email" 
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full max-w-xs mt-2 px-4 py-3 
                          bg-linear-to-br from-amber-50 to-amber-100 
                          text-gray-800 font-medium
                          border-2 border-amber-200
                          rounded-xl
                          shadow-sm hover:shadow-md
                          transition-all duration-300 ease-in-out
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                          focus:border-transparent focus:bg-white
                          placeholder:text-amber-400/60
                          hover:border-amber-300"
                      />
                  </div>

                  <div className="relative py-5">
                      <label htmlFor="email" className='text-2xl flex gap-5 ml-2 items-center text-white text-semibold'>
                          <KeyRound />    
                          Password
                      </label>
                      <input
                          required
                          type="password"
                          name="password"
                          id="password" 
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full max-w-xs mt-2 px-4 py-3 
                          bg-linear-to-br from-amber-50 to-amber-100 
                          text-gray-800 font-medium
                          border-2 border-amber-200
                          rounded-xl
                          shadow-sm hover:shadow-md
                          transition-all duration-300 ease-in-out
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                          focus:border-transparent focus:bg-white
                          placeholder:text-amber-400/60
                          hover:border-amber-300"
                      />
                  </div>

                  <div className="relative py-5">
                      <label htmlFor="email" className='text-2xl flex gap-5 ml-2 items-center text-white text-semibold'>
                             <KeyRound />
                            Confirm Password
                      </label>
                      <input
                          required
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword" 
                          className="w-full max-w-xs mt-2 px-4 py-3 
                          bg-linear-to-br from-amber-50 to-amber-100 
                          text-gray-800 font-medium
                          border-2 border-amber-200
                          rounded-xl
                          shadow-sm hover:shadow-md
                          transition-all duration-300 ease-in-out
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                          focus:border-transparent focus:bg-white
                          placeholder:text-amber-400/60
                          hover:border-amber-300"
                      />
                  </div>
                  
                  <button type="submit" className='button px-10 py-5 bg-blue-800
                   text-center mx-auto rounded-lg'>Submit</button>
                  <p className='pt-2'>Have an account <span className='text-blue-400 uppercase'>
                  <Link to="/login">Login</Link>
                  </span>  now</p>
            </form>
          </div>        
    </div>
  )
}

export default SignupModal
