import React from 'react'
import {Container, Row, Col, Nav, Card, Button} from 'react-bootstrap'

const Home = () => {
    return (
        <Container lg={2} fluid>
            <Row>
                <Nav className="bg-danger border border-light">
                    <Nav.Item>
                        <Nav.Link href="/login" className="text-light">Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>
            <Row>
                <Col>
                    <Card lg={1} className="bg-danger text-center text-light border mt-3" style={{height: '85vh'}}>
                        <Card.Body>
                            <Button variant="outline-light" className="w-75"># Boxing</Button>
                            <Button variant="outline-light" className="w-75"># Cardio</Button>
                            <Button variant="outline-light" className="w-75"># Hiking</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={10}>
                    <Card className="bg-light w-100 mt-3 p-1" style={{height: '85vh'}}>
                        <div>
                            <Card className="w-50 p-0 m-0 float-right bg-warning" style={{'font-size': '0.75rem'}}>
                                <Card.Body>
                                    <Card.Link className="text-dark text-decoration-none" style={{'font-size': '0.9rem', 'font-weight':'bold'}}>Joe Schmoe</Card.Link>
                                    <Card.Link className="text-muted text-decoration-none">06-14-21 8:30pm</Card.Link>
                                    <Card.Text className="p-0 mt-2">
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <Card className="w-50 p-0 m-0 float-right"  style={{'font-size': '0.75rem'}}>
                            <Card.Body>
                                <Card.Link className="text-dark text-decoration-none" style={{'font-size': '0.9rem', 'font-weight':'bold'}}>Don Draper</Card.Link>
                                <Card.Link className="text-muted text-decoration-none">06-14-21 8:30pm</Card.Link>
                                <Card.Text className="p-0 mt-2">
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Home