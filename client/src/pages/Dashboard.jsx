import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/user/getme")
      .then(res => setUser(res.data))
      .catch(() => alert("Not authenticated"));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.avatar} width="80" />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
