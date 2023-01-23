import React from 'react';
import './_bigButton.scss';

export function BigButton({link, message, margin}) {
  return (
    <button style={{margin: margin}} className='bigButton'><a className='bigButton__link' href={link}>{message}</a></button>
  )
}
