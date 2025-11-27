import React, { useState, useEffect } from "react";
import Editor from "~/editor";
import axios from "axios";
import { type Doc } from "~/types/Doc";

const Create = () => {
  const [data, setData] = useState();
  const [currentUsers, setCurrentUsers] = useState([])

  const handleEditorChange = () => {
      return
  }
  return (
    <div className="h-screen w-screen flex-center-col">
      <h1>Create new Document</h1>
      <form method="post" action='' >


      <Editor
        title="sdasd"
        slug="test"
        owner_id={1}
        text="test"
        id="123"
        date_created="test"
        date_modified="test"
        is_public={false}
        handleEditorChange={handleEditorChange}
        />
    
        </form>
    </div>
  );
};

export default Create;
