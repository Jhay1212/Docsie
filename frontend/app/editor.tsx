import React, { useState } from "react";
import { type Doc } from "~/types/Doc";

interface EditorProps extends Doc {
  handleEditorChange: () => void | null
}

const Editor = ({
  id,
  title,
  text,
  date_created,
  date_modified,
  is_public,

}: EditorProps,
) => {
  const [value, setValue] = useState(text);
  
  return (
    <div className="w-80 h-full my-10">
      <form action="" method="post">
      <div
        contentEditable
        suppressContentEditableWarning
        className="bg-white text-black rounded-md p-3 min-h-[200px] border border-gray-300"
        onInput={(e) => setValue((e.target as HTMLDivElement).innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
      </form>
    </div>
  );
};

export default Editor;
