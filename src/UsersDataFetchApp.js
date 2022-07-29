import React, { useState } from "react";
//import "./App.css";
import "./UsersData.css";
import { CircularProgress, Box } from "@mui/material";

function UsersDataFetchApp() {
  const users = [];
  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    const response = await fetch("https://reqres.in/api/users?page=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    res.data.map((item) => users.push(item));
    setuserData(users);
  }
  const handleUsersData = () => {
    setLoading(true);
    setTimeout(() => {
      loadData();
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="App">
      <div className="header-section">
        <h2>Amazon</h2>
        <button type="button" id="btn" onClick={handleUsersData}>
          Get Users
        </button>
      </div>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {userData.map((user) => (
        <div className="user-data" key={user.id}>
          <div className="user-image">
            <img src={user.avatar} alt="user-pic"></img>
          </div>
          <div className="user-details">
            <p>
              <b>User-Id:</b> {user.id}
            </p>
            <p>
              <b>Username:</b> {`${user.first_name} ${user.last_name}`}
            </p>
            <p>
              <b>User-Email:</b> {user.email}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersDataFetchApp;
