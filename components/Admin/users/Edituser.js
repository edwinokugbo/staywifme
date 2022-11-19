import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { Settings } from "constants/Settings";
import { useRouter } from "next/router";
import UploadImage from "components/Utils/UploadImage";
import Image from "next/image";

const userSchema = {
  firstname: "",
  middlename: "",
  lastname: "",
  nickname: "",
  email: "",
  phone: "",
  addess: "",
  facebook: "",
  twitter: "",
  instagram: "",
  usertype: 1,
};

function Edituser({ userid }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    axios
      .get(`${Settings.API_DATA_URL}user/user`, {
        params: {
          id: userid,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, [userid]);

  const updateUser = (event) => {
    event.preventDefault();

    axios
      .patch(`${Settings.API_DATA_URL}user/user`, {
        id: user._id,
        firstname: event.target.firstname.value,
        middlename: event.target.middlename.value,
        lastname: event.target.lastname.value,
        nickname: event.target.nickname.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        addess: event.target.address.value,
        facebook: event.target.facebook.value,
        twitter: event.target.twitter.value,
        instagram: event.target.instagram.value,
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
          router.replace("/admin/users");
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

  const setInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const showMediaUpload = () => {
    setUpload(!upload);
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-start w-screen h-full mb-16 px-4 pt-2">
        <div className="w-full lg:w-1/2 py-4 px-2 md:px-8  border-2 border-gray-100">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold pb-4">Edit User</h1>{" "}
            <p
              className="border-2 border-slate-200 flex justify-center items-center py-1 px-3 cursor-pointer"
              title="Upload Image"
              onClick={showMediaUpload}
            >
              <i className="fa fa-camera text-global-blue"></i>
            </p>
          </div>
          {upload && (
            <div>
              <UploadImage id={user._id} />
            </div>
          )}
          <Image
            alt=""
            src={
              user.profileImage && user.profileImage.startsWith("/")
                ? `${user.profileImage}`
                : "/" + user.profileImage
            }
            width={300}
            height={250}
            layout="fixed"
          />
          <hr />
          <form onSubmit={updateUser}>
            <div className="flex flex-col">
              {/* <div className="py-4">
                <p className="pb-2">Profile Image</p>
                <input
                  name="profileImage"
                  value={user.profileImage}
                  type="text"
                  placeholder="Profile Image Link"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div> */}
              <div className="py-4">
                <p className="pb-2">FirstName</p>
                <input
                  name="firstname"
                  value={user.firstname}
                  type="text"
                  placeholder="FirstName"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">MiddleName</p>
                <input
                  name="middlename"
                  value={user.middlename}
                  type="text"
                  placeholder="MiddleName"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">LastName</p>
                <input
                  name="lastname"
                  value={user.lastname}
                  type="text"
                  placeholder="LastName"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">NickName</p>
                <input
                  name="nickname"
                  value={user.nickname}
                  type="text"
                  placeholder="nickName"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">Email</p>
                <input
                  name="email"
                  value={user.email}
                  type="text"
                  placeholder="email"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">Phone</p>
                <input
                  name="phone"
                  value={user.phone}
                  type="text"
                  placeholder="Phone number"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">Address</p>
                <input
                  name="address"
                  value={user.address}
                  type="text"
                  placeholder="Address"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">User Type</p>
                <select
                  name="usertype"
                  value={user.usertype}
                  onChange={setInput}
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
                  value={user.paymentStatus}
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                >
                  <option value="free">Free Plan</option>
                  <option value="pro">Pro Plan</option>
                  <option value="premium">Premium Plan</option>
                </select>
              </div>
              <div className="py-4">
                <p className="pb-2">Twitter</p>
                <input
                  name="twitter"
                  value={user.twitter}
                  type="text"
                  placeholder="Twiiter handle"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">Instagram</p>
                <input
                  name="instagram"
                  value={user.instagram}
                  type="text"
                  placeholder="Instagram handle"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">Facebook</p>
                <input
                  name="facebook"
                  value={user.facebook}
                  type="text"
                  placeholder="Facebook handle"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
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

export default Edituser;
