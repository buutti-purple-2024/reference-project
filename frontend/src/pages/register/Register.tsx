import "./register.scss"

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
            <p>Already have an account? Log in!</p>
        </div>
    )
}

export default Register