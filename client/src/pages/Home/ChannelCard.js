import React, {useEffect, useState} from 'react'
import {Card, Button, InputGroup, FormControl} from 'react-bootstrap'
import axios from 'axios'

const URL = '/channels';

const ChannelCard = ({selected, setSelected, redirectToLogin, token}) => {
    const [channels, setChannels] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [isError, setIsError] = useState(false)

    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        getChannels()
    }, [token])

    const getChannels = () => {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get(URL, options)
            .then(response => {
                const channels = response.data.channels
                setChannels(channels)
                setSelected(channels[0].id)
            })
            .catch(error => {
                if(error.response.status === 401){
                    redirectToLogin()
                    return
                }
            })
    }

    const handleAddChannel = () => setIsEditing(true)

    const handleClick = (event) => setSelected(event.target.id)

    const handleEnter = (event) => {
        if(event.code !== "Enter") return;
        setIsEditing(false)

        const data = {
            channel: event.target.value
        }
        
        axios.post(URL, data, options)
            .then(result => {
                if(result.data.error){
                    setIsError(true)
                    return
                }
                setIsError(false)
                getChannels()
            })
    }

    const createButtons = () => {
        return channels.map((channel, i) => {
            return <Button key={i}
                    id={channel.id}
                    variant="outline-light" 
                    className={`w-75 ${selected === channel.id ? 'active' : ''}`}
                    onClick={handleClick}># {channel.name}</Button>
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