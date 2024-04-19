import "./register.scss";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="register">
            <h2>Sign up</h2>
                <form>
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Password" />
                    <input type="text" placeholder="Password again" />
                </form>
                <button>Create a new account</button>     
            <hr/>
            <p>Already have an account?</p>
            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
    )
}

export default Register