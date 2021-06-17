import React, {useEffect, useState} from 'react'
import {Card, InputGroup, FormControl} from 'react-bootstrap'
import axios from 'axios'

const URL = 'http://localhost:5000/new-message';

const MessageBoard = ({userId, channelId}) => {
    const [messages, setMessages] = useState([])
    const [messageText, setMessageText] = useState("")

    const handleChange = (event) => setMessageText(event.target.value)

    const handleEnter = (event) => {
        if(event.code !== "Enter") return;

        const data = {
            channel_id: channelId,
            user_id: parseInt(userId),
            text: messageText,
        }
        
        axios.post(URL, data).then(response => console.log(response.data))
        setMessageText("")
        event.target.value = ""
    }

//     <div>
//     <Card className="w-50 p-0 m-0 float-right bg-warning" style={{fontSize: '0.75rem', float: 'right'}}>
//         <Card.Body>
//             <Card.Link className="text-dark text-decoration-none" style={{fontSize: '0.9rem', fontWeight:'bold'}}>Joe Schmoe</Card.Link>
//             <Card.Link className="text-muted text-decoration-none">06-14-21 8:30pm</Card.Link>
//             <Card.Text className="p-0 mt-2">
//                             Some quick example text to build on the card title and make up the bulk of
//                             the card's content.
//             </Card.Text>
//         </Card.Body>
//     </Card>
// </div>
{/* <div>
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
</div> */}
    

    return (
        <Card className="bg-light w-100 mt-3 p-1 d-flex align-items-end flex-row" style={{height: '85vh'}}>
            <InputGroup size="sm" className="mt-2 w-75 mx-auto">
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