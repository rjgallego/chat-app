import React, {useEffect, useState} from 'react'
import ChannelCard from './ChannelCard'
import MessageBoard from './MessageBoard'
import {Container, Row, Col, Nav} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

const Home = () => {
    const [selectedChannel, setSelectedChannel] = useState("")
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"))
    const [redirect, setRedirect] = useState(false)
    const [token, setToken] = useState(sessionStorage.getItem('token'))

    useEffect(() => {
        if(!token){
            setRedirect(true)
        }
    },[])

    const removeToken = () => sessionStorage.removeItem('token')

    return (
        redirect ? <Redirect to="/login" />
        : <Container lg={2} fluid>
            <Row>
                <Nav className="bg-danger border border-light">
                    <Nav.Item>
                        <Nav.Link href="/login" className="text-light" onClick={removeToken}>Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>
            <Row>
                <Col>
                    <ChannelCard selected={selectedChannel} 
                                 setSelected={setSelectedChannel} 
                                 removeToken={removeToken}
                                 setRedirect={setRedirect} 
                                 token={token}/>
                </Col>
                <Col lg={10}>
                    <MessageBoard userId={userId} 
                                  channelId={selectedChannel} 
                                  setRedirect={setRedirect}
                                  removeToken={removeToken} />
                </Col>
            </Row>
        </Container>
    )
}

export default Home