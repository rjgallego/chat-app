import React, {useState} from 'react'
import {Form, Button, Col, Row, Container, Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './Logo.JPG'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [reroute, setReroute] = useState(false)

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
        axios.post('/api/login', user)
            .then(response => {
                if(response.data.error){
                    setErrorMessage(response.data.error)
                    return
                }
                sessionStorage.setItem("token", response.data.token)
                setReroute(true)
            })
    }

    if(sessionStorage.getItem("token") || reroute){
        return <Redirect to="/" />
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
                {
                    errorMessage ?   <Row className="mt-3 mb-4">
                                        <div className="text-center text-danger">{errorMessage}</div>
                                    </Row>
                                :   ''
                }
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