import React, { useState } from 'react';
import {Form, Button, Col, Row, Container} from 'react-bootstrap';
import axios from 'axios';

const SignUp = () => {
    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const handleFirstName = (event) => setFirstName(event.target.value)
    const handleLastName = (event) => setLastName(event.target.value)
    const handleEmail = (event) => setEmail(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)
    const handleConfPassword = (event) => setConfPassword(event.target.value)

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confPassword: confPassword
        }

        axios.post('http://localhost:5000/sign-up', data)
            .then(result => console.log(result.data))
        setValidated(true);
    }


    return (
        <div id="main" className="d-flex align-items-center">
            <Container className="bg-light w-75 pb-5 mt-5 rounded">
                <Row className="mt-5">
                    <h1 className="text-center">Create a New Account</h1>
                </Row>
                <Row lg={2}>
                    <Col lg={{ offset: 3 }} className="text-left">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mt-5">
                                <Form.Label column lg={4} className="d-flex justify-content-left">First Name:</Form.Label>
                                <Col>
                                    <Form.Control required type="text" onChange={handleFirstName}/>
                                    <Form.Control.Feedback type="invalid">
                                        First Name is required.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mt-2">
                                <Form.Label column lg={4} className="d-flex justify-content-left">Last Name:</Form.Label>
                                <Col>
                                    <Form.Control required type="text" onChange={handleLastName}/>
                                    <Form.Control.Feedback type="invalid">
                                        Last Name is required.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mt-2">
                                <Form.Label column lg={4} className="d-flex justify-content-left">Email:</Form.Label>
                                <Col>
                                    <Form.Control required type="email" onChange={handleEmail}/>
                                    <Form.Control.Feedback type="invalid">
                                        Email is required.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mt-2">
                                <Form.Label column lg={4} className="d-flex justify-content-left">Password:</Form.Label>
                                <Col>
                                    <Form.Control required type="password" onChange={handlePassword}/>
                                    <Form.Control.Feedback type="invalid">
                                        Password is required.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mt-2">
                                <Form.Label column lg={4} className="d-flex justify-content-left">Confirm Password:</Form.Label>
                                <Col>
                                    <Form.Control required type="password" onChange={handleConfPassword}/>
                                    <Form.Control.Feedback type="invalid">
                                        Password confirmation is required.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col className='d-flex justify-content-center'>
                                    <Button variant="danger" type="submit" className="mt-5 w-50">Sign Up</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SignUp;