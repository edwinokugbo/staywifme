import axios from "axios";
import React, { useState, useEffect } from "react";
import { Settings } from "../constants/Settings";

export default function About() {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`${Settings.API_DATA_URL}user/users`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-greyish">
      <div className="w-full md:w-[50%] mx-auto p-4 border-2 border-slate-200">
        <div className="">
          <h1 className="text-xl font-bold text-slate-800 my-2">About Us</h1>
          <img
            src="/img/all-the-ways-man-quietly-tells-you-he-loves-you.png"
            className="rounded-md w-full border-2 border-slate-400 shadow-lg"
          />
        </div>
        <div className="">
          <hr className="my-5" />
          <p>
            Klazroom is a revolutionary new way way to learn. It is designed to
            teach the most important things required for success in this
            information age. The present traditional education systems are
            failing and have become inadequate for training kids and young
            people for lucratie and sustainable careers in the real world. At
            klazroom, we have designed a new educational system that focuses of
            what is needed and filters out the noise and distractions.
            <br />
            <br />
            Young people, growing up today, require new kind of information to
            navigate the emerging career paths now available. But they also need
            to avoid what is becoming and information overload problem. At
            klazroom, our goal is to provie, both a career path guidance and the
            relevant taining and information needed to navigate these paths. Our
            training is simple and focussed. We focuss on the followin training
            paths for young people
            <br />
            <br />
            <ul>
              <li>Financial intelligence</li>
              <li>Emotioal intelligence</li>
              <li>Mathematics</li>
              <li>Language (English, Spanish, French, Mandarin)</li>
              <li>Logic</li>
              <li>Agricultural Science</li>
              <li>ICT</li>
              <li>Social Intelligence</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
}
