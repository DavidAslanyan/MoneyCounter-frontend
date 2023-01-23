import React, { useState } from 'react';
import httpClient from '../../httpClient';
import { formatCurrency } from '../../utilities/FormatCurrency';
import './_modifyEarned.scss';
import { INCOMETYPES } from '../../data/TransactionTypes';

export function ModifyEarned(props) {
  const { toggle, setToggle} = props;
  const [setDate, setSetDate] = useState('');
  const [earned, setEarned] = useState(0);
  const [info, setInfo] = useState('');
  const [message, setMessage] = useState('');

  const spent = 0;
  const newTypeSpent = 'none';

  const validation = () => {
    if (earned === "" ) {
      return setMessage("Must provide valid number");
    }

    if (earned <= 0) {
      return setMessage("Must provide valid number");
    }

    if (earned.length > 6) {
      return setMessage("Number can include maximum 6 digits, try to make your transactions separately");
    }

    if (Object.values(typeEarned).some(val => val === "")) {
      return setMessage("Must select an applicable option");
    }

    if (info.length >= 350) {
      return setMessage("Text too long, please write shorter");
    }
    return true;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (validation()) {
      const newTypeEarned = typeEarned.value
      try {
        await httpClient.post("//localhost:5000/modify", {
          earned,
          newTypeEarned,
          info,
          setDate,
          spent,
          newTypeSpent
        });
        window.location.href="/";
      } catch (error) {
        if (error.message.status === 401) {
          setMessage("No operation")
        }
      }
    }
  }

  const [typeEarned, setTypeEarned] = useState({
    salary: "",
    savings: "",
    gifts: "",
    credit: "",
    other: ""
  })

  const handleChange = (e) => {
    const value = e.target.value
    setTypeEarned(() => {
      return { value };
    })
  }


  return (
    <div>
      <button className='modifyEarned__turnButton' onClick={() => setToggle(!toggle)}>Turn to Expenses</button>
        <form onSubmit={handleSubmit} className='modifyEarned__form'>
          <div className='modifyEarned__container'>
            <div className='modifyEarned__left'>
              <h1 className='modifyEarned__title'>Add Income</h1>
              <span className='modifyEarned__date'>Select date</span>
              <input className='modifyEarned__input' type='date' onChange={(evt) => setSetDate(evt.target.value)}/>
              <span className="modifyEarned__title">Amount Earned</span>
              <input className='modifyEarned__input' onChange={(evt) => setEarned(evt.target.value)} placeholder="0.00$" name="numberSpent" type="number" />
              <span className='modifyEarned__title'>Additional Information</span>
              <input className='modifyEarned__input' type="text" placeholder='Type here' onChange={e => setInfo(e.target.value)}/>
              <p>{message !== "" ? <span className='modifyEarned__message'>{message}</span> : null}</p>
              <div>
              <button className='modifyEarned__submit' type="submit"><i className='bx bx-menu' ></i>Add Income<i className='bx bx-menu' ></i></button>
              </div>
            </div>
            <div className='modifyEarned__right'>
            {earned ? <h1 className='modifyEarned__expense'>Income <span className='modifyEarned__expenseSpan'>+{formatCurrency(earned.substring(0, 6))}</span> </h1> : <h1 className='modifyEarned__expense'>Expense <span className='modifyEarned__expenseSpan'>0.00 $</span></h1>}
            <h2 className='modifyEarned__typeSelected'>Selected Type: {typeEarned.value !== 'undefined' ? <span className='modifyEarned__typeSpan'> {typeEarned.value}</span> : null}</h2>
            <div className='modifyEarned__types'>
              {INCOMETYPES.map((type, idx) => (
                <button className='modifyEarned__typeButton' key={idx} type="button" name={type.value} value={type.value} onClick={handleChange}><span className='modifyEarned__btnIcon'>{type.icon}</span> {type.value}</button>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
