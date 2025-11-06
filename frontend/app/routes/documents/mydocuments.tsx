import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode' 
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import api from '~/utils/auth'

const MyDocuments = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
 
    const [documents, setDocuments] = useState([]);
    const [errors, setErrors] = useState<string | null>(null);
    
    useEffect(() => {
        api.get(`/documents/`).then((res) => {
            setDocuments(res.data);
        }).catch((err) => {
            setErrors(err.message);
        });
    }, [userId])
    console.log(documents);
  return (
    <div>
      
    </div>
  )
}

export default MyDocuments
