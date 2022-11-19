import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { Settings } from "constants/Settings";
import { useRouter } from "next/router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "components/Utils/EditorMenuBar";

function Addsubscription({ postid }) {
  const router = useRouter();
  const { data: session } = useSession();
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });
  const [subscription, setSubscription] = useState({
    subscriber: "",
    plan: "",
    duration: "",
    status: 0,
  });
  const [preview, setPreview] = useState(false);

  const saveSubscription = (event) => {
    event.preventDefault();

    axios
      .post(`${Settings.API_DATA_URL}subscription/subscription`, {
        // subscriber: subscription.subscriber,
        subscriber: "61f1a625b7bdb489e82ba20b",
        plan: subscription.plan,
        duration: subscription.duration,
        status: subscription.status,
        date_created: subscription.date_created,
        author: session.user.id,
      })
      .then((response) => {
        const res = response.data;
        console.log(res);
        if (response.status === 201) {
          Swal.fire({
            title: "Purpose Thoughts",
            text: "Subscription Saved Successfully!",
            icon: "success",
          });
          router.replace("/admin/subscriptions");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Purpose Thoughts",
          text: "Could not save subscription!",
          icon: "error",
        });
      });
  };

  const inputChange = (e) => {
    setSubscription({
      ...subscription,
      [e.target.name]: e.target.value,
    });
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-start w-screen h-full mb-16 px-4 pt-2">
        <div className="w-full lg:w-3/4 py-4 px-2 md:px-8  border-2 border-gray-100">
          <h1 className="text-2xl font-bold pb-4">Add Subscription</h1>
          <hr />
          <div className="flex flex-col">
            <div className="py-4">
              <p className="pb-2">Subscriber</p>
              <input
                name="title"
                value={subscription.title}
                onChange={inputChange}
                type="text"
                placeholder="Subscriber"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Plan</p>
              <select
                name="plan"
                value={subscription.plan}
                onChange={inputChange}
                placeholder="Plan"
                className="border-simple px-2 py-2 rounded-md w-full"
              >
                <option value="0">Basic</option>
                <option value="1">Premium</option>
              </select>
            </div>
            <div className="py-4">
              <p className="pb-2">Duration</p>
              <select
                name="duration"
                value={subscription.duration}
                onChange={inputChange}
                placeholder="duration"
                className="border-simple px-2 py-2 rounded-md w-full"
              >
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="12">1 Year</option>
              </select>
            </div>
            <div className="py-4">
              <p className="pb-2">Date Published</p>
              <input
                name="date_created"
                value={subscription.date_created}
                onChange={inputChange}
                type="datetime-local"
                placeholder="Date Published"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Status</p>
              <select
                name="status"
                value={subscription.status}
                onChange={inputChange}
                placeholder="Status"
                className="border-simple px-2 py-2 rounded-md w-full"
              >
                <option value="0">Pending</option>
                <option value="1">Approved</option>
                <option value="2">Suspended</option>
              </select>
            </div>
            <hr />
            <div className="py-4 flex justify-start">
              <button
                onClick={saveSubscription}
                className="btn btn-gray border-2 border-gray-100 hover:border-gray-300 hover:text-amber-700 py-2 px-4"
              >
                Save Subscription
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Not logged in</h1>;
  }
}

export default Addsubscription;
