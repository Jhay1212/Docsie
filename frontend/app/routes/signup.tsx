import React from 'react'
import type { Route } from '../+types/root'
import SignupModal from '~/signup/modal';

export function meta({}:  Route.MetaArgs) {
    return [
        { title: "Signup" },
        { name: "Signup", content: "Welcome to React Router!" },
    ];
}
const Signup = () => {
  return (
      <div className="w-screen h-screen">
          <div className="w-full h-full flex-center-row">
              <SignupModal />
              
          </div>
      
    </div>
  )
}

export default Signup
