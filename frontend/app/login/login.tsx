import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router";
import {toast} from 'react-toastify'

const LoginModal = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const resetForm = () => {
        setForm({
            username: "",
            password: ""
        })
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/", form)
            console.log(response.data)
            setMessage("Log in successful!")
            toast(message);
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            navigate("/documents",{state:  {loggedIn: true}});

        } catch (error: any) {
            console.log(error.message)
            setErrors(error.message)
            toast((error.message))
        }finally {
            resetForm();
        }

    }
    return (
    
        <div className='w-[400px] h-[720px] border-double bg-linear-to-b
        from-violet-900/20 via-blue-900 to-violet-700/10 
        rounded-md border-white border-5 shadow-2xl
         px-10 '>
            <h1 className='text-center text-2xl font-extrabold tracking-wide mt-5 text-white'>Login</h1>
            <p className="text-red-500 text-left px-4 py-5">{errors}</p>
            <p className="text-green-500 text-left px-4 py-5">{message}</p>


          <form action="" method="post" className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div className="my-5 relative">
                    <label htmlFor="username" className='text-neutral-200 font-light text-xl p-4 mb-10'>
                        Enter Username or Email</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    value={form.username}    
                    className='border rounded-md p-2 w-full' />
              </div>
              <div className="my-5 relative">
                  <label htmlFor="password" className='text-neutral-200 font-light text-xl p-4 m-5'>Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={form.password}
                    className='border rounded-md p-2 w-full' />
              </div>
                <button className='bg-green-800 px-12 py-5 text-white mx-auto rounded-md'>Submit</button>
                 <p className='pt-2 text-sm tracking-wider text-center'>Need an account? 
                    <span className='text-blue-400 uppercase px-1 font-bold'>
                    <Link to="/signup">Signup </Link>
                    </span> now</p>
          </form>
      
    </div>
  )
}

export default LoginModal
