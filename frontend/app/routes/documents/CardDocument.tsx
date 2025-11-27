import React from "react";
import { Link } from "react-router";
import { type Doc } from "~/types/Doc";
type CardDocumentProps = {
  title: string;
  text: string;
  owner_id: number;
  date_created: string;
  is_public: boolean;
};

type CardsProps = {
  documents: Doc[];
};

const CardDocument = ({
  title,
  text,
  owner_id,
  date_created,
  is_public,
}: CardDocumentProps) => {
  return (
    <div className="w-[240px] rounded-xl overflow-hidden shadow-lg bg-white border border-neutral-300 cursor-pointer hover:shadow-2xl transition-shadow duration-300">
      <div className="w-full h-[300px] bg-white p-4 flex flex-col gap-2 overflow-hidden">
        <div className="flex items-center gap-2 text-neutral-400 text-sm select-none">
          <div className="h-3 w-20 bg-neutral-200 rounded"></div>
          <div className="h-3 w-10 bg-neutral-200 rounded"></div>
          <div className="h-3 w-14 bg-neutral-200 rounded"></div>
        </div>

        <div className="flex flex-col gap-2 mt-4 select-none">
          <div className="h-3 w-full bg-neutral-200 rounded"></div>
          <div className="h-3 w-5/6 bg-neutral-200 rounded"></div>
          <div className="h-3 w-3/4 bg-neutral-200 rounded"></div>
          <div className="h-3 w-4/5 bg-neutral-200 rounded"></div>
          <div className="h-3 w-2/3 bg-neutral-200 rounded"></div>
        </div>
      </div>

      <div className="bg-neutral-700 p-3">
        <h1 className="text-neutral-200 text-sm font-semibold truncate">
          {title}
        </h1>
        <p className="text-neutral-300 text-xs mt-1 tracking-tight">
          Date Created:{" "}
          {new Date(date_created).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

const Cards = ({ documents }: CardsProps) => {
  console.log(documents)
  return (
    <div className="w-full flex justify-evenly flex-wrap bg-red-900">
      {documents.map((document) => (
        <Link to={`/documents/${document.id}`}>

        <CardDocument
          key={document.id}
          title={document.title}
          text={document.text}
          owner_id={document.owner_id}
          date_created={document.date_created}
          is_public={document.is_public}
          />
          </Link>
        ))}
    </div>
  );
};
export default Cards;
