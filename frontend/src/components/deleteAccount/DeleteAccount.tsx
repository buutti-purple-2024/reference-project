import { useState } from "react";
import "./deleteAccount.scss";
import { Link, useNavigate } from "react-router-dom";

import * as React from "react";

const DeleteAccount = () => {

    const navigate = useNavigate()
    const baseurl = "http://localhost:3001"
    const [registrationError, setRegistrationError] = useState<boolean>(false); 
    const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false); 
    const [errorMessage, setErrorMessage] = useState<string>(""); 
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

    const handleErrorTimer = (msg: string) => {
        setRegistrationError(true);
        setErrorMessage(msg)
        setTimeout(() => {
            setRegistrationError(false);
            setErrorMessage("")
        }, 3000)
    } 

    const handleSuccessTimer = () => {
        setRegistrationSuccess(true);
        setTimeout(() => {
            setRegistrationSuccess(false);
        }, 3000)
    } 

    const handleRegisterUser = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("delete account")
        try {
            const response = await fetch(`${baseurl}/users/remove`, {
                method: "DELETE",
                credentials: "include"
            })
            const data = await response.json();
            console.log(data);
            //handleSuccessTimer()
            console.log("done")
            navigate("/")
        } catch (error) {
            console.log(error);
            handleErrorTimer("An error happened.")
        }
    }


    return (
        <div className="register">
            <div className="card">
                <div style={{width: "50%"}}>
                    {registrationSuccess &&
                    <div className="div-success">
                        Account removed
                    </div>
                    }
                    {registrationError &&      
                    <div className="div-error">
                        <h5>{errorMessage}</h5>
                    </div>
                    }
                { confirmDelete ? <h3>Are you sure you want to delete your account? Please type your username to confirm.</h3> : <h2>Delete account</h2> }
                <form onSubmit={(e) => handleRegisterUser(e)}>
                    {confirmDelete == true && <input  type="" placeholder="Username" />}
                    {confirmDelete == false && <button onClick={() => setConfirmDelete(true)} >Delete account</button>}
                    {confirmDelete == true && <button type="submit">Yes, I want to delete my account</button>}   
                    {confirmDelete == true && <button onClick={() => setConfirmDelete(false)} type="submit">Return</button>}   

                </form>  
             

                </div>
            </div>
        </div>
    )
}

export default DeleteAccount