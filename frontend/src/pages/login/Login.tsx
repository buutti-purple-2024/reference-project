
import "./login.scss";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login">
           
            <h1>Welcome to Purple, the ad free social media app!</h1>
                <h2>Log in</h2>
                    <form>
                        <input type="text" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Log in</button>
                    </form>
                <hr/>
                <p>Don't have an account?</p>
                <Link to="/register">
                <button>Create a new account</button> 
                </Link> 
               
        </div>
    )
}

export default Login;