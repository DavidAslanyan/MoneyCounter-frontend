import React from 'react';
import './_historyRow.scss';

export function HistoryRow({row, message}) {
  return (
    <div>
      <section className='history__row'>
        <span className='history__span'>{message}</span>
        <ul>
        {row.map((item, idx) => (
          <li key={idx}>{item.length > 20 ? `${item.substring(0, 20)}...` : `${item}`}</li>
        ))}
        </ul>
      </section>
    </div>
  )
}
