import { useState } from 'react';
import {useDispatch} from "react-redux";
import {registerUser} from "../../redux/authSlice/index.js";
import {useNavigate} from "react-router-dom";
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState = {
    username: "",
    email: "",
    password: "",
};

function RegisterPage() {
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
        <Container className= "d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col md={5} className="mx-auto">
                    <div className="shadow p-4 rounded bg-light">
                        <h2 className="text-center mb-4">Register</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="fromUsername">
                                <Form.Label column={true}>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label column={true}>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label column={true}>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <div className="d-grid">
                                <Button variant="dark" onClick={handleSubmit}>
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage;
