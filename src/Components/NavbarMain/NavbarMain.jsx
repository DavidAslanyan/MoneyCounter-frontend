import React, { useState, useEffect} from 'react';
import httpClient from '../../httpClient';
import './_navbar.Main.scss';

function NavbarMain() {

  const [user, setUser] = useState('');

  useEffect(() => {
    (async() => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        setUser(resp.data)
      } catch(error) {
        setUser(null)
      }
    })()
  }, [])


  const logout = async () => {
    await httpClient.post("//localhost:5000/logout");
    window.location.href="/";
  }

  return (
    <nav className='nav'>
      {/* <a className='nav__listTitle' href="/">Money Counter</a> */}
      <ul className='nav__list pageContent'>
        <section className='nav__itemContainer nav__itemContainer--left'>
          <li className='nav__item'><a className='nav__link' href="/">Home</a></li>
          <li className='nav__item'><a className='nav__link' href="/modify">Modify</a></li>
          <li className='nav__item'><a className='nav__link' href="/history">History</a></li>
        </section>
        {user === "" || typeof(user) === "undefined" || user.error === "unauthorized" ?
        <section className='nav__itemContainer nav__itemContainer--right'>
          <p className='nav__itemMessage'>You are not logged in</p>
          <li className='nav__item'><a className='nav__link' href="/login">Login</a></li>
          <li className='nav__item'><a className='nav__link' href="/register">Register</a></li>
        </section>
        :
        <section className='nav__itemContainer nav__itemContainer--right'>
          <li className='nav__link nav__link--user'>Welcome, {user.name} <i className='bx bxs-home-smile'></i></li>
          <li className='nav__link nav__link--logout' onClick={logout}>Logout</li>
        </section>}
      </ul>
    </nav>
  )
}

export default NavbarMain
