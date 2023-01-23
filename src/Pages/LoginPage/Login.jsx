import React, { useState } from 'react';
import httpClient from '../../httpClient';
import './_login.scss';

export function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState("");  

  const validation = () => {
    if (email === "") {
      return setMessage("Must provide email")
    }

    if (!email.includes("@")) {
      return setMessage("Must provide an applicable email")
    }

    if (password === "") {
      return setMessage("Must provide password")
    }

    return true;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (validation()) {
      try {
        await httpClient.post("//localhost:5000/login", {
          email,
          password
        });
        window.location.href="/";
      } catch (error) {
        if (error.response.status === 401) {
          setMessage("Invalid login or password, please try again")
        }
      }
    }
  }

  return (
    <div className='login'>
      <h1 className='login__title'>Login</h1>
      <form onSubmit={handleSubmit} className='login__form'>
        <p className='login__label login__label--email'>Email</p>
          <input className='login__input' value={email} type='text' onChange={(evt) => setEmail(evt.target.value)} placeholder='example@gmail.com'/>
        <p className='login__label login__label--password'>Password</p>
          <input className='login__input' value={password} type='password' onChange={(evt) => setPassword(evt.target.value)} placeholder='********'/>
        <label className='login__bottom'>
          <button className='login__button' type='submit'>Login</button>
          <a className='login__register' href="/register">Not Registered yet</a>
        </label>
      </form>
      {message !== '' ? <p className='login__message'>{message}</p> : null}
    </div>
  )
}
