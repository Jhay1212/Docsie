import React from 'react'
import LoginModal from '~/login/login'
import type { Route } from '../+types/root'


export function meta({}:  Route.MetaArgs) {
    return [
        { title: "Login" },
        { name: "Login", content: "Login your account!" },
    ];
}
const Login = () => {
  return (
    <div className='w-screen h-screen'>
      <div className="flex-center-col items-center">
        <LoginModal />
      </div>
      
    </div>
  )
}

export default Login