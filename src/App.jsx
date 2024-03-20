import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { lightGreen } from "@mui/material/colors";

function App() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiCall = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  if (error) return <p>{error.message}</p>;
  if (loading) return <p>{loading}</p>;

  return (
    <>
      {users.map((user) => {
        return (
          <>
            <h3>
              Hello my name is {user.name} {user.surname}
            </h3>

            <button
              style={{ color: lightGreen }}
              onClick={() => setUsers(!users)}
            >
              click
            </button>
            <h3>hello</h3>
          </>
        );
      })}
    </>
  );
}

export default App;
