import {Link, Outlet} from "react-router-dom";

function AuthLayout() {
    return (
        <div>
            <h1>Auth Layout</h1>
            <div>
                <Link to="/auth/login">
                    <span>Login</span><br/>
                </Link>
                <Link to="/auth/register">
                    <span>Register</span>
                </Link>
            </div>
            <div><Outlet/></div>
        </div>)
}

export default AuthLayout;