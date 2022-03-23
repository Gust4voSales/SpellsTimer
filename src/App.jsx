import './App.css'
import { Spell } from './components/Spell/index'
import moveIcon from './assets/move.png'


function App() {
  return (
    <div id="container">
        <div className='enemy-container' >
          <span>TOP</span>
          <Spell initialSpell="Flash" optionsPosition={["bottom", "right"]}/>
          <Spell initialSpell="Teleporte" optionsPosition={["bottom", "right"]}/>
        </div>
        <div className='enemy-container'>
          <span>JG</span>
          <Spell initialSpell="Flash" optionsPosition={["bottom", "right"]}/>
          <Spell initialSpell="Incendiar" optionsPosition={["bottom", "right"]}/>
        </div>
        <div className='enemy-container' >
          <span>MID</span>
          <Spell initialSpell="Flash" optionsPosition={["bottom", "left"]}/>
          <Spell initialSpell="Incendiar" optionsPosition={["bottom", "left"]}/>
        </div>
        <div className='enemy-container' >
          <span>ADC</span>
          <Spell initialSpell="Flash" optionsPosition={["top", "right"]}/>
          <Spell initialSpell="Curar"optionsPosition={["top", "right"]}/>
        </div>
        <div className='enemy-container' >
          <span>SUP</span>
          <Spell initialSpell="Flash" optionsPosition={["top", "left"]}/>
          <Spell initialSpell="Exauste" optionsPosition={["top", "left"]}/>
        </div>
      <div className="options-container">
        <img id="move" src={moveIcon} alt="mover" />
        <span id="close">X</span>
      </div>
    </div>
  );
}

export default App;
