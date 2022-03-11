import React, { useState } from 'react';
import Chat from '../Chat/Chat';
import io from 'socket.io-client';
import './Login.css';

const socket = io.connect('http://localhost:3001');

const Login = () => {

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  }

  return (
    <div className="login">
      {!showChat ? (
        <div className='join-chat-container'>
          <h3>Join a chat</h3>
          <input
            type='text'
            placeholder='John...'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
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

export default Login