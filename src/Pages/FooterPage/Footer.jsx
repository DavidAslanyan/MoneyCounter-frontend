import React from 'react';
import './_footer.scss';

export function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__container pageContent'> 
      <section className='footer__left'>
        <h2 className='footer__LeftTitle'>Money Counter</h2>
      </section>
      <section className='footer__center'>
        <p className='footer__centerTitle'>All rights Reserved &copy;</p>
      </section>
      <section className='footer__right'>
        <p className='footer__rightTitle'>Created by David Aslanyan</p>
      </section>
      </div>
    </footer>
  )
}
