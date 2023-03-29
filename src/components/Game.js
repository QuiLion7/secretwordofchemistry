import { useState, useRef} from "react";
import './Game.css'

const Game = ({ verifyLetter, chosenCategory, chosenWord, lettersChosenWord, chances, guessedLetters, wrongLetters, punctuation }) => {
  const [letter, setLetter] = useState('')
  const inputLetterRef = useRef(null)

  const processSubmit = event => {
    event.preventDefault()

    verifyLetter(letter)

    setLetter('')

    inputLetterRef.current.focus()
  }
 
  return (
    <div className="gameContainer">
      <div className="game">
        <h1>Advinhe a palavra</h1>
        <h3 className="category">
          Categoria: <span>{chosenCategory}</span>
        </h3>
        <div className="points">
          <h3>Pontuação: <span>{punctuation}</span></h3>
        </div>
        <div className='attempts'>
          Tentativas:
          <span>{chances}</span>
        </div>
        <div className="wordContainer">
          {lettersChosenWord.map((letter, index) => (
            guessedLetters.includes(letter) ? (
              <span key={index} className="filledLetter">{letter}</span>
              ) : (
                <span key={index} className="blankSquare"></span>)
          ))}        
        </div>
        <div className="letterContainer">
          <p>Qual a letra?</p>
          <form onSubmit={processSubmit}>
            <input 
              type="text" 
              name='letter' 
              maxLength='1' 
              required 
              autoFocus
              onChange={event => setLetter(event.target.value)} 
              value={letter}
              ref={inputLetterRef}
            />
            <button>Jogar!</button>
          </form>
        </div>
        <div className="wrongLetterCaontainer">
          <p>Letras já utilizadas:</p>
          {wrongLetters.map((letter, index) => (
            <span key={index}>{letter}, </span>
          ))}
        </div>
      </div>
    </div>
    
  )
}

export default Game