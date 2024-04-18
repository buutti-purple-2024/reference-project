
import "./login.scss"

const Login = () => {
    return (
        <div className="login">
            <h1>Welcome to Purple, the ad free social media app!</h1>
                <h2>Log in</h2>
                    <form>
                        <input type="text" placeholder="Email" />
                        <input type="text" placeholder="Password" />
                        <button>Log in</button>
                    </form>
                <hr/>
            <button>Create new account</button>     
        </div>
    )
}

export default Login;