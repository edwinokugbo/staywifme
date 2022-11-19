import axios from "axios";
import React, { useState, useEffect } from "react";

type Comments = [
  {
    postId: Number;
    id: Number;
    name: string | any;
    email: string;
    body: string;
  }
];

function Messages() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Comments>([{}] as Comments);

  useEffect(() => {
    try {
      fetch("  https://jsonplaceholder.typicode.com/comments")
        .then((response) => response.json())
        .then((json) => {
          setMessages(json);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="flex flex-col items-center w-full md:w-2/3 lg:w-2/3 bg-white border-slate-300 rounded-md shadow-sm mx-4 px-4 py-8">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-2">Messages</h2>
          {messages.map((messg) => {
            return (
              <div className="w-full border-[1px] border-slate-200 py-4 px-2 text-slate-700">
                <p className="font-bold">{messg.email}</p>
                <p>{messg.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Messages;
