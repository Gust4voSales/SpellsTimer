import { useEffect, useState } from 'react'
import Spells from '../../assets/Spells.json'
import { Popover } from 'react-tiny-popover'
import './styles.css'
import { OptionsSelector } from '../OptionsSelector'


function Spell({ initialSpell, optionsPosition }) {
  const [spell, setSpell] = useState(Spells.find(s => s.name===initialSpell))
  const [timer, setTimer] = useState(null)
  const [openOptions, setOpenOptions] = useState(false)
  
  useEffect(() => {
    setTimer(null) // stop timer when spell changes
  }, [spell])

  useEffect(() => {
    if (!timer)
      return

    if (timer===0) {
      setTimer(null)
    }

    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  function handleStartTimer() {
    // setTimer(5)
    setTimer(spell.cooldown)
  }

  function handleSpellClick(e) {
    setOpenOptions(false)
    if (e.type==='click') {
      handleStartTimer()
    } else if (e.type==='contextmenu') {
      setOpenOptions(true)
    }
  }

  function handleOptionSelection(name) {
    setOpenOptions(false)
    setSpell(Spells.find(s => s.name===name))
  }

  if (spell)
    return (
      <div className='spell-container' >
        <span>{!!timer ? timer : spell.cooldown}</span>

        <Popover
          isOpen={openOptions}
          positions={optionsPosition} // if you'd like, you can limit the positions
          padding={5} // adjust padding here!
          align={true}
          reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
          onClickOutside={() => {setOpenOptions(false)}} // handle click events outside of the popover/target here!
          content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
            <OptionsSelector onOptionSelected={handleOptionSelection} closeOptions={() => {setOpenOptions(false)}}/>
          )}
        >
          <img src={require('../../assets/'+spell.image).default} alt={spell.image} 
            onClick={handleSpellClick} onContextMenu={handleSpellClick}/>
        </Popover>
        
      </div>
    )

  return (<div></div>)
}

export { Spell }