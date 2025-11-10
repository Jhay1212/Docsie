import React from 'react'
import {type Document} from '~/types/Document'
type CardDocumentProps = {
    title: string,
    text: string, 
    owner_id: number, 
    date_created: string, 
    is_public: boolean    
}

type CardsProps = {
    documents: Document[]
}

const CardDocument = ({ title, text, owner_id, date_created, is_public}: CardDocumentProps) => {
  return (

    <div className="flex flex-col  hover:border-2 hover:border-blue-500">
      <div className="w-[200px] rounded-sm h-[200px] shadow-2xl bg-white">
          
      
      </div>
      <div className="bg-neutral-600 tracking-tighter">

      <h1 className=" text-neutral-400 py-2">{title}</h1>
      <p className="text-neutral-400 tracking-tighter">Date Created:
        {new Date(date_created).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</p>
        </div>
    </div>
  )
}



const Cards = ( { documents }: CardsProps) => {
  return (
    <div className='flex gap-4'>
      {documents.map((document) => (
        <CardDocument key={document.id} title={document.title} text={document.text} owner_id={document.owner_id} date_created={document.date_created} is_public={document.is_public} />
      ))}
    </div>
  )
}
export default Cards
