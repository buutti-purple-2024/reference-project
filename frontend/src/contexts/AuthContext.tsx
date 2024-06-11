import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
//import UserType from '../types/UserType';

interface AuthContextType {
    auth: { token: string | null; userId: number | null };
    login: (credentials: { username: string; password: string }) => Promise<string>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const baseurl = "http://localhost:3001"


export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<{ token: string | null; userId: number | null }>({ token: null, userId: null });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth((prev) => ({ ...prev, token }));
            // Optionally, fetch user data if token exists
        }
    }, []);

    const login = async (credentials: { username: string; password: string }): Promise<string> => {
        try {
            const { username, password } = credentials;
            const response = await axios.post(`${baseurl}/auth/login`, { username, password });
            console.log("Response data HERE:", response.data); // Log the entire response data/
            const passedtoken = response.data.accessToken;
            const tokenParts = passedtoken.split('.');
            const encodedPayload = tokenParts[1];
            const decodedPayload = atob(encodedPayload);
            const payloadObject = JSON.parse(decodedPayload);
            const userId = payloadObject.id;
            
            //console.log("PASSED accessToken:", passedtoken)
            //console.log("EXTRACTED User ID:", userId);

            /* if (!user) { 
                throw new Error('User data not found in response');
            } */
    
            localStorage.setItem('token', passedtoken);
            setAuth({ token: passedtoken,  userId: userId });
            //console.log("SET AUTH:", passedtoken, userId)
            //console.log("TOKEN HERE:", passedtoken)
            //console.log("userId HERE:", userId)
            return userId;
        } catch (error) {
            console.error('Login failed', error);
            throw new Error('Login failed');
        }
    };
    

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null, userId: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
