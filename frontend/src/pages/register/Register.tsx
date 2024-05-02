import "./register.scss";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="register">
            <div className="card">
                <div>
                <h2>Register</h2>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Password again" />
                    <button>Create a new account</button>   
                </form>  
                <hr/>
                <p>Already have an account?</p>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Register