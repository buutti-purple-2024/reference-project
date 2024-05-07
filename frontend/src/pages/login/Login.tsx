
import "./login.scss";
import { Link } from "react-router-dom";

import { useState } from "react";
import { json } from "stream/consumers";
import * as React from "react";

const Login = () => {

    const baseurl = "http://localhost:3001"
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
        console.log(username, password)
        try {
            const response = await fetch(`${baseurl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"},
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            })
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
            handleErrorTimer("An error happened.")
        }
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