import React, { useState } from 'react';
import './_register.scss';
import httpClient from '../../httpClient';

export function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [date, setDate] = useState('');

  const [message, setMessage] = useState("");  

  const validation = () => {
    let pattern = /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    if (name === "") {
      return setMessage("Must provide name")
    }

    if (date === "") {
      return setMessage("Must provide date")
    }

    if (email === "") {
      return setMessage("Must provide email")
    }

    if (!email.includes("@")) {
      return setMessage("Must provide an applicable email")
    }

    if (password === "") {
      return setMessage("Must provide password")
    }

    if (!pattern.test(password)) {
      return setMessage("Password must contain at least 8 characters uppercase and lowercase")
    }

    if (passwordRepeat === "") {
      return setMessage("Must repeat password")
    }

    if (password !== passwordRepeat) {
      return setMessage("Passwords don't match")
    }

    return true;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
      if (validation()) {
        try {
          await httpClient.post("//myAPI/register", {
            name,
            date,
            email,
            password
          });
          window.location.href="/";
        } catch (error) {
          if (error.response.status === 401) {
            setMessage("Invalid credentials, please try again")
          }
          else if (error.response.status === 409) {
            setMessage("User already exists, register with different email")
          }
          else {
            setMessage("Unable to register, please try again and make sure you enter everything correctly")
          }
        }
      }
  }

  return (
    <div className='register'>
      <h1 className='register__title'>Create an Account</h1>
      <form onSubmit={handleSubmit} className='register__form'>
        <p className='register__rowTitle'>Full Name</p>
          <input className='register__input' type='text' onChange={(evt) => setName(evt.target.value)} />
        <p className='register__rowTitle'>Select Birthday</p>
          <input className='register__input' type='date' onChange={(evt) => setDate(evt.target.value)} />
        <p className='register__rowTitle'>Your Email</p>
          <input className='register__input' type='text' onChange={(evt) => setEmail(evt.target.value)} />
        <p className='register__rowTitle'>Password : 8 characters at least </p>
          <input className='register__input' type='password' onChange={(evt) => setPassword(evt.target.value)} />
        <p className='register__rowTitle'>Repeat password </p>
          <input className='register__input' type='password' onChange={(evt) => setPasswordRepeat(evt.target.value)} />
        <button className='register__button' type='submit'>Create Account</button>
      </form>
      {message !== '' ? <p className='register__message'>{message}</p> : null}
    </div>
  )
}
