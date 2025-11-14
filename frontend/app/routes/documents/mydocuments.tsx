import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode' 
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import api from '~/utils/auth'
import { type Document as DocumentP} from '~/types/Document'
import Cards from './CardDocument'
import { toast,  ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router'


const MyDocuments = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
 
    const [documents, setDocuments] = useState<DocumentP[]>([]);
    const [errors, setErrors] = useState<string | null>(null);
    const [messages, setMessages] = useState<string | null>(null);    

  



    useEffect(() => {
        api.get(`/documents/`).then((res) => {
            setDocuments(res.data);
        }).catch((err) => {
            setErrors(err.message);
        });

        if (location.state?.loggedIn) {
          toast.success("User logged in successfully!")
        } 
    }, [userId])
  // console.log(Object.values(documents), "val");
  // console.log(Object.values(documents), "key");
  documents.map((document) => {
    
    console.log(document)
  })
  
  return (
    <div className='full-screen'>
      <div id="toast"  className="min-w-full absolute top-20 ">
      <ToastContainer 
        position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
      />

      {/* <div className="w-1/2 mx-auto py-5  bg-blue-800/20 rounded-md">
        <h1 className='text-green-500 text-center text-xl'>Logged in Successfully!</h1>
      </div> */}
    </div>
      <h1 className="text-white">asdad</h1>
      <Cards documents={documents} />
    </div>
  )
}

export default MyDocuments
