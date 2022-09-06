import React from 'react'
import './App.css'
import Dice from './Dice'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  
  function allNewDice(){
    let diceArray=[]
    for (let i=0;i<10;i++){
      diceArray.push({
        value:Math.ceil(Math.random() * 6),
        id:nanoid(),
        isHeld:false
      })
    }
    return diceArray
  }

  function holdDice(id){
    setDiceValue(prevDice=>{
      return prevDice.map(dice => {
        return dice.id === id ? {...dice,isHeld:!dice.isHeld} : dice 
      })
    })
  }

  const [diceValue,setDiceValue]=React.useState(allNewDice())

  function reRoll(){
    if(!tenzies){
      setDiceValue(prevDice => {
        return prevDice.map(dice => {
          return dice.isHeld===true? dice :
            {
              value:Math.ceil(Math.random()*6),
              id:nanoid(),
              isHeld:false
            }
        })
      })
    } else {
      setTenzies(!tenzies)
      setDiceValue(allNewDice())
    }
    
  }

  const [tenzies,setTenzies] = React.useState(false)

  React.useEffect(function(){
    const allHeld = diceValue.every(dice => dice.isHeld)
    const firstValue = diceValue[0].value
    const allValue = diceValue.every(dice=> dice.value===firstValue)
    if (allHeld && allValue){
      setTenzies(true)
      console.log("Tenzies!")
    }
    
  },[diceValue])

  const diceElements = diceValue.map(item => <Dice key={item.id} value={item.value} isHeld={item.isHeld} handleClick ={()=>holdDice(item.id)}/>)

  return (
    <main className='main'>
      {tenzies && <Confetti width='360px' height='380px'/>}
        <div className='container'>
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='div-container'>
                {diceElements} 
            </div>
            <button onClick={reRoll}>{tenzies === true ? 'New Game' : 'Roll'}</button>
            
        
        </div>
        
    </main>
  )
}

export default App