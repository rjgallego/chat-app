import React, {useState, useEffect} from 'react'
import {Card, Button, InputGroup, FormControl} from 'react-bootstrap'
import axios from 'axios';

const URL = 'http://localhost:5000/channels';

const ChannelCard = () => {
    const [channels, setChannels] = useState([])
    const [selectedChannel, setSelectedChannel] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        getChannels()
    },[])

    const getChannels = () => {
        axios.get(URL)
            .then(result => {
                setChannels(result.data.channels)
                setSelectedChannel(result.data.channels[0])
            })
    }

    const createButtons = () => {
        return channels.map((channel, i) => {
            return <Button key={i}
                    id={channel}
                    variant="outline-light" 
                    className="w-75"
                    onClick={handleClick}
                    active={selectedChannel === channel}># {channel}</Button>
        })
    }

    const handleAddChannel = () => setIsEditing(true)
    const handleClick = (event) => setSelectedChannel(event.target.id)
    const handleEnter = (event) => {
        if(event.code !== "Enter") return;

        setIsEditing(false)

        const data = {
            channel: event.target.value
        }
        
        axios.post(URL, data)
            .then(result => {
                if(result.data.error){
                    setIsError(true)
                    return
                }
                setIsError(false)
                getChannels()
            })
    }

    return (
        <Card lg={1} className="bg-danger text-center text-light border mt-3" style={{height: '85vh'}}>
            <Card.Body>
                {
                    isError ? <Card.Text style={{fontSize: '0.75em'}} >Channel already exists</Card.Text>
                            : ''
                }
                
                {channels.length === 0 ? '' : createButtons()}
                {
                    isEditing ? 
                        <InputGroup size="sm" className="mt-2 w-75 mx-auto">
                            <FormControl
                            placeholder="Channel Name"
                            aria-label="Channel Name"
                            aria-describedby="basic-addon1"
                            onKeyUp={handleEnter} />
                        </InputGroup>
                    :   <Button variant="link" 
                                className="text-light text-decoration-none"
                                onClick={handleAddChannel}>+ Add Channel</Button>
                }
            </Card.Body>
        </Card>
    )
}
export default ChannelCard