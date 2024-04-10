
import "./login.scss"

const Login = () => {
    return (
        <div className="login">
            <h2>Welcome to Purple, 
                the ad free social media app!</h2>
            <div className="card">
                    <h2>Log in</h2>
                    <form>
                        <input type="text" placeholder="Email" />
                        <input type="text" placeholder="Password" />
                        <button>Log in</button>
                    </form>
                    <button>Create new account</button>
             </div> 
        </div>
    )
}

export default Login