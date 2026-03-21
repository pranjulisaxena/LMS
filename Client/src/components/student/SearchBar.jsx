import styles from './CSS/SearchBar.module.css'
import {assets} from '../../assets/assets.js'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SearchBar = ({data}) => {
  const Navigate = useNavigate();
  const [input, setInput] = useState(data ? data : '');

  const onSearchHandler = (e) =>{
    e.preventDefault()
    Navigate('/course-list/'+input)
  }

  return (
        <form className={styles.inputContainer} onSubmit={onSearchHandler}>
          <img src={assets.search_icon} alt="" />
        <input
        onChange={e=> setInput(e.target.value)}
        value={input}
        type="text" placeholder='Search Course name' className={styles.input} />
      <button className={styles.button}>Search</button>
      </form>

  )
}

export default SearchBar