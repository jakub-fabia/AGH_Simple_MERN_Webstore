import { useState } from 'react';
import {useDispatch} from "react-redux";
import {registerUser} from "../../redux/authSlice/index.js";
import {useNavigate} from "react-router-dom";

const initialState = {
    username: "",
    email: "",
    password: "",
};

function RegisterPage() {
    console.log("register")
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(registerUser(formData)).then((data) => {
            alert(data?.payload?.message)
            if (data?.payload?.success) {
                navigate("/auth/login");
            }
        });
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;