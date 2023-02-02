import React, { useState, useEffect } from 'react';
import httpClient from '../../httpClient';
import './_history.scss';
import { HistoryRow } from '../../Components/HistoryRow/HistoryRow';
import { HistoryRowPlus } from '../../Components/HistoryRowPlus/HistoryRowPlus';
import { HistoryRowMinus } from '../../Components/HistoryRowMinus/HistoryRowMinus';
import { BigButton } from '../../Components/BigButton/BigButton';

export function History() {

  const [rows, setRows] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    (async() => {
      try {
        const resp = await httpClient.get("//myAPI/history");
        setRows(resp.data)
      } catch(error) {
        console.log("User not identified");
      }
    })()
  }, [])


  useEffect(() => {
    (async() => {
      try {
        const resp = await httpClient.get("//myAPI/@me");
        setUser(resp.data)
      } catch(error) {
        console.log("User not identified");
      }
    })()
  }, [])


  let earned = [];
  let spent = [];
  let typeEarned = [];
  let typeSpent = [];
  let setDate= [];
  let time= [];
  let info = [];

  for (let i = 0; i < rows.length; i++) {
    earned.push(rows[i].earned)
    spent.push(rows[i].spent)
    typeEarned.push(rows[i].typeEarned)
    typeSpent.push(rows[i].typeSpent)
    setDate.push(rows[i].setDate)
    time.push(rows[i].time);
    info.push(rows[i].info);
  }
  

  return (
    <div className='history'>
      {user === "" || typeof(user) === "undefined" || user.error === "unauthorized"  ?
       <div className='history__out'>
        <h1 className='history__icon'><i className='bx bx-book-bookmark'></i></h1>
        <h2 className='history__title'>Join Money Counter To Keep Track of Your Transactions History</h2> 
        <BigButton link="/login" message="Login"/>
       </div>
       :
      <div>
        <h1 className='history__title'>Transaction history</h1>
        <div className='history__rows pageContent'>
          <HistoryRow className="history__row" row={setDate} message='Selected date'/> 
          <HistoryRowPlus className="history__row" row={earned} message='Money Earned'/>
          <HistoryRowMinus className="history__row" row={spent} message='Money Spent'/> 
          <HistoryRow className="history__row" row={typeEarned} message='Type Earned'/> 
          <HistoryRow className="history__row" row={typeSpent} message='Type Spent'/> 
          <HistoryRow className="history__row" row={time} message='Transaction exact date'/> 
          <HistoryRow className="history__row" row={info} message='Additional Information'/> 
        </div>
      </div>
      }
    </div>
  )
}
