import React, {useEffect, useState} from 'react'
import {Card, InputGroup, FormControl} from 'react-bootstrap'
import axios from 'axios'
import './MessageBoard.css'

const URL = 'http://localhost:5000/new-message';
const MESSAGE_URL = 'http://localhost:5000/messages'

const options = {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
}

const MessageBoard = ({userId, channelId, setRedirect, removeToken}) => {
    const [messages, setMessages] = useState(null)
    const [messageText, setMessageText] = useState("")

    useEffect(() => {
        getMessages()
    },[channelId])

    const getMessages = () => {
        const data = {
            channel_id: parseInt(channelId)
        }

        axios.post(MESSAGE_URL, data, options)
            .then(response => {
                setMessages(response.data.messages)
            })
            .catch(error => {
                if(error.response.status === 401){
                    removeToken()
                    setRedirect(true)
                    return
                }
            })
    }

    const createMessageCards = () => {
        return messages.map((message, i) => {
            return <div key={i}>
                    <Card className={`w-50 p-0 mt-2 mx-2 card-font 
                            ${message.user.id === parseInt(userId) ? 'bg-warning right' : ''}`}>
                        <Card.Body>
                            <Card.Link className="text-dark text-decoration-none user-font">
                                {`${message.user.firstname} ${message.user.lastname}`}
                            </Card.Link>
                            <Card.Link className="text-muted text-decoration-none">{message.date}</Card.Link>
                            <Card.Text className="p-0 mt-2">
                                {message.text}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
        })
    }

    const handleChange = (event) => setMessageText(event.target.value)

    const handleEnter = (event) => {
        if(event.code !== "Enter") return;

        const data = {
            channel_id: channelId,
            user_id: parseInt(userId),
            text: messageText,
        }
        
        axios.post(URL, data, options)
            .then(response => {
                getMessages()
                setMessageText("")
                event.target.value = ""
            })
    }
    
    return (
        <Card className="bg-light w-100 mt-3 pb-5 overflow-auto" style={{height: '85vh'}}>
            {
                messages ? createMessageCards() : ''
            }
            <InputGroup size="sm" className="w-75 position-fixed bottom-0 px-5 mb-5">
                    <FormControl
                        placeholder="Enter Message..."
                        aria-label="Message Input"
                        aria-describedby="basic-addon1"
                        onChange={handleChange}
                        onKeyUp={handleEnter} />
            </InputGroup>
        </Card>
    )
}

export default MessageBoard;