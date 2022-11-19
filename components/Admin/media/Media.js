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

function Media({ apiurl }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewmode, setViewMode] = useState("grid");
  const [viewicon, setViewIcon] = useState("fa fa-list");

  const refreshMedia = () => {
    axios
      .get(`${Settings.API_DATA_URL}all-media`)
      .then((response) => {
        const data = response.data;
        setMedia(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    refreshMedia();
    return () => {};
  }, []);

  const editMedia = (data) => {
    router.replace(`/admin/media/${data._id}`);
  };

  const deleteMedia = (id, title) => {
    if (
      confirm(`Are you sure you want to delete this media: ${title}`) === true
    ) {
      axios
        .delete(`${Settings.API_DATA_URL}media`, {
          params: {
            id: id,
          },
        })
        .then((response) => {
          if (response.status === 404) {
            console.log("Media not found");
          } else {
            const res = response.data;
            if (res.deletedCount === 1 || res.data.deletedCount === "1") {
              Swal.fire({
                title: "Purpose Thoughts",
                text: "Media Deleted Successfully!",
                icon: "success",
              });
            }
            refreshMedia();
          }
        })
        .catch((err) => {
          console.log(`Error is: ${err}`);
        });
    } else {
      alert("You said no!");
    }
  };

  const changeViewMode = () => {
    if (viewmode === "list") {
      setViewMode("grid");
      setViewIcon("fa fa-list");
    } else {
      setViewMode("list");
      setViewIcon("fa fa-th-large");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex w-screen h-screen overflow-x-scroll">
        <AdminSidebar />
        <div className="px-4 pt-4 mb-16 w-full bg-slate-100">
          <div className="flex justify-between items-center w-fit mb-2">
            <p className="mr-4 text-lg font-bold">Media</p>
            <Link href={`/admin/media/add-media`}>
              <button className="btn btn-simple btn-red text-global-blue text-md border-1 border-blue-200 font-bold">
                Add New
              </button>
            </Link>
            <button
              onClick={changeViewMode}
              className="btn btn-simple btn-red text-global-blue text-md font-bold border-1 border-blue-200"
            >
              <i className={viewicon}></i>
            </button>
          </div>
          {viewmode === "list" && (
            <MaterialTable
              icons={tableIcons}
              columns={[
                {
                  title: "Title",
                  field: "title",
                },
                {
                  title: "URL",
                  render: (rowData) => rowData.url,
                },
                {
                  title: "URL",
                  field: "url",
                  render: (item) => (
                    <img
                      src={item.url}
                      alt=""
                      border="3"
                      width="70"
                      height="70"
                      style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                    />
                  ),
                },
                {
                  title: "Date Published",
                  field: "createdAt",
                  type: "Date",
                },
              ]}
              data={media}
              onRowClick={(evt, selectedRow) =>
                setSelectedRow(selectedRow.tableData.id)
              }
              actions={[
                {
                  icon: tableIcons.Edit,
                  tooltip: "Edit Media",
                  onClick: (event, rowData) => editMedia(rowData),
                },
                (rowData) => ({
                  icon: tableIcons.Delete,
                  tooltip: "Delete Media",
                  onClick: (event, rowData) =>
                    deleteMedia(rowData._id, rowData.title),
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
          )}
          {viewmode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-10 gap-2">
              {media.map((med) => {
                return (
                  <div
                    key={med._id}
                    className="border border-slate-300 rounded-lg shadow-lg"
                  >
                    <img src={med.url} alt="" className="w-fit h-fit" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex felx-col justify-center items-center w-screeen h-screen">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
    );
  }
}

export default Media;
