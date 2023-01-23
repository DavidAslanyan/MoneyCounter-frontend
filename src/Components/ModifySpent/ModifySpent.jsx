import React, {useState} from 'react';
import '../ModifyEarned/_modifyEarned.scss';
import './_modifySpent.scss';
import httpClient from '../../httpClient';
import { formatCurrency } from '../../utilities/FormatCurrency';
import { EXPANCETYPES } from '../../data/TransactionTypes';

export function ModifySpent(props) {
  const { toggle, setToggle} = props;
  const [setDate, setSetDate] = useState('');
  const [spent, setSpent] = useState(0);
  const [info, setInfo] = useState('');
  const [message, setMessage] = useState('');

  const earned = 0;
  const newTypeEarned = 'none';


  const validation = () => {
    if (spent === "" ) {
      return setMessage("Must provide valid number");
    }

    if (spent <= 0) {
      return setMessage("Must provide valid number");
    }

    if (spent.length > 6) {
      return setMessage("Number can include maximum 6 digits, try to make your transactions separately");
    }

    if (Object.values(typeSpent).some(val => val === "")) {
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
      const newTypeSpent = typeSpent.value
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

  const [typeSpent, setTypeSpent] = useState({
    food: "",
    family: "",
    gifts: "",
    utilities: "",
    debts: "",
    other: ""
  })

  const handleChange = (e) => {
    const value = e.target.value
    setTypeSpent(() => {
      return { value };
    })
  }

  return (
    <div>
      <button className='modify__turnButton' onClick={() => setToggle(!toggle)}>Turn to Incomes<i className='bx bx-chevrons-right'></i></button>
        <form onSubmit={handleSubmit} className='modify__form'>
          <div className='modify__container'>
            <div className='modify__left'>
            <h1 className='modify__title'>Add Expense</h1>
              <span className='modify__name'>Select date</span>
              <input className='modify__input' type='date' onChange={(evt) => setSetDate(evt.target.value)}/>
              <span className='modify__name'>Amount spent</span>
              <input onChange={(evt) => setSpent(evt.target.value)} placeholder="0.00$ 6 digits Maximum" name="numberSpent" className="modify__input" type="number"/>
              <span className='modify__name'>Additional Information</span>
              <input className='modify__input' type="text" placeholder='Type here' onChange={e => setInfo(e.target.value)}/>
              <p>{message !== "" ? <span className='modify__message'>{message}</span> : null}</p>
              <div>
              <button className='modify__submit' type="submit"><i className='bx bx-menu' ></i> Add Expense <i className='bx bx-menu' ></i></button>
              </div>
            </div>
            <div className='modify__right'>
              {spent ? <h1 className='modify__expense'>Expense <span className='modify__expenseSpan'>-{formatCurrency(spent.substring(0, 6))}</span> </h1> : <h1 className='modify__expense'>Expense <span className='modify__expenseSpan'>0.00 $</span></h1>}
              <h2 className='modify__typeSelected'>Selected Type: {typeSpent.value !== 'undefined' ? <span className='modify__typeSpan'> {typeSpent.value}</span> : null}</h2>
              <div className='modify__types'>
                {EXPANCETYPES.map((type, idx) => (
                  <button className='modify__typeButton' key={idx} type="button" name={type.value} value={type.value} onClick={handleChange}><span className='modify__btnIcon'>{type.icon}</span> {type.value}</button>
                ))}
              </div>
            </div>
          </div>
        </form>
    </div>
  )
}
