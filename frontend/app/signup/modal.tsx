import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { AtSign, KeyRound, User } from 'lucide-react'
import { Link } from 'react-router'
import type { ReactFormState } from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify'
interface UserFormData {
    username: string,
    email: string,
    password: string
        
}
const SignupModal = () => {
  const notify = () => toast("Account created succesfully!")
    const [formData, setFormData] = useState<UserFormData>({
        username: '',
        email: '',
        password: ''
    });
    const [isSuccess, setSuccess] = useState<boolean>(false);

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
            setSuccess(true);
            alert(isSuccess)
            
        } catch (error: any) {
            console.log(error, `${error.message} error`)
        } finally {
            resetForm();
        }
        

       
    }
  return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-violet-900/30 via-blue-900/40 to-violet-800/20 p-4">
  <div className="w-full max-w-md bg-linear-to-b from-violet-900/20 via-blue-900 to-violet-700/10 
      rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8 ">

      {isSuccess && (
        <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
      )}

    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
      method="post"
    >
      <h1 className="text-center text-3xl sm:text-4xl font-extrabold tracking-wide text-white">
        Signup
      </h1>

      {/* Username */}
      <div>
        <label htmlFor="username" className="text-lg flex items-center gap-3 text-white font-semibold mb-2">
          <User /> Username
        </label>
        <input
          required
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100
          text-gray-800 font-medium placeholder:text-amber-400/60 
          shadow-sm hover:shadow-md transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:border-transparent focus:bg-white"
          placeholder="Enter your username"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="text-lg flex items-center gap-3 text-white font-semibold mb-2">
          <AtSign /> Email
        </label>
        <input
          required
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100
          text-gray-800 font-medium placeholder:text-amber-400/60 
          shadow-sm hover:shadow-md transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:border-transparent focus:bg-white"
          placeholder="Enter your email"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="text-lg flex items-center gap-3 text-white font-semibold mb-2">
          <KeyRound /> Password
        </label>
        <input
          required
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100
          text-gray-800 font-medium placeholder:text-amber-400/60 
          shadow-sm hover:shadow-md transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:border-transparent focus:bg-white"
          placeholder="Enter your password"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="text-lg flex items-center gap-3 text-white font-semibold mb-2">
          <KeyRound /> Confirm Password
        </label>
        <input
          required
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100
          text-gray-800 font-medium placeholder:text-amber-400/60 
          shadow-sm hover:shadow-md transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:border-transparent focus:bg-white"
          placeholder="Confirm your password"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 mt-2 bg-blue-800 text-white font-bold text-lg rounded-xl 
        hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out"
      >
        Submit
      </button>

      <p className="text-center text-sm sm:text-base text-white mt-2">
        Have an account?{" "}
        <span className="text-blue-400 uppercase hover:underline">
          <Link to="/login">Login</Link>
        </span>{" "}
        now
      </p>
    </form>
  </div>
</div>

  )
}

export default SignupModal
