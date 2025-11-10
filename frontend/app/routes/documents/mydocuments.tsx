import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode' 
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import api from '~/utils/auth'
import { type Document as DocumentP} from '~/types/Document'
import Cards from './CardDocument'


const MyDocuments = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
 
    const [documents, setDocuments] = useState<DocumentP[]>([]);
    const [errors, setErrors] = useState<string | null>(null);
    
    useEffect(() => {
        api.get(`/documents/`).then((res) => {
            setDocuments(res.data);
        }).catch((err) => {
            setErrors(err.message);
        });
    }, [userId])
  // console.log(Object.values(documents), "val");
  // console.log(Object.values(documents), "key");
  documents.map((document) => {
    
    console.log(document)
  })
  
  return (
    <div className='full-screen'>
      <Cards documents={documents} />
    </div>
  )
}

export default MyDocuments
