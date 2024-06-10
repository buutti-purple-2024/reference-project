/*import fakeUsers from "../tempData/fakeUsers";
import{ createContext} from "react";


const UsersContext = createContext<UserType[]>(fakeUsers);

export default UsersContext;
*/

import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import UserType from "../types/UserType";

interface UsersContextType {
  comments: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/`);
        console.log("Fetched Users:", response.data); 
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;