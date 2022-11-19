import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Settings } from "constants/Settings";
import { useRouter } from "next/router";

function Landing({ userid }) {
  const [mytests, setMyTests] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log(userid);
    try {
      axios
        .get(`${Settings.API_DATA_URL}mytests-by-owner`, {
          params: {
            id: userid,
          },
        })
        .then((response) => {
          setMyTests(response.data);
        })
        .catch((err) => {
          console.log("Nice Error: ", err);
        });
    } catch (err) {
      console.log("Error Connecting...");
    }
  }, []);

  const viewAnswers = (row) => {
    router.push(`/test/view-answers/${row._id}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold py-2">Dashboard</h2>
    </div>
  );
}

export default Landing;
