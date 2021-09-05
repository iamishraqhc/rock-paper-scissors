import { useEffect, useRef, useState } from 'react'
import './App.css'

const App = () => {
  const [userChoice, setUserChoice] = useState('rock')
  const [computerChoice, setComputerChoice] = useState('rock')
  const userPoints = useRef(0)
  const computerPoints = useRef(0)
  const [turnPoints, setTurnPoints] = useState(null)
  const [result, setResult] = useState('Let\'s see who wins')
  const [gameOver, setGameOver] = useState(false)
  const choices = ['rock', 'paper', 'scissors']

  const handleClick = (value) => {
    setUserChoice(value)    
    generateComputerChoice()
  }

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)
  }

  const refresh = () => {
    window.location.reload()
  }

  useEffect(() => {
    const comboMoves = userChoice + computerChoice
    if (userPoints.current <= 4 && computerPoints.current <= 4) {
      if (comboMoves === 'scissorspaper' || comboMoves === 'rockscissors' || comboMoves === 'paperrock') {
        userPoints.current += 1
        setTurnPoints('User gets the point!')
      }

      if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper') {
        computerPoints.current += 1
        setTurnPoints('Computer gets the point!')
      }

      if (comboMoves === 'paperpaper' || comboMoves === 'rockrock' || comboMoves === 'scissorsscissors') {
        setTurnPoints('No one gets a point!')
      }
    }  
    if (userPoints.current === 5 && computerPoints.current < 5) {
      setResult('User Wins')
      setGameOver(true)
    }
    if (computerPoints.current === 5 && userPoints.current < 5) {
      setResult('Computer Wins')
      setGameOver(true)
    }
  }, [computerChoice, userChoice, userPoints, computerPoints])

  return (
    <div className="App">
      <h1 className='heading'>Rock-Paper-Scissors</h1>
      <div className='score'>
        <h1>User Points: {userPoints.current}</h1>
        <h1>Computer Points: {computerPoints.current}</h1>
      </div>

      <div className='choice'>
        <div className='choice-user'>
          <h1>Your choice:</h1>
          <img className='user-hand' src={`../images/${userChoice}.png`} alt=''></img>
        </div>
        <div className='choice-computer'>
          <h1>Computer's choice:</h1>
          <img className='computer-hand' src={`../images/${computerChoice}.png`} alt=''></img>
        </div>
      </div>
      
      <div className='button-div'>
        {choices.map((choice, index) =>
          <button className='button' key={index} onClick={() => handleClick(choice)} disabled={gameOver}>
            {choice} 
          </button>
        )}
      </div>
      
      <div className='result'>
        <h1>Turn Result: {turnPoints}</h1>
        <h1>Final Result: {result}</h1>
      </div>
      
      <div className='button-div'>
        {gameOver && 
          <button className='button' onClick={() => refresh()}>Restart Game?</button>
        }
      </div>
    </div>
  )
}

export default App
