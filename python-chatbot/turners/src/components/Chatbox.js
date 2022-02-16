import React, {useEffect, useState, useRef} from 'react'
import '../css/chatbox.css'
export default function Chatbox() {

    const [userMessage, setUserMessage] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [messageList, setMessageList] = useState([])

    const handleChange = (e) => {
        setUserMessage(e.target.value)
    }

    const handleClick = () => {
        setOpenModal(openModal => !openModal)
    }
    let chatMessages = document.getElementById('messages-list')
    const sendMessage = async(e) => {
        setMessageList(messageList => [...messageList, <li className='user-message box arrow-right'>{userMessage}</li>])
        e.preventDefault()
        await fetch('http://localhost:8080/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({message: userMessage})
        })
        .then(res => res.json())
        //messages are added to the DOM
        .then(data => {
            setMessageList(messageList => [...messageList, <li className='bot-message box arrow-left'>{data}</li>])
            setUserMessage('')
        })
    }


    useEffect(() => {
        if (openModal) {
      chatMessages.scrollTop = chatMessages.scrollHeight
    }}, [messageList]);


  return (
    <>
        {!openModal &&<button id="chat-modal" onClick={handleClick}>Ask for help</button>}
        <div id="chat-container">
            {openModal && <>
            <button id="chat-minimize" onClick={handleClick}><p>TurnersBot</p> <p>_</p></button>
            <div id="chat-box" >           
                <ul id='messages-list' reversed>
                {messageList.map(message => (
                    message
                ))}
                </ul>
                <form id="message-form" method="POST" action='/' encType="application/json">
                    <input id="message-input" 
                        type="text" 
                        name="message" 
                        placeholder="Type a message..." 
                        autoComplete="off"
                        value={userMessage}
                        onChange={handleChange} /> 
                    <input id='send-message' type="submit" value="Send" onClick={sendMessage} />
                </form>
        </div>
        </>}

        </div>
    </>
  )
}



