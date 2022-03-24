import Spells from '../../assets/Spells.json'
import './styles.css'


function OptionsSelector({ onOptionSelected, closeOptions, ...rest }) {    
  return (
    <div className="options-selector-container" {...rest} onMouseLeave={closeOptions}>
      <span>Mudar feitiço</span>
      <ul>
        {
          Spells.map(spell => (
            <li onClick={() => {onOptionSelected(spell.name)}} key={spell.name} >
              <img src={require('../../assets/'+spell.image).default} alt={spell.name} />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export { OptionsSelector }