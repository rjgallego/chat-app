import React, {useState} from 'react';
import {Form, Button, Col, Row, Container, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.JPG';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = (event) => {
        event.preventDefault()
        const user = {
            email: email,
            password: password
        }
        console.log(user)
        axios.post('http://localhost:5000/login', user)
            .then(response => console.log(response.data))
    }

    return (
        <div id="main" className="d-flex align-items-center">
            <Container className="bg-light w-75 pb-5 mt-5 rounded">
                <Row lg={2}>
                    <Image src={logo} className="mx-auto"/>
                </Row>
                <Row className="mt-3 mb-4">
                    <div className="text-center">Connect with peers working to transform themselves through fitness</div>
                </Row>
                <Row lg={3}>
                    <Col lg={{ offset: 4 }}>
                        <Form>
                            <Form.Row className="mt-2">
                                <Col>
                                    <Form.Control type="email" placeholder="Email" onChange={handleEmail}/>
                                </Col>
                            </Form.Row>
                            <Form.Group as={Row} className="mt-4">
                                <Col>
                                    <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
                                </Col>
                            </Form.Group>
                            <Form.Row>
                                    <Button variant="danger" type="submit" className="mx-3 mt-3 px-4" onClick={handleLogin}>Login</Button>
                                    <Button href="/sign-up" variant="danger" type="submit" className="mx-3 mt-3 px-4">Sign Up</Button>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Login;