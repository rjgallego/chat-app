import React from 'react';
import {Form, Button, Col, Row, Container, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.JPG';

const Login = () => {
    return (
        <Container>
            <Row className="mt-5" lg={2}>
                <Image src={logo} className="mx-auto"/>
            </Row>
            <Row className="mt-3 mb-4">
                <div>Connect with peers working to transform themselves through fitness</div>
            </Row>
            <Row lg={3}>
                <Col lg={{ offset: 4 }}>
                    <Form>
                        <Form.Row controlId="formHorizontalEmail" className="mt-2">
                            <Col>
                                <Form.Control type="email" placeholder="Email" />
                            </Col>
                        </Form.Row>
                        <Form.Group as={Row} controlId="formHorizontalPassword" className="mt-4">
                            <Col>
                                <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                        <Form.Row>
                                <Button variant="danger" type="submit" className="mx-4 mt-3 w-25">Login</Button>
                                <Button variant="danger" type="submit" className="mx-4 mt-3 w-25">Sign Up</Button>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}
export default Login;