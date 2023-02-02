import React, { useState, useEffect} from 'react';
import httpClient from '../../httpClient';
import { CalculatePercent } from '../../utilities/CalculatePercent';
import { CheckRepeatingObjects } from '../../utilities/CheckRepeatingObjects';
import PieChart from './PieChart';


export function HomeSpentRow() {

  const [rows, setRows] = useState('');

  useEffect(() => {
    (async() => {
      try {
        const resp = await httpClient.get("//localhost:5000/history");
        setRows(resp.data)
      } catch(error) {
        throw(error)
      }
    })()
  }, [])

  let typeSpent = { type: [], percent: [] };
  let totalSpent = 0;

  const newStatsSpent = [
    {
      title: "food",
      value: 0
    },
    {
      title: "family",
      value: 0
    },
    {
      title: "gifts",
      value: 0
    },
    {
      title: "utilities",
      value: 0
    },
    {
      title: "debts",
      value: 0
    },
    {
      title: "bills",
      value: 0
    },
    {
      title: "car",
      value: 0
    },
    {
      title: "clothes",
      value: 0
    },
    {
      title: "fun",
      value: 0
    },
    {
      title: "calls",
      value: 0
    },
    {
      title: "health",
      value: 0
    },
    {
      title: "pets",
      value: 0
    },
    {
      title: "sports",
      value: 0
    },
    {
      title: "taxi",
      value: 0
    },
    {
      title: "toiletry",
      value: 0
    },
    {
      title: "transport",
      value: 0
    },
    {
      title: "other",
      value: 0
    },
  ]

  for (let i = 0; i < rows.length; i++) {
    
    if (rows[i].typeSpent !== "none") {
      if (!typeSpent.type.includes(rows[i].typeSpent)) {
        typeSpent.type.push(rows[i].typeSpent)
      }
      totalSpent += parseInt(rows[i].spent);
    }

    for (let j = 0; j < newStatsSpent.length; j++) {
      if (rows[i].typeSpent === newStatsSpent[j].title) {
        newStatsSpent[j].value += parseInt(rows[i].spent)
      }
    }

  }

  const items = [{title: '', percent: 'Spent'}];
  
  for (let i = 0; i < rows.length; i++) {

    for (let j = 0; j < newStatsSpent.length; j++) {
      if (rows[i].typeSpent === newStatsSpent[j].title) {
        const newObject = {
          title: newStatsSpent[j].title,
          percent: CalculatePercent(newStatsSpent[j].value, totalSpent)
        }
        if (CheckRepeatingObjects(items, newObject)) {
          items.push(newObject)
        }
      }
    }
  
  }

  return (
    <section className='home__spent'>
      <PieChart data={items}/>
      <div className='home__spentList'>
        <p className='home__totalSpent'>Total Spent {totalSpent}$</p>
        <ul className='home__list'>
          {items.map((item,idx) => (
            <li className='home__spentItem' key={idx}>{item.title.length > 9 ? `${item.title.substring(0, 9)}...` : `${item.title}`} {item.percent}%</li>
          ))}
        </ul>
      </div>
    </section>
  )
}


