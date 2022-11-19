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

function Books({ apiurl }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const refreshBooks = () => {
    axios
      .get(`${Settings.API_DATA_URL}book/books`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    refreshBooks();
    return () => {};
  }, []);

  const editBook = (data) => {
    router.replace(`/admin/books/${data._id}`);
  };

  const deleteBook = (id, title) => {
    if (
      confirm(`Are you sure you want to delete book with title: ${title}`) ===
      true
    ) {
      axios
        .delete(`${Settings.API_DATA_URL}book/book`, {
          params: {
            bid: id,
          },
        })
        .then((response) => {
          if (response.status === 404) {
            console.log("Book not found");
          } else {
            const res = response.data;
            if (res.deletedCount === 1 || res.data.deletedCount === "1") {
              Swal.fire({
                title: "Purpose Thoughts",
                text: "Book Deleted Successfully!",
                icon: "success",
              });
            }
            refreshBooks();
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
            <p className="mr-4 text-lg font-bold">E-Books</p>
            <Link href={`/admin/books/add_book`}>
              <button className="btn btn-simple btn-red text-global-blue text-md border-1 border-blue-200 font-bold">
                Add New
              </button>
            </Link>
          </div>
          <MaterialTable
            icons={tableIcons}
            columns={[
              {
                title: "Title",
                field: "title",
              },
              {
                title: "Pages",
                field: "pages",
              },
              {
                title: "Date Published",
                field: "date_created",
                type: "Date",
              },
            ]}
            data={books}
            onRowClick={(evt, selectedRow) =>
              setSelectedRow(selectedRow.tableData.id)
            }
            actions={[
              {
                icon: tableIcons.Edit,
                tooltip: "Edit Book",
                onClick: (event, rowData) => editBook(rowData),
              },
              (rowData) => ({
                icon: tableIcons.Delete,
                tooltip: "Delete Book",
                onClick: (event, rowData) =>
                  deleteBook(rowData._id, rowData.title),
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

export default Books;
