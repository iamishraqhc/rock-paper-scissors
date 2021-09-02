import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [userChoice, setUserChoice] = useState('rock')
  const [computerChoice, setComputerChoice] = useState('rock')
  const [userPoints, setUserPoints] = useState(1)
  const [computerPoints, setComputerPoints] = useState(1)
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
    if (userPoints < 5 && computerPoints < 5) {
      if (comboMoves === 'scissorspaper' || comboMoves === 'rockscissors' || comboMoves === 'paperrock') {
        setUserPoints(userPoints => userPoints + 1)
        setTurnPoints('User gets the point!')
      }

      if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper') {
        setComputerPoints(computerPoints => computerPoints + 1)
        setTurnPoints('Computer gets the point!')
      }

      if (comboMoves === 'paperpaper' || comboMoves === 'rockrock' || comboMoves === 'scissorsscissors') {
        setTurnPoints('No one gets a point!')
      }
    } else if (userPoints === 5 && computerPoints < 5) {
      setUserPoints(userPoints => userPoints + 1)
      setResult('User Wins')
      setGameOver(true)
    } else if (computerPoints === 5 && userPoints < 5) {
      setComputerPoints(computerPoints => computerPoints + 1)
      setResult('Computer Wins')
      setGameOver(true)
    }
  }, [computerChoice, userChoice])

  return (
    <div className="App">
      <h1 className='heading'>Rock-Paper-Scissors</h1>
      <div className='score'>
        <h1>User Points: {userPoints - 1}</h1>
        <h1>Computer Points: {computerPoints - 1}</h1>
      </div>

      <div className='choice'>
        <h1>Your choice:</h1>
        <img src={`../images/${userChoice}.png`} alt=''></img>
        <h1>Computer's choice:</h1>
        <img src={`../images/${computerChoice}.png`} alt=''></img>
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
