import React, { useEffect, useState } from 'react';
import Chat from '../Chat/Chat';
import io from 'socket.io-client';
import './JoinChat.css';

var socket;

const JoinChat = (props) => {
  const [username, setUsername] = useState(props.username);
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    socket = io.connect('http://localhost:3001', {
      query: {
        token: props.accessToken
      }
    });
  }, [props.accessToken])

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', { room, username });
      setShowChat(true);
    }
  }

  return (
    <div className="join-chat">
      {!showChat ? (
        <div className='join-chat-container'>
          <h3>Join a chat</h3>
          <h4>{username}</h4>
          <input
            type='text'
            placeholder='Room ID'
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      ) : (
        <Chat
          socket={socket}
          username={username}
          room={room}
        />
      )}
    </div>
  )
}

export default JoinChat