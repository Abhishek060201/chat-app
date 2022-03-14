import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JoinChat from '../JoinChat/JoinChat';
import './Login.css';

const Login = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginWithCreds = async (e) => {
    e.preventDefault()
    if (username !== '' && password !== '') {
      const res = await axios.post('http://localhost:3001/login', {
        username,
        password
      })
      const accessToken = res.data.accessToken;
      console.log('aCT:', accessToken)
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
        </form>
      ) : (
        <JoinChat />
      )}
    </div>
  );
}

export default Login;