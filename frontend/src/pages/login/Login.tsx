import "./login.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { useAuthContext } from "../../contexts/AuthContext";
import UserType from "../../types/UserType"; // Assuming UserType is imported from the correct location

const Login = () => {
    const { login } = useAuthContext();
    const { setCurrentUser, setUserId, setContextUsername, userId } = useUserContext(); // Add userId here
    const baseurl = "http://localhost:3001";
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<boolean>(false); 
    const [errorMessage, setErrorMessage] = useState<string>(""); 

    const handleErrorTimer = (msg: string) => {
        setLoginError(true);
        setErrorMessage(msg);
        setTimeout(() => {
            setLoginError(false);
            setErrorMessage("");
        }, 3000);
    }; 

    const fetchCurrentUser = async (userId: number) => {
        try {
            const response = await axios.get<UserType>(`${baseurl}/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching current user:", error);
            throw error;
        }
    };

    const handleLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !password) {
            handleErrorTimer("Username and password are required.");
            return;
        }
        try {
            const userIdStr = await login({ username, password });
            const userId = parseInt(userIdStr); // Convert string to number
            const userData = await fetchCurrentUser(userId);
            setContextUsername(username);
            setCurrentUser(userData);
            setUserId(userIdStr);
            navigate('/');
        } catch (error) {
            console.error(error);
            handleErrorTimer('An error occurred during login.');
        }
    };

    useEffect(() => {
        // Don't forget to pass the `userId` from the dependency array
        if (username && userId) { // Check if userId is truthy
            fetchCurrentUser(Number(userId))
                .then((userData) => setCurrentUser(userData))
                .catch((error) => console.error("Error setting current user:", error));
        }
    }, [userId, setCurrentUser, username]);

    console.log("LOGGED IN USER:", username, userId)
    return (
        <div className="login">
            <div className="login-card">
                <div>
                    <h1>Welcome to Purple!</h1>
                    {loginError &&      
                        <div className="div-error">
                            <h5>{errorMessage}</h5>
                        </div>
                    }
                    <h2>Log in</h2>
                    <form onSubmit={handleLoginUser}>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        <button>Log in</button>
                    </form>
                    <hr/>
                    <p>Don't have an account?</p>
                    <Link to="/register">
                        <button>Create a new account</button> 
                    </Link> 
                </div>
            </div>   
        </div>
    );
}

export default Login;
