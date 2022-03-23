import { useEffect, useState } from 'react'
import Spells from '../../assets/Spells.json'
import { Popover } from 'react-tiny-popover'
import moment from 'moment'
import { OptionsSelector } from '../OptionsSelector'
import './styles.css'


function Spell({ initialSpell, optionsPosition }) {
  const [spell, setSpell] = useState(Spells.find(s => s.name===initialSpell))
  const [startedTime, setTimeStarted] = useState(null)
  const [timer, setTimer] = useState(null)
  const [openOptions, setOpenOptions] = useState(false)
  
  useEffect(() => {
    setTimer(null) // stop timer when spell changes
    setTimeStarted(null)
  }, [spell])

  useEffect(() => {
    if (!timer && !startedTime)
      return

    if (timer<0) {
      setTimer(null)
      setTimeStarted(null)
    }

    const interval = setInterval(() => {
      let now = moment()
      let secsPassedSinceCicleStarted = now.diff(startedTime, 'seconds')
      
      let ellapsedTime = moment.duration(secsPassedSinceCicleStarted, 'seconds')
      ellapsedTime = Number(ellapsedTime.asSeconds())  
      
      setTimer(spell.cooldown - ellapsedTime)        
    }, 1000)

    return () => clearInterval(interval)
  }, [startedTime, timer])

  function handleStartTimer() {
    // setTimer(5)
    setTimeStarted(moment())
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