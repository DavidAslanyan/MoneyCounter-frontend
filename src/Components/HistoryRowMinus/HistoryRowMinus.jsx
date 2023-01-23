import React from 'react';
import '../HistoryRow/_historyRow.scss';
import { formatCurrency } from '../../utilities/FormatCurrency';

export function HistoryRowMinus({row, message}) {
  return (
    <div>
      <section className='history__row'>
        <span className='history__span'>{message}</span>
        <ul>
        {row.map((item, idx) => (
          <li key={idx} className="history__number history__number--minus">-{formatCurrency(item)}</li>
        ))}
        </ul>
      </section>
    </div>
  )
}
