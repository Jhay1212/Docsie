import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router";

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
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            navigate("/");

        } catch (error: any) {
            console.log(error.message)
            setErrors(error.message)
        }finally {
            resetForm();
        }

    }
    return (
    
      <div className='w-[40%] h-[50%] border-double border-4 border-white'>
            <h1 className='text-white font-extrabold py-3 pl-5 text-3xl'>Login</h1>
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
              <button className='bg-green-800 px-5 py-10 text-white mx-auto rounded-md'>Submit</button>
          </form>
      
    </div>
  )
}

export default LoginModal
