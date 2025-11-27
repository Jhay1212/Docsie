import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import api from "~/utils/auth";
import { type Doc } from "~/types/Doc";
import Cards from "./CardDocument";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router";
import { Zoom } from "react-toastify";
import { Link } from "react-router";

const MyDocuments = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [errors, setErrors] = useState<string | null>(null);
  const [messages, setMessages] = useState<string | null>(null);
  useEffect(() => {
    api
      .get(`/documents/`)
      .then((res) => {
        setDocuments(res.data);
      })
      .catch((err) => {
        setErrors(err.message);
        navigate('/login')
      });

    if (location.state?.loggedIn) {
      toast.success("User logged in successfully!");
    }
  }, [userId]);

  return (
    <div className="w-screen h-screen">
      <div className="absolute">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Zoom}
        />
      </div>
      <div className="flex justify-evenly flex-wrap">
        <Link to="/documents/create">
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
                Create new document
              </h1>
            </div>
          </div>
        </Link>
        <Cards documents={documents} />
      </div>
    </div>
  );
};

export default MyDocuments;
