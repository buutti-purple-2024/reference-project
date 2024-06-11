

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import UserType from "../types/UserType";
import axios from 'axios';


interface UserContextType {
    currentUser: UserType | null;
    setCurrentUser: (user: UserType | null) => void;
    contextUsername: string | undefined;
    setContextUsername: (username: string | undefined) => void;
    contextRole: string | undefined;
    setContextRole: (role: string | undefined) => void;
    userId: string | undefined;
    setUserId: (id: string | undefined) => void;
    loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const usernameFromCookie = document.cookie.split("; ").find((row) => row.startsWith("username="))?.split("=")[1];
    const roleFromCookie = document.cookie.split("; ").find((row) => row.startsWith("role="))?.split("=")[1];
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const [contextUsername, setContextUsername] = useState<string | undefined>(usernameFromCookie);
    const [contextRole, setContextRole] = useState<string | undefined>(roleFromCookie);
    const [userId, setUserId] = useState<string | undefined>(undefined);

    const baseurl = "http://localhost:3001";

    const getCookie = (name: string) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');
        const cookie = cookies.find(cookie => cookie.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    };
    
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = getCookie('accesstoken');
                console.log('Token:', token);
                if (!token) {
                    setLoading(false);
                    return;
                }
                
                const response = await axios.get(`${baseurl}/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCurrentUser(response.data);
                setUserId(response.data.id);
                console.log("setUserId DAAAAATAAA", response.data.id)
            } catch (error) {
                console.error("Error fetching current user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, [userId]);

    return (
        <UserContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                contextUsername,
                setContextUsername,
                contextRole,
                setContextRole,
                userId,
                setUserId,
                loading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
