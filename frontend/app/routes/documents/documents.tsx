import axios from 'axios'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import Editor from '~/editor';
import api from '~/utils/auth';
import type { Document } from '~/types/Document';
const Documents = () => {
  const { documentId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
  const [documents, setDocuments] = useState<Document>();
  const [error, setErrors] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      await api.get(`/documents/${documentId}`).then((res) => {
        setDocuments(res.data);
      })
    } catch (err: any) {
      setErrors(err.message);
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, [documentId])
  console.log(documents);
  return (
    <div className='w-screen h-screen'>
      <h1 className="text-red-800 font-semibold">
        Document {documentId}
      </h1>
      <Editor />
    </div>
  )
}

export default Documents
