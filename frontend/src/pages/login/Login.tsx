
import "./login.scss";
import { Link } from "react-router-dom";

import { useState } from "react";
import { json } from "stream/consumers";
import * as React from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {

    const baseurl = "http://localhost:3001"
    const navigate = useNavigate()
    const [username, setUsername] = useState<null | string>(null)
    const [password, setPassword] = useState<null | string>(null)
    const [loginError, setLoginError] = useState<boolean>(false); 
    const [errorMessage, setErrorMessage] = useState<string>(""); 


    const handleErrorTimer = (msg: string) => {
        setLoginError(true);
        setErrorMessage(msg)
        setTimeout(() => {
            setLoginError(false);
            setErrorMessage("")
        }, 3000)
    } 


    
    const handleLoginUser = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`${baseurl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            })
            const data = await response.json();
            console.log(data);
            navigate("/")
        } catch (error) {
            console.log(error);
            handleErrorTimer("An error happened.")
        }
    }

    const cookiefunc = () => {
        /*let date = new Date(Date.now())
        date.setDate(date.getDate() + 7)
        date.toUTCString();
        console.log(new Date(2029, 0, 1).toUTCString())
        document.cookie = "token=123abc; expires=" + date;
        
        //document.cookie = "expires="+date;
        //document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";

        console.log(date)
        console.log(document.cookie)
        */
    }


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
                    <form onSubmit={(e) => handleLoginUser(e)}>
                        <input onChange={(e) => {setUsername(e.target.value)}} type="text" placeholder="Email" />
                        <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" />
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
    )
}

export default Login;