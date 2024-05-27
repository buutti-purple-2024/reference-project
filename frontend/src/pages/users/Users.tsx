
import "./users.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import UserType from "../../types/UserType";


const Users = () => {
    const baseurl = "http://localhost:3001" 
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get(`${baseurl}/users`); // Assuming your API endpoint for fetching users is /api/users
            /* console.log("Fetched users:", response.data); */
            setUsers(response.data); // Set the users state with the fetched user data
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };

        fetchUsers();
  }, []);

    return (
    <div className="users">
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Username:</strong> {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;