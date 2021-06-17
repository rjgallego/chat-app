import React, {useState, useEffect} from 'react'
import ChannelCard from './ChannelCard'
import MessageBoard from './MessageBoard'
import {Container, Row, Col, Nav} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

const Home = () => {
    const [selectedChannel, setSelectedChannel] = useState("")

    const handleClick = () => sessionStorage.removeItem('token')

    if(!sessionStorage.getItem("token")){
        return <Redirect to="/login" />
    }

    return (
        <Container lg={2} fluid>
            <Row>
                <Nav className="bg-danger border border-light">
                    <Nav.Item>
                        <Nav.Link href="/login" className="text-light" onClick={handleClick}>Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>
            <Row>
                <Col>
                    <ChannelCard selected={selectedChannel} setSelected={setSelectedChannel} />
                </Col>
                <Col lg={10}>
                    <MessageBoard />
                </Col>
            </Row>
        </Container>
    )
}

export default Home