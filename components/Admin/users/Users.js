import React, { useState, useEffect, forwardRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import MaterialTable from "@material-table/core";
import AdminSidebar from "../AdminSidebar";
import Link from "next/link";
import { Settings } from "constants/Settings";
import tableIcons from "components/Utils/Icons";
import { useSession } from "next-auth/react";

function Users({ apiurl }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const securePage = async () => {
      if (!session || session.user.userType < 4) {
        router.push("/");
      }
    };
    securePage();
  }, [session]);

  const refreshUsers = () => {
    axios
      .get(`${Settings.API_DATA_URL}user/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    refreshUsers();
    return () => {};
  }, []);

  const editUser = (data) => {
    router.replace(`/admin/users/${data._id}`);
  };

  const deleteUser = (id, name) => {
    if (confirm(`Are you sure you want to delete ${name}`) === true) {
      axios
        .delete(`${Settings.API_DATA_URL}user/user/`, {
          params: {
            id: id,
          },
        })
        .then((response) => {
          if (response.status === 404) {
            console.log("User not found");
          } else {
            const res = response.data;
            if (res.deletedCount === 1 || res.data.deletedCount === "1") {
              Swal.fire({
                title: "Purpose Thoughts",
                text: "User Deleted Successfully!",
                icon: "success",
              });
            }
            refreshUsers();
          }
        })
        .catch((err) => {
          console.log(`Error is: ${err}`);
        });
    } else {
      alert("You said no!");
    }
  };

  const filterByType = (e) => {
    axios
      .get(`http://localhost:50000/filter-users`, {
        params: {
          usertype: e.target.value,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (session) {
    return (
      <div className="flex w-screen min-h-screen overflow-x-scroll">
        <AdminSidebar />
        <div className="px-4 pt-4 mb-16 w-full bg-slate-100">
          <div className="flex justify-evenly w-full mb-2">
            <div className="flex-1 flex flex-col md:flex-row justify-start items-center w-full lg:w-fit mb-2">
              <p className="mr-4 text-lg font-bold">Users</p>
              <Link href={`/admin/users/add-user`}>
                <button className="btn btn-simple text-global-blue text-md border-1 border-blue-200 font-bold">
                  Add New
                </button>
              </Link>
            </div>

            <div className="flex-1 w-full flex justify-end pr-6">
              <select
                name="usertype"
                className="border-simple px-4 py-2 rounded-md"
                onChange={filterByType}
              >
                <option value="0">Select User Type</option>
                <option value="1">Regular Users</option>
                <option value="2">Contestants</option>
                <option value="3">Judges</option>
                <option value="4">Site Contributors</option>
                <option value="5">Site Editors</option>
                <option value="6">Site Admins</option>
              </select>
            </div>
          </div>
          <MaterialTable
            icons={tableIcons}
            columns={[
              {
                title: "Firstname",
                field: "firstname",
              },
              { title: "MidName", field: "middlename" },
              { title: "Lastname", field: "lastname" },
              { title: "Email", field: "email" },
              { title: "Phone", field: "phone" },
              { title: "Type", field: "usertype" },
              { title: "Paid?", field: "paymentStatus" },
              {
                title: "Date Registered",
                field: "dateRegistered",
                type: "Date",
              },
            ]}
            data={users}
            onRowClick={(evt, selectedRow) =>
              setSelectedRow(selectedRow.tableData.id)
            }
            actions={[
              {
                icon: tableIcons.Edit,
                tooltip: "Edit User",
                onClick: (event, rowData) => editUser(rowData),
              },
              (rowData) => ({
                icon: tableIcons.Delete,
                tooltip: "Delete User",
                onClick: (event, rowData) =>
                  deleteUser(
                    rowData._id,
                    rowData.firstname + " " + rowData.lastname
                  ),
                disabled: rowData.birthYear < 2000,
              }),
            ]}
            options={{
              headerStyle: {
                backgroundColor: "#eee",
                color: "#02255e",
                fontSize: ".9em",
                fontWeight: "bold",
                paddingTop: "7px",
                paddingBottom: "7px",
                borderTop: "solid 1px #ccc",
                borderBottom: "solid 1px #ccc",
                boxShadow: "5px 10px #888888",
              },
              rowStyle: (rowData) => ({
                backgroundColor:
                  selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
                height: "0",
                fontSize: "0.9em",
              }),
              exportButton: true,
              actionsColumnIndex: -1,
            }}
            title=""
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-screeen h-screen pt-4">
      <h1 className="text-xl font-bold">Loading...</h1>
    </div>
  );
}

export default Users;
