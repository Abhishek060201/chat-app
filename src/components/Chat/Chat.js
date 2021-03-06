import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Chat.css';

const Chat = ({ socket, username, room }) => {

  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (alertMessage !== '') {
      const chatBox = document.querySelector('.scroll-to-bottom > div')
      const messageBox = document.createElement('div')
      const messageText = document.createTextNode(alertMessage)
      messageBox.classList.add('alert-message')
      messageBox.appendChild(messageText)
      chatBox.appendChild(messageBox)
    }
  }, [alertMessage])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList(list => [...list, data]);
    })

    socket.on('receive_old_messages', (oldMessages) => {
      setMessageList(oldMessages);
    })

    socket.on('alert_message', async (message) => {
      setAlertMessage(message)
    })
  }, [socket])

  const sendMessage = async () => {
    var hrs = new Date(Date.now()).getHours();
    var mins = new Date(Date.now()).getMinutes();
    if (hrs < 10) {
      hrs = '0' + hrs.toString();
    }
    if (mins < 10) {
      mins = '0' + mins.toString();
    }
    if (currentMessage !== '') {
      const messsageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: hrs + ':' + mins,
      };
      await socket.emit('send_message', messsageData);
      setMessageList(list => [...list, messsageData]);

      //empty the chat-box input
      setCurrentMessage('');
    }
  }

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <h2>Live Chat (Room ID: {room})</h2>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='scroll-to-bottom' >
          {messageList.map((messageContent) => {
            return (
              <div
                className='message'
                id={username === messageContent.author ? 'you' : 'other'}
              >
                <div className='message-content'>
                  <p>{messageContent.message}</p>
                </div>
                <div className='message-meta'>
                  <p>{messageContent.time}&nbsp;</p>
                  <p id='author'>{messageContent.author}</p>
                </div>
              </div>
            )
          })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input
          type='text'
          value={currentMessage}
          placeholder='Hey...'
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendMessage()
            }
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat;