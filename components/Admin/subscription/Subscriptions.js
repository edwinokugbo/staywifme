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

const plan = ["Basic", "Premium"];
const status = ["Pending", "Approved", "Suspended"];
const duration = { 1: "1 Month", 3: "3 Months", 12: "1 Year" };

function Subscriptions({ apiurl }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const refreshSubscriptions = () => {
    axios
      .get(`${Settings.API_DATA_URL}subscription/subscriptions`)
      .then((response) => {
        const data = response.data;
        setSubscriptions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    refreshSubscriptions();
    return () => {};
  }, []);

  const editSubscription = (data) => {
    router.replace(`/admin/subscriptions/${data._id}`);
  };

  const deleteSubscription = (id, subscriber) => {
    if (
      confirm(
        `Are you sure you want to delete subscription with name: ${subscriber}`
      ) === true
    ) {
      axios
        .delete(`${Settings.API_DATA_URL}subscription/subscription`, {
          params: {
            sid: id,
          },
        })
        .then((response) => {
          if (response.status === 404) {
            console.log("Subscription not found");
          } else {
            const res = response.data;
            if (res.deletedCount === 1 || res.data.deletedCount === "1") {
              Swal.fire({
                title: "Purpose Thoughts",
                text: "Subscription Deleted Successfully!",
                icon: "success",
              });
            }
            refreshSubscriptions();
          }
        })
        .catch((err) => {
          console.log(`Error is: ${err}`);
        });
    } else {
      alert("You said no!");
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
      <div className="flex w-screen min-h-screen overflow-x-scroll">
        <AdminSidebar />
        <div className="px-4 pt-4 mb-16 w-full bg-slate-100">
          <div className="flex justify-between items-center w-fit mb-2">
            <p className="mr-4 text-lg font-bold">Subscriptions</p>
            <Link href={`/admin/subscriptions/add_subscription`}>
              <button className="btn btn-simple btn-red text-global-blue text-md border-1 border-blue-200 font-bold">
                Add New
              </button>
            </Link>
          </div>
          <MaterialTable
            icons={tableIcons}
            columns={[
              // {
              //   title: "Subscriber",
              //   field: "subscriber",
              // },
              {
                title: "Subscriber",
                render: (rowData) =>
                  rowData.subscriber.firstname +
                  " " +
                  rowData.subscriber.lastname,
              },
              {
                title: "Plan",
                render: (rowData) => plan[rowData.plan],
              },
              {
                title: "Duration",
                render: (rowData) => duration[rowData.duration],
              },
              {
                title: "Date Published",
                field: "date_created",
                type: "Date",
              },
              {
                title: "Status",
                render: (rowData) => status[rowData.status],
              },
            ]}
            data={subscriptions}
            onRowClick={(evt, selectedRow) =>
              setSelectedRow(selectedRow.tableData.id)
            }
            actions={[
              {
                icon: tableIcons.Edit,
                tooltip: "Edit Subscription",
                onClick: (event, rowData) => editSubscription(rowData),
              },
              (rowData) => ({
                icon: tableIcons.Delete,
                tooltip: "Delete Subscription",
                onClick: (event, rowData) =>
                  deleteSubscription(
                    rowData._id,
                    rowData.subscriber.firstname +
                      " " +
                      rowData.subscriber.lastname
                  ),
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

  if (!session) {
    return (
      <div className="flex felx-col justify-center items-center w-screeen h-screen">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
    );
  }
}

export default Subscriptions;
