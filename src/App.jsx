import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState();

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

  const postUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = await axios.post("http://localhost:3000/users", {
        name: name,
        surname: surname,
        age: age,
      });
      console.log(newUser);
    } catch (err) {
      setError(err);
    } finally {
      apiCall();
      setName("");
      setSurname("");
      setAge("");
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  console.log(name, surname, age);

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
          </>
        );
      })}
      <form onSubmit={postUser}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="number"
          placeholder="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <br />
        <button type="submit">Add User</button>
      </form>
    </>
  );
}

export default App;
