import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client'


const Card = (props) =>  {

  const [count, setCount] = useState(props.betCount ?? 0)
  const updateCount = async (event) => {
    event.preventDefault()
    const nextCount = count + 1
    const { error } = await supabase
      .from('Posts')
      .update({ betCount: nextCount })
      .eq('id', props.id)

    if (error) {
      console.error('Unable to update bet count:', error)
      return
    }

    setCount(nextCount)
  }

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="title">{props.title}</h2>
          <h3 className="author">{"by " + props.author}</h3>
          <p className="description">{props.description}</p>
          <button className="betButton" onClick={updateCount} >👍 Bet Count: {count}</button>
      </div>
  );
};

export default Card