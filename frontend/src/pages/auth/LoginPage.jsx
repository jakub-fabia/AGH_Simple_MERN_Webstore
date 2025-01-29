import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../redux/authSlice/index.js";
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const initialState = {
    email: "",
    password: "",
};

function AuthLogin() {
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData)).then((data) => {
            if (data?.payload?.success) {
                navigate("/");
            } else {
                setError(data?.payload?.message || 'Invalid credentials');
            }
        });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col md={6} className="mx-auto">
                    <div className="shadow p-4 rounded bg-light">
                        <h2 className="text-center mb-4">Login</h2>
                        {error && <Alert variant="dark">{error}</Alert>}
                        <Form>
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label column={true}>Username</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter username"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
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
                            <div className="d-grid">
                                <Button variant="dark" type="submit" onClick={handleSubmit}>
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AuthLogin;