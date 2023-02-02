import React, { useState, useEffect} from 'react'
import { BigButton } from '../../Components/BigButton/BigButton';
import httpClient from '../../httpClient';
import { formatCurrency } from '../../utilities/FormatCurrency';
import './_home.scss';
import { HomeSpentRow } from '../../Components/HomeSpentRow/HomeSpentRow';
import { HomeEarnedRow } from '../../Components/HomeEarnedRow/HomeEarnedRow';
import moneyGif from '../../assets/gifs/moneyGif.gif';

export function Home() {

  const [user, setUser] = useState('');

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

  return (
    <main className='home'>

      {user === "" || typeof(user) === "undefined" || user.error === "unauthorized"  ? 
      <section className='home__out' >
        <img className='home__gif' src={moneyGif} alt="moneyImg"/>
        <h1 className='home__title'>MoneyCounter</h1>
        <h2 className='home__subtitle'>Keep Track of Your Finances</h2>
        <p className='home__info'>Keeping track of your finances is crucial to achieving financial stability and success. It allows you to understand where your money is going, set and achieve financial goals, and make informed decisions about spending and saving.</p>
        <BigButton link="/login" message="Begin" margin="10px 0"/>
      </section>
      :
      <section className='home__in pageContent'>
        <h1 className='home__title'>MoneyCounter</h1>
        <div className='home__rows'>
          <HomeEarnedRow />
          <HomeSpentRow />
        </div>
        <div className='home__current'>
          <p className='home__userRow'> User: <span className='home__user'>{user.name}</span></p>
          <p className='home__userCash'><i className='bx bx-coin'></i>&emsp;Current cash: <span className='home__userCashNumber'>{formatCurrency(user.cash)}&emsp;</span><i className='bx bx-coin'></i></p>
          <p>If your cash is not enough for a particular transaction, it will still count making yor cash negative</p>
          <p className='home__help'>To start, in Income add your current finances</p>
          <button className='home__addButton'><a href="/login">Add +</a></button>
        </div>
      </section>
      }
    </main>
  )
}


