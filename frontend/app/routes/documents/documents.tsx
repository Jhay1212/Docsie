import axios from 'axios'
import { useState, useEffect,type  CSSProperties } from 'react';
import { useParams } from 'react-router'
import Editor from '~/editor';
import api from '~/utils/auth';
import Spinner from 'react-spinners'
import type { Doc } from '~/types/Doc';

const Documents = () => {
  const { documentId } = useParams();
  const [messages, setMessages] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<Document>();
  const [error, setErrors] = useState<string | null>(null);
  const {BounceLoader} = Spinner;

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      await api.get(`/documents/${documentId}`).then((res) => {
        setDocuments(res.data);
      })
    } catch (err: any) {
      setErrors(err.message);
      setIsLoading(true);
    }
  }

  const loadScreen = () => {
    return(
      <div className='h-screen w-screen'>
        <div className="absolute flex flex-items-center">
          <BounceLoader/>
        </div>

      </div> 
    )
  }
  useEffect(() => {
    fetchDocuments();
  }, [documentId])

  if(isLoading) return loadScreen;
  return (
    <div className='w-screen h-screen'>
    
      <h1 className="text-emerald-100 text-xl tracking-wide  font-bold ">
        Document {documentId}
      </h1>
      <div className="w-full justify-center items-center">
        <h1 className='text-white'>{!documents}</h1>
      </div>
      <h1 className="text-xl text-center font-bolder text-white">Edit Task</h1>
      <Editor
        title="sdasd"
        slug='test'
        owner_id={1}
        text="test"
        id="123"
        date_created="test"
        date_modified="test"
        is_public={false}
        handleEditorChange={() => {}}
        
      />
    </div>
  )
}

export default Documents
