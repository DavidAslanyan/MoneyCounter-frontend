import React, { useState, useEffect} from 'react';
import httpClient from '../../httpClient';
import { CalculatePercent } from '../../utilities/CalculatePercent';
import { CheckRepeatingObjects } from '../../utilities/CheckRepeatingObjects';
import PieChart from './PieChart';


export function HomeEarnedRow() {

  const [rows, setRows] = useState('');

  useEffect(() => {
    (async() => {
      try {
        const resp = await httpClient.get("//myAPI/history");
        setRows(resp.data)
      } catch(error) {
        throw(error)
      }
    })()
  }, [])


  let typeEarned = { type: [], percent: [] };
  let totalEarned = 0;

  const newStatsEarned = [
    {
      title: 'salary',
      value: 0
    },
    {
      title: 'savings',
      value: 0
    },
    {
      title: 'gifts',
      value: 0
    },
    {
      title: 'credit',
      value: 0
    },
    {
      title: 'other',
      value: 0
    },
  ]

  for (let i = 0; i < rows.length; i++) {

    if (rows[i].typeEarned !== "none") {
      if (!typeEarned.type.includes(rows[i].typeEarned)) {
        typeEarned.type.push(rows[i].typeEarned)
      }
      totalEarned += parseInt(rows[i].earned);
    }

    for (let j = 0; j < newStatsEarned.length; j++) {
      if (rows[i].typeEarned === newStatsEarned[j].title) {
        newStatsEarned[j].value += parseInt(rows[i].earned)
      }
    }
  }

  const items = [{title: '', percent: 'Earned'}];

  for (let i = 0; i < rows.length; i++) {

    for (let j = 0; j < newStatsEarned.length; j++) {
      if (rows[i].typeEarned === newStatsEarned[j].title) {
        const newObject = {
          title: newStatsEarned[j].title,
          percent: CalculatePercent(newStatsEarned[j].value, totalEarned)
        }
        if (CheckRepeatingObjects(items, newObject)) {
          items.push(newObject)
        }
      }
    }

  }


  return (
    <section className='home__earned'>
      <div className='home__earnedList'>
        <p className='home__totalEarned'>Total Earned {totalEarned}$</p>
        <ul className='home__list'>
          {items.map((item,idx) => (
            <li className='home__earnedItem' key={idx}>{item.title.length > 9 ? `${item.title.substring(0, 9)}...` : `${item.title}`} {item.percent}%</li>
          ))}
        </ul>
      </div>
      <PieChart data={items}/>
    </section>
  )

}
