import React, { useState } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { $getRoot, $getSelection} from 'lexical'
import { type Document } from './types/Document'
import { format } from 'path'

type DocumentProps = {
  id: string
  title: string
  text: string
  date_created: string
  date_modified: string
  is_public: boolean
}

const theme = {
  paragraph: 'text-base leading-6 mb-2 text-gray-800'
}


function onError(error: Error) {
  console.error(error)
}

const Editor = ({ id, title, text, date_created, date_modified, is_public }: Document) => {
  const [value, setValue] = useState('')

  const initialContent = JSON.stringify({
    root: {
      children: [
        {
          details: {text},
          format: 'paragraph',
          mode: 'normal',
          style: "",
          text: text,
          version: 1
        }
      ],
      direction: 'ltr',
      format: 'normal',
      indent: 0,
      type: 'root',
      version: 1
    }
  })
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    editorState: initialContent
  }

  const handleChange = (editorState: any) => {
    editorState.read(() => {
      const root = $getRoot()
      const htmlString = root.getTextContent() // or use $generateHtmlFromNodes for full HTML
      setValue(htmlString)
    })
  }

    return (
      <div className='w-[60%] h-[90%] mx-auto roundd-md'>
            
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border p-4 rounded-sm h-full bg-white">
        <RichTextPlugin
          contentEditable={
              <ContentEditable className="h-[90%] outline-none" />
            }
            placeholder={<div className="text-gray-400">Enter text here</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <OnChangePlugin onChange={handleChange} />

        <p className="mt-4 font-semibold">Output:</p>
        <div
          className="p-2 border rounded text-sm text-red-700 whitespace-pre-wrap bg-gray-50"
          dangerouslySetInnerHTML={{ __html: value }}
          />
      </div>
    </LexicalComposer>
    </div>
  )
}

export default Editor
