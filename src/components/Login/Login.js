import React, { useState } from 'react';
import axios from 'axios';
import JoinChat from '../JoinChat/JoinChat';
import './Login.css';

const Login = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginWithCreds = async (e) => {
    e.preventDefault()
    if (username !== '' && password !== '') {
      await axios.post('https://abhishek-chat-app-backend.herokuapp.com/login', {
        username,
        password
      }).then(res => {
        if (res.status === 200) {
          setLoggedin(true)
          setAccessToken(res.data.accessToken)
        }
      }).catch(err => {
        setErrorMessage(err.response.data)
      })
    }
  }

  return (
    <div className='login'>
      {!loggedin ? (
        <form>
          <h2>Login</h2>

          <label>Username</label>
          <input
            type='text'
            name='username'
            value={username}
            placeholder='John'
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type='submit' onClick={loginWithCreds} />
          <h4 className='error-message'>{errorMessage}</h4>
        </form>
      ) : (
        <JoinChat accessToken={accessToken} username={username} />
      )}
    </div>
  );
}

export default Login;