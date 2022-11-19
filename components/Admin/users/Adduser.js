import React from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import Router from "next/router";
import { Settings } from "constants/Settings";

function Adduser() {
  const { data: session } = useSession();

  const saveNewUser = (event) => {
    event.preventDefault();

    axios
      .post(`${Settings.API_DATA_URL}user/user`, {
        firstname: event.target.firstname.value,
        middlename: event.target.middlename.value,
        lastname: event.target.lastname.value,
        nickname: event.target.nickname.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        password: event.target.password.value,
        address: event.target.address.value,
        city: event.target.city.value,
        state: event.target.state.value,
        country: event.target.country.value,
        usertype: event.target.usertype.value,
        paymentStatus: event.target.paymentStatus.value,
      })
      .then((response) => {
        const res = response.data;
        if (response.status === 201) {
          Swal.fire({
            title: "Purpose Thoughts",
            text: "User Saved Successfully!",
            icon: "success",
          });
          Router.replace("/admin/users");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Purpose Thoughts",
          text: "Could not save user!",
          icon: "error",
        });
      });
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-start w-screen h-full mb-16 px-4 pt-2">
        <div className="w-full lg:w-1/2 py-4 px-2 md:px-8  border-2 border-gray-100">
          <h1 className="text-2xl font-bold pb-4">New User</h1>
          <hr />
          <form onSubmit={saveNewUser}>
            <div className="flex flex-col">
              <div className="py-4">
                <p className="pb-2">FirstName</p>
                <input
                  name="firstname"
                  type="text"
                  placeholder="FirstName"
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">MiddleName</p>
                <input
                  name="middlename"
                  type="text"
                  placeholder="MiddleName"
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">LastName</p>
                <input
                  name="lastname"
                  type="text"
                  placeholder="LastName"
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">NickName</p>
                <input
                  name="nickname"
                  type="text"
                  placeholder="nickName"
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">Email</p>
                <input
                  name="email"
                  type="text"
                  placeholder="My email"
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">Phone</p>
                <input
                  name="phone"
                  type="text"
                  placeholder="My Phone number"
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">User Type</p>
                <select
                  name="usertype"
                  className="border-simple px-2 py-2 rounded-md w-full"
                >
                  <option value="1">Guest</option>
                  <option value="2">Member</option>
                  <option value="4">Site Contributor</option>
                  <option value="5">Site Editor</option>
                  <option value="6">Site Admin</option>
                </select>
              </div>
              <div className="py-4">
                <p className="pb-2">Payment Status</p>
                <select
                  name="paymentStatus"
                  className="border-simple px-2 py-2 rounded-md w-full"
                >
                  <option value="free">Free Plan</option>
                  <option value="pro">Pro Plan</option>
                  <option value="premium">Premium Plan</option>
                </select>
              </div>
              <div className="py-4">
                <p className="pb-2">Password</p>
                <input
                  name="password"
                  type="password"
                  className="border-simple px-2 py-2 rounded-md w-full lg:w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">Address</p>
                <input
                  name="address"
                  type="text"
                  placeholder="My address"
                  className="border-simple px-2 py-2 rounded-md w-full lg:w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">City</p>
                <input
                  name="city"
                  type="text"
                  placeholder="My City e.g Abuja"
                  className="border-simple px-2 py-2 rounded-md w-full lg:w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">State</p>
                <input
                  name="state"
                  type="text"
                  placeholder="My state"
                  className="border-simple px-2 py-2 rounded-md w-full lg:w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">Country</p>
                <input
                  name="country"
                  type="text"
                  placeholder="My country"
                  className="border-simple px-2 py-2 rounded-md w-full lg:w-full"
                />
              </div>

              <hr />
              <div className="py-4 flex justify-start">
                <button className="btn btn-gray border-2 border-gray-100 hover:border-gray-300 hover:text-amber-700 py-2 px-4">
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <h1>Not logged in</h1>;
  }
}

export default Adduser;
