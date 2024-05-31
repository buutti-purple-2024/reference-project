
import "./users.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import UserType from "../../types/UserType";
import { Link } from "react-router-dom";
//import ProfileComponent from "../../components/profile/ProfileComponent";

interface UsersProps {
  onUserSelect: (user: UserType) => void;
  /* user: UserType | null; */
}

const Users: React.FC<UsersProps> = ({onUserSelect/* , user */}) => {
    const baseurl = "http://localhost:3001" 
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get(`${baseurl}/users`); 
            console.log("Fetched users:", response.data);
            setUsers(response.data); 
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
            <li key={user.id} 
                className="chat-user" 
                onClick={() => onUserSelect(user)}
                >
                <Link to={`/profile/${user.id}`} className="user-link">
                    <div className="user-info">
                        <img 
                          src={user.profileImage} 
                          alt={user.username} 
                          width={40} 
                          height={40} 
                          />
                        <span>{user.username}</span>
                    </div>
                </Link>
            </li>
          ))}
      </ul>
      {/* <ProfileComponent user={user}/> */}
    </div>
  );
};

export default Users;