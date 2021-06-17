import React, {useEffect, useState} from 'react'
import {Card} from 'react-bootstrap'

const MessageBoard = () => {
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"))
    const [messages, setMessages] = useState([])
    

    return (
        <Card className="bg-light w-100 mt-3 p-1" style={{height: '85vh'}}>
            <div>
                <Card className="w-50 p-0 m-0 float-right bg-warning" style={{fontSize: '0.75rem', float: 'right'}}>
                    <Card.Body>
                        <Card.Link className="text-dark text-decoration-none" style={{fontSize: '0.9rem', fontWeight:'bold'}}>Joe Schmoe</Card.Link>
                        <Card.Link className="text-muted text-decoration-none">06-14-21 8:30pm</Card.Link>
                        <Card.Text className="p-0 mt-2">
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div>
                <Card className="w-50 p-0 m-0"  style={{fontSize: '0.75rem'}}>
                    <Card.Body>
                        <Card.Link className="text-dark text-decoration-none" style={{fontSize: '0.9rem', fontWeight:'bold'}}>Don Draper</Card.Link>
                        <Card.Link className="text-muted text-decoration-none">06-14-21 8:30pm</Card.Link>
                        <Card.Text className="p-0 mt-2">
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Card>
    )
}

export default MessageBoard;