import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [updateError, setUpdateError] = useState(false);
  const [response, setResponse] = useState('');

  useEffect(() => {
    if(updateError) {
      document.querySelector('.response').style.color = 'red'
    } else {
      document.querySelector('.response').style.color = 'green'
    }
  }, [updateError])

  const signupWithCreds = async (e) => {
    e.preventDefault()
    if (username !== '' && email !== '' && password !== '') {
      const res = await axios.post('http://localhost:3001/signup', {
        username,
        email,
        password
      })
      if (res.status === 208) {
        setUpdateError(true)
        await setResponse(res.data)
        return
      }
      setUpdateError(false)
      await setResponse(res.data)
      setUsername('')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className='signup'>
      <form>
        <h2>Sign-Up</h2>

        <label>Username</label>
        <input
          type='text'
          name='username'
          value={username}
          placeholder='John'
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email</label>
        <input
          type='email'
          name='email'
          value={email}
          placeholder='abc@xyz.com'
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          placeholder='Create a password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type='submit' onClick={signupWithCreds} />
        <h4 className='response'>{response}</h4>
      </form>
    </div>
  );
}

export default SignUp;