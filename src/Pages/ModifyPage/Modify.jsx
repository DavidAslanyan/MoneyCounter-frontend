import React, { useState, useEffect} from 'react';
import { ModifyEarned } from '../../Components/ModifyEarned/ModifyEarned';
import { ModifySpent } from '../../Components/ModifySpent/ModifySpent';
import httpClient from '../../httpClient';
import './_modify.scss';

export function Modify() {

  const [user, setUser] = useState('');
  const [toggle, setToggle] = useState(false);

  const INCOMETYPES = [
    "salary",
    "savings",
    "gifts",
    "credit",
    "other"
  ];


  useEffect(() => {
    (async() => {
        const resp = await httpClient.get("//myAPI/@me");
        setUser(resp.data);
    })()
  }, [])

  return (
    <div className='modify'>
      {user === "" || typeof(user) === "undefined" || user.error === "unauthorized" ? 
      <div className='modify__out'>
        <h1 className='modify__icon'><i className='bx bx-user-plus'></i></h1>
        <p className='modify__title'>Login to have access to transactions</p>
        <button className='modify__button'><a className='modify__link' href="/login">Login</a></button>
      </div>
      :
      <div className='pageContent'>
      {toggle ? 
      <ModifyEarned types={INCOMETYPES} toggle={toggle} setToggle={setToggle}/>
      :
      <ModifySpent toggle={toggle} setToggle={setToggle}/> }
      </div>
      
      }
    </div>
  )
}