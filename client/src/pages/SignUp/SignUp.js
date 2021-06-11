import React from 'react';
import {Form, Button, Col, Row, Container} from 'react-bootstrap';

const SignUp = () => {
    return (
        <div id="main" className="d-flex align-items-center">
            <Container className="bg-light w-75 pb-5 mt-5 rounded">
                <Row className="mt-5">
                    <h1 className="text-center">Create a New Account</h1>
                </Row>
                <Row lg={2}>
                    <Col lg={{ offset: 3 }} className="text-left">
                        <Form>
                            <Form.Group as={Row} className="mt-5">
                                <Form.Label column lg={4} className="d-flex justify-content-left">First Name:</Form.Label>
                                <Col>
                                    <Form.Control type="email"/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mt-2">
                                <Form.Label column lg={4} className="d-flex justify-content-left">Last Name:</Form.Label>
                                <Col>
                                    <Form.Control type="email"/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mt-2">
                                <Form.Label column lg={4} className="d-flex justify-content-left">Email:</Form.Label>
                                <Col>
                                    <Form.Control type="email"/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mt-2">
                                <Form.Label column lg={4} className="d-flex justify-content-left">Password:</Form.Label>
                                <Col>
                                    <Form.Control type="password"/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mt-2">
                                <Form.Label column lg={4} className="d-flex justify-content-left">Confirm Password:</Form.Label>
                                <Col>
                                    <Form.Control type="password"/>
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